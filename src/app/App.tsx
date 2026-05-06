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
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/contact') {
    return <ContactPage />;
  }

  return <HomePage />;
}
