import HeadWrapper from '../components/HeadWrapper';
import Padding from '../layouts/Padding';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HeadWrapper />
      <Padding>
        <Padding>
          <h1>Welcome, User</h1>
        </Padding>
        <Padding>
          <Link href='/vendor'>Go to dashboard {'>'} </Link>
        </Padding>
      </Padding>
    </>
  );
}
