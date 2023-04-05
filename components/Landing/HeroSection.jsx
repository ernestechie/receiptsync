import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import heroImage from '../../assets/hero-image.svg';

const HeroSection = () => {
  return (
    <div className='hero layout flex flex-col items-center justify-center relative'>
      <h2 className='font-extrabold text-4xl sm:text-5xl md:text-6xl text-light text-center p-4'>
        Track sales. Record & Issue Receipts. Mange Products.
      </h2>
      <p className='text-xl text-light text-center max-w-[600px] my-4 md:text-2xl'>
        Use our free sales tracking system to gather and analyze data that helps
        boost sales performance.
      </p>
      <Link
        href='/login'
        className='bg-secondary-dark hover:bg-dark duration-500 px-12 py-4 rounded-[32px] text-white'
      >
        Get Started Now
      </Link>

      <Image
        src={heroImage}
        alt='Screenshot of receiptsync dashboard'
        className='absolute bottom-[-25%] md:bottom-[-40%] lg:bottom-[-65%] xl:bottom-[-75%] max-w-[90%]'
      />
    </div>
  );
};

export default HeroSection;
