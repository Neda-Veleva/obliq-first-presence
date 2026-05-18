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
import { Team } from './components/Team';
import { ConsultationForm } from './components/ConsultationForm';
import { ConsultationFooter } from './components/ConsultationFooter';
import { ContactPage } from './components/ContactPage';
import { ContactPageV2 } from './components/ContactPageV2';
import { ContactPageV3 } from './components/ContactPageV3';
import { BrandColorsPage } from './components/BrandColorsPage';
import { ObliqTypographySystemPage } from './components/ObliqTypographySystemPage';
import { HomePageV2 } from './components/HomePageV2';
import { HomePageV3 } from './components/HomePageV3';
import { HomePageV4 } from './components/HomePageV4';
import { HomePageConcept02 } from './components/HomePageConcept02';
import { HomePageConcept03 } from './components/HomePageConcept03';
import { ObliqApproachPage, TheObliqApproachPage } from './components/ObliqApproachPage';
import { FloatingConsultationCta } from './components/FloatingConsultationCta';
import {
  ConditionsPage,
  JournalPage,
  ProceduresPage,
  ProceduresPageV2,
  ProceduresPageV3,
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
      <Team />
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

    if (route.routeKey === 'contactV2') {
      return <ContactPageV2 />;
    }

    if (route.routeKey === 'contactV3') {
      return <ContactPageV3 />;
    }

    if (route.routeKey === 'homeV2') {
      return <HomePageV2 />;
    }

    if (route.routeKey === 'homeV3') {
      return <HomePageV3 />;
    }

    if (route.routeKey === 'homeV4') {
      return <HomePageV4 />;
    }

    if (route.routeKey === 'homeConcept02') {
      return <HomePageConcept02 />;
    }

    if (route.routeKey === 'homeConcept03') {
      return <HomePageConcept03 />;
    }

    if (route.routeKey === 'approachV1') {
      return <ObliqApproachPage />;
    }

    if (route.routeKey === 'approachV2') {
      return <TheObliqApproachPage />;
    }

    if (route.routeKey === 'brandColors') {
      return <BrandColorsPage />;
    }

    if (route.routeKey === 'typographySystem') {
      return <ObliqTypographySystemPage />;
    }

    if (route.routeKey === 'conditions') {
      return <ConditionsPage />;
    }

    if (route.routeKey === 'procedures') {
      return <ProceduresPage />;
    }

    if (route.routeKey === 'proceduresV2') {
      return <ProceduresPageV2 />;
    }

    if (route.routeKey === 'proceduresV3') {
      return <ProceduresPageV3 />;
    }

    if (route.routeKey === 'journal') {
      return <JournalPage />;
    }

    return <HomePage />;
  })();

  return (
    <LocaleProvider route={route}>
      {page}
      <FloatingConsultationCta />
    </LocaleProvider>
  );
}
