import HeadWrapper from '../components/HeadWrapper';
import Padding from '../layouts/Padding';
import Link from 'next/link';

export default function Home() {
  return (
    <section className='px-24'>
      {/* nav section */}
      <nav className=' flex justify-between pt-11 items-center font-bold'>
        <h1 className=' text-2xl'>ReceiptSync</h1>
        <ul className='flex gap-7 '>
          <li>
            Home
          </li>
          <li>About</li>
          <li>Features</li>
          <li>Team</li>
        </ul>

        <button className='bg-[#0C0E16] text-white  px-12 py-4 rounded-[32px]'>Sign In</button>
      </nav>




































      {/* <HeadWrapper />
      <Padding>
        <Padding>
          <h1>Welcome, User</h1>
        </Padding>
        <Padding>
          <Link href='/vendor'>Go to dashboard {'>'} </Link>
        </Padding>
      </Padding> */}
    </section>
  );
}
