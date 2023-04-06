import React from 'react';
import { IoReceipt } from 'react-icons/io5';
import { MdInventory2 } from 'react-icons/md';
import { HiChartPie } from 'react-icons/hi';

const FeaturesSection = () => {
  return (
    <section className='layout gradient-reverse py-16 pt-40' id='features'>
      <h5 className='text-3xl font-bold text-center text-white sm:text-4xl md:text-5xl'>
        Receipts Management made easy with these mind-blowing features
      </h5>

      {/* Features cards */}
      <div className='mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 -mb-64 max-w-[1024px] gap-6'>
        <div className='w-full mx-auto min-h-[300px] rounded-lg shadow-xl bg-white p-6 flex flex-col items-center justify-center'>
          <IoReceipt className='text-5xl text-primary' />
          <p className='text-center font-bold text-3xl text-dark my-4'>
            Receipts Sharing
          </p>
          <p className='text-lg text-center'>
            Share receipts to customers, with an attached key. Only authorized
            users can access receipt document.
          </p>
        </div>
        <div className='w-full mx-auto min-h-[300px] rounded-lg shadow-xl bg-white p-6 flex flex-col items-center justify-center'>
          <MdInventory2 className='text-5xl text-primary' />
          <p className='text-center font-bold text-3xl text-dark my-4'>
            Products Inventory
          </p>
          <p className='text-lg text-center'>
            Add, Edit & Delete products. Keep track of the products you have,
            and delete when necessary
          </p>
        </div>
        <div className='w-full mx-auto min-h-[300px] rounded-lg shadow-xl bg-white p-6 flex flex-col items-center justify-center'>
          <HiChartPie className='text-5xl text-primary' />
          <p className='text-center font-bold text-3xl text-dark my-4'>
            Insights & Charts
          </p>
          <p className='text-lg text-center'>
            Inspect products sales over years with our easy-to-use insights
            charts. Know which product performs best.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
