import React from 'react';
import Head from 'next/head';

function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Study Case' : 'Study Case'}</title>
      </Head>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
