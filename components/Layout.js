import React from 'react';
import Head from 'next/head';

function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Study Case' : 'Study Case'}</title>
      </Head>
      <nav className='d-flex justify-content-center'>
        <h1>Study Case</h1>
      </nav>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
