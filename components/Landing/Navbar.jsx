/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import Link from 'next/link';
import { RiMenu4Fill } from 'react-icons/ri';

const Navbar = () => {
  return (
    <nav className='layout w-full fixed top-0 left-0 flex justify-between py-8 sm:py-4 items-center font-bold navbar'>
      <a href='#' title='ReceiptSync Navbar Logo'>
        <h1 className='text-2xl text-white'>ReceiptSync</h1>
      </a>
      <ul className='hidden md:flex md:gap-8 justify-around md:w-[40%]'>
        <li>
          <a
            href='#home'
            className='text-white font-medium hover:font-semibold duration-300'
          >
            Home
          </a>
        </li>
        <li>
          <a
            href='#about'
            className='text-white font-medium hover:font-semibold duration-300'
          >
            About
          </a>
        </li>
        <li>
          <a
            href='#features'
            className='text-white font-medium hover:font-semibold duration-300'
          >
            Features
          </a>
        </li>
        <li>
          <a
            href='#team'
            className='text-white font-medium hover:font-semibold duration-300'
          >
            Team
          </a>
        </li>
      </ul>
      <div className='flex items-center gap-8 md:gap-0'>
        <Link
          href='#'
          className='bg-secondary-dark hover:bg-dark px-12 py-4 rounded-[32px] text-white hidden sm:block'
        >
          Sign In
        </Link>
        <button>
          <RiMenu4Fill className='block md:hidden text-3xl' />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
