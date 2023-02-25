import React from 'react';
import Head from 'next/head';

const HeadWrapper = ({ title, description }) => {
  return (
    <Head>
      <title>
        {title ? title : 'Receipt Sync | Track sales and record invoices'}
      </title>
      <meta
        name='description'
        content={
          description
            ? description
            : 'Record & Track Sales, Record Invoices & Receips, Monitor your business with receipt sync'
        }
      />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default HeadWrapper;
