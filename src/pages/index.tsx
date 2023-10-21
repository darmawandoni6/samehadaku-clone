import MainLayout from '@containers/MainLayout';
import Home from '@modules/Home';
import Head from 'next/head';
import type { ReactNode } from 'react';

function index() {
  return (
    <>
      <Head>
        <title>Samehadaku - Nonton Streaming Anime Sub Indo</title>
        <meta
          name="description"
          content="Samehadaku adalah situs nonton anime sub Indo terbaru dengan kualitas video HD terlengkap, streaming anime online bahasa Indonesia gratis."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Home />
    </>
  );
}

index.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default index;
