import { useEffect } from 'react';
import { Hero } from './components/Hero';
import { MirrorCarousel } from './components/MirrorCarousel';
import { SiteHeader } from './components/SiteHeader';
import { FaceReveal } from './components/FaceReveal';
import { Philosophy } from './components/Philosophy';
import { FacialFocus } from './components/FacialFocus';
import { Treatments } from './components/Treatments';
import { ProvenResults } from './components/ProvenResults';
import { Doctor } from './components/Doctor';
import { ConsultationForm } from './components/ConsultationForm';
import { ConsultationFooter } from './components/ConsultationFooter';
import { ContactPage } from './components/ContactPage';
import { ObliqApproachPage } from './components/ObliqApproachPage';
import {
  ConditionsPage,
  JournalPage,
  ProceduresPage,
} from './components/EditorialPreviewPage';
import { LocaleProvider, parseLocalizedPathname } from './i18n';

function HomePage() {
  return (
    <div className="bg-white">
      <SiteHeader />
      <Hero />
      <MirrorCarousel />
      <FaceReveal />
      <Philosophy />
      <FacialFocus />
      <Treatments />
      <ProvenResults />
      <Doctor />
      <ConsultationForm />
      <ConsultationFooter />
    </div>
  );
}

export default function App() {
  const route = parseLocalizedPathname(window.location.pathname);

  useEffect(() => {
    document.documentElement.lang = route.locale;
  }, [route.locale]);

  const page = (() => {
    if (route.routeKey === 'contact') {
      return <ContactPage />;
    }

    if (route.routeKey === 'approach') {
      return <ObliqApproachPage />;
    }

    if (route.routeKey === 'conditions') {
      return <ConditionsPage />;
    }

    if (route.routeKey === 'procedures') {
      return <ProceduresPage />;
    }

    if (route.routeKey === 'journal') {
      return <JournalPage />;
    }

    return <HomePage />;
  })();

  return <LocaleProvider route={route}>{page}</LocaleProvider>;
}
