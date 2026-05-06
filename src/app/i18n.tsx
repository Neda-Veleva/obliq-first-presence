import { createContext, useContext, type ReactNode } from 'react';

export const locales = ['bg', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export type RouteKey =
  | 'home'
  | 'homeV2'
  | 'approach'
  | 'contact'
  | 'conditions'
  | 'procedures'
  | 'journal';

export type LocalizedRoute = {
  locale: Locale;
  routeKey: RouteKey;
  routePath: string;
};

export const localeLabels: Record<Locale, string> = {
  bg: 'BG',
  en: 'EN',
  ru: 'RU',
};

export const localeNames: Record<Locale, string> = {
  bg: 'Български',
  en: 'English',
  ru: 'Русский',
};

const defaultLocale: Locale = 'bg';

const routePaths: Record<RouteKey, string> = {
  home: '/',
  homeV2: '/homepage-v2',
  approach: '/the-obliq-approach',
  contact: '/contact',
  conditions: '/conditions',
  procedures: '/procedures',
  journal: '/journal',
};

const routeAliases: Record<string, RouteKey> = {
  '/': 'home',
  '/homepage-v2': 'homeV2',
  '/approach': 'approach',
  '/the-obliq-approach': 'approach',
  '/contact': 'contact',
  '/conditions': 'conditions',
  '/procedures': 'procedures',
  '/journal': 'journal',
};

function isLocale(value: string | undefined): value is Locale {
  return value === 'bg' || value === 'en' || value === 'ru';
}

function normalizePathname(pathname: string) {
  const [pathOnly] = pathname.split(/[?#]/);
  const normalized = pathOnly.replace(/\/+$/, '');
  return normalized || '/';
}

function getRouteKey(routePath: string): RouteKey {
  return routeAliases[normalizePathname(routePath)] ?? 'home';
}

export function parseLocalizedPathname(pathname: string): LocalizedRoute {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const locale = firstSegment === 'en' || firstSegment === 'ru' ? firstSegment : defaultLocale;
  const routeSegments = firstSegment === 'en' || firstSegment === 'ru' ? segments.slice(1) : segments;
  const routePath = routeSegments.length ? `/${routeSegments.join('/')}` : '/';
  const routeKey = getRouteKey(routePath);

  return {
    locale,
    routeKey,
    routePath: routePaths[routeKey],
  };
}

export function buildLocalizedPath(route: RouteKey | string, locale: Locale, hash = '') {
  const routeKey = route in routePaths ? (route as RouteKey) : getRouteKey(route);
  const routePath = routePaths[routeKey];
  const prefix = locale === defaultLocale ? '' : `/${locale}`;

  if (routePath === '/') {
    return `${prefix || '/'}${hash}`;
  }

  return `${prefix}${routePath}${hash}`;
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function localizeHref(href: string, locale: Locale, currentRouteKey: RouteKey) {
  if (!href || isExternalHref(href)) {
    return href;
  }

  if (href.startsWith('#')) {
    return currentRouteKey === 'home' ? href : buildLocalizedPath('home', locale, href);
  }

  const hashIndex = href.indexOf('#');
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) || '/' : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  if (!path.startsWith('/')) {
    return href;
  }

  const parsed = parseLocalizedPathname(path);
  return buildLocalizedPath(parsed.routeKey, locale, hash);
}

export function switchLocaleHref(targetLocale: Locale, pathname: string, hash = '') {
  const currentRoute = parseLocalizedPathname(pathname);
  return buildLocalizedPath(currentRoute.routeKey, targetLocale, hash);
}

type LocaleContextValue = LocalizedRoute & {
  localizeHref: (href: string) => string;
  switchLocaleHref: (targetLocale: Locale) => string;
  localeName: string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  route,
  children,
}: {
  route: LocalizedRoute;
  children: ReactNode;
}) {
  const value: LocaleContextValue = {
    ...route,
    localizeHref: (href) => localizeHref(href, route.locale, route.routeKey),
    switchLocaleHref: (targetLocale) =>
      switchLocaleHref(targetLocale, window.location.pathname, window.location.hash),
    localeName: localeNames[route.locale],
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}
