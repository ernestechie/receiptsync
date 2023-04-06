import Image from 'next/image';
import React from 'react';
import isaiahErnestImage from '../../assets/isaiah-ernest-ovie.jpg';
import johnGodwinImage from '../../assets/john-godwin.jpeg';
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineTwitter,
} from 'react-icons/ai';

const TeamSection = () => {
  return (
    <section id='team' className='layout bg-light py-16 mt-72'>
      <p className='font-bold text-4xl text-dark my-4'>Project Team.</p>
      <p className='text-xl'>
        Awesome developers that made this project a reality.
      </p>

      <div className='grid grid-cols-1 mt-12 md:grid-cols-2 xl:grid-cols-3 gap-8'>
        <div className='min-h-[512px] bg-white rounded-xl shadow-sm max-w-[380px]'>
          <Image
            src={johnGodwinImage}
            alt='Isaiah Ernest Ovie - ernestechie'
            className='rounded-tr-lg rounded-tl-xl h-[50%] object-fill'
          />
          <div className='p-4 mt-4'>
            <p className='font-bold text-3xl text-primary'>John Godwin</p>
            <p className='font-bold text-secondary-dark'>Backend Developer</p>
            <p className='text-lg mt-4'>
              I worked with NodeJS, Amazon S3 bucket, TypeScript and other
              services to deliver data and collaborating with the frontend
              developer to make sure the frontend and backend work seamlessly
              together.
            </p>

            <div className='mt-8 flex gap-6'>
              <a
                href='https://github.com/boivado2'
                target='_blank'
                rel='noreferrer'
              >
                <AiOutlineGithub className='text-3xl text-secondary-dark' />
              </a>
              <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
                <AiOutlineTwitter className='text-3xl text-blue' />
              </a>
              <a href='https://linkedin.com/' target='_blank' rel='noreferrer'>
                <AiFillLinkedin className='text-3xl text-blue-dark' />
              </a>
            </div>
          </div>
        </div>
        <div className='min-h-[512px] bg-white rounded-xl shadow-sm max-w-[380px] gap-8'>
          <Image
            src={isaiahErnestImage}
            alt='Isaiah Ernest Ovie - ernestechie'
            className='rounded-tr-lg rounded-tl-xl h-[50%] object-fill'
          />

          <div className='p-4 mt-4'>
            <p className='font-bold text-3xl text-primary'>Isaiah Ernest</p>
            <p className='font-bold text-secondary-dark'>Frontend Developer</p>
            <p className='text-lg mt-4'>
              Using TailwindCSS, NextJS, MaterialUI & Figma. I designed and
              developed the landing page, made the Vendor dashboard, Insights
              and charts, I also refactored the state management from Context
              API to Redux,etc.
            </p>

            <div className='mt-8 flex gap-6'>
              <a
                href='https://github.com/ernestechie'
                target='_blank'
                rel='noreferrer'
              >
                <AiOutlineGithub className='text-2xl text-secondary-dark' />
              </a>
              <a
                href='https://twitter.com/ernestechie'
                target='_blank'
                rel='noreferrer'
              >
                <AiOutlineTwitter className='text-3xl text-blue' />
              </a>
              <a
                href='https://linkedin.com/in/ernestechie'
                target='_blank'
                rel='noreferrer'
              >
                <AiFillLinkedin className='text-3xl text-blue-dark' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
