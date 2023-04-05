import { HeroSection, Navbar } from '../components';
import HeadWrapper from '../components/HeadWrapper';

export default function Home() {
  return (
    <>
      <HeadWrapper title='Home - Receipt Sync | Track sales & Receipts - ReceiptSync Home Page' />
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
