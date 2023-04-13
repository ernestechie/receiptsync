import React from 'react';
import Image from 'next/image';
import iphone14s from '../../assets/iphone-14s.svg';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className='layout my-16 md:mt-72 xl:mt-96' id='about'>
      <div className='p-6 sm:p-8 md:p-12 gradient rounded-xl shadow-lg md:flex justify-between items-center'>
        <h3 className='text-white text-xl md:text-2xl mb-4 md:pr-8 md:w-[70%]'>
          Looking for where to manage sales, issue receipts and track your
          business performance?
        </h3>
        <Link
          href='/register'
          className='bg-secondary-dark text-white rounded-[32px] py-4 px-8 hover:bg-dark duration-300'
        >
          Create Account
        </Link>
      </div>

      <div className='py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8'>
        <div>
          <h4 className='text-dark font-bold text-3xl md:text-4xl'>
            What is ReceiptSync?
          </h4>
          <p className='text-lg md:text-xl my-8'>
            Originally meant for vendors to record receipts, ReceiptSync became
            a platform where vendors can monitor sales, manage products, store
            and issue receipts. Our easy-to-use platform allows you monitor your
            sales to see the best performing products, over the years.
          </p>
          <a
            href='#team'
            className='bg-primary text-white rounded-[32px] py-4 px-8 hover:bg-secondary duration-300'
          >
            Meet Our Team
          </a>
        </div>
        <Image
          src={iphone14s}
          alt='iphone 14s'
          className='mb-[-250px] max-w-[90%] mx-auto'
        />
      </div>
    </section>
  );
};

export default AboutSection;
