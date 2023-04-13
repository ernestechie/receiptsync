import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import heroImage from '../../assets/hero-image.svg';

const HeroSection = () => {
  return (
    <header
      id='home'
      className='gradient-reverse layout flex flex-col items-center justify-center min-h-[100svh]'
    >
      <h2 className='font-extrabold text-4xl sm:text-5xl md:text-6xl text-light text-center p-4'>
        Track sales. Record & Issue Receipts. Manage Products.
      </h2>
      <p className='text-xl text-light text-center max-w-[600px] my-4 md:text-2xl'>
        Use our free sales tracking system to gather and analyze data that helps
        boost sales performance.
      </p>
      <Link
        href='/register'
        className='bg-secondary-dark hover:bg-dark duration-500 px-12 py-4 rounded-[32px] text-white'
      >
        Get Started Now
      </Link>
      <Image
        src={heroImage}
        alt='Screenshot of receiptsync dashboard'
        className='hidden md:block mb-[-400px] max-w-[85%]'
      />
    </header>
  );
};

export default HeroSection;
