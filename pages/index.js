import {
  HeroSection,
  Navbar,
  AboutSection,
  FeaturesSection,
  TeamSection,
  FooterSection,
} from '../components';
import HeadWrapper from '../components/HeadWrapper';
// import '../styles/landing.css';

export default function Home() {
  return (
    <>
      <HeadWrapper title='Home - Receipt Sync | Track sales & Receipts - ReceiptSync Home Page' />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TeamSection />
        <FooterSection />
      </main>
    </>
  );
}
