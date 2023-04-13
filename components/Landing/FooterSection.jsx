import Link from 'next/link';
import React from 'react';

const FooterSection = () => {
  return (
    <section>
      <section className='py-12 layout'>
        <div className='p-6 sm:p-8 md:p-12 gradient-reverse rounded-xl shadow-lg md:flex justify-between items-center'>
          <h3 className='text-white text-3xl font-bold mb-4 md:pr-8 md:w-[70%] md:text-4xl xl:text-5xl'>
            Getting Started is Easy
          </h3>
          <Link
            href='/register'
            className='bg-secondary-dark text-white rounded-[32px] py-4 px-8 hover:bg-dark duration-300'
          >
            Get Started Now
          </Link>
        </div>
      </section>
      <footer className='bg-light layout py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-16'>
          <div>
            <h6 className='text-4xl font-bold text-dark mb-4'>ReceiptSync</h6>
            <p className='text-xl'>
              Manage products, store and issue receipts, monitor your sales to
              see the best performing products.
            </p>
          </div>

          <div>
            <h6 className='text-3xl font-bold text-dark mb-4'>Quick Links</h6>
            <ul className='flex flex-col gap-2'>
              <li>
                <a
                  href='#home'
                  className='text-dark hover:font-semibold duration-300 text-lg'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#about'
                  className='text-dark hover:font-semibold duration-300 text-lg'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#features'
                  className='text-dark hover:font-semibold duration-300 text-lg'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#team'
                  className='text-dark hover:font-semibold duration-300 text-lg'
                >
                  Team
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='w-full h-[1px] bg-[#646464] mt-8'></div>
        <p className='font-light pt-8'>
          &copy; Copyright 2023, All rights reserved by ReceiptSync
        </p>
      </footer>
    </section>
  );
};

export default FooterSection;
