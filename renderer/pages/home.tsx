import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Starter from '../services/starter';

function Home() {
  const starter = new Starter();
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <button className='btn-blue' onClick={() => starter.launchApp()}>Firefox start</button>
      </div>
    </React.Fragment>
  );
}

export default Home;
