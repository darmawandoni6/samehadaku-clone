import MainLayout from '@containers/MainLayout';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { NextPageWithLayout } from './_app';
import JadwalRilis from '@modules/JadwalRilis';

const index: NextPageWithLayout = () => {
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
      <JadwalRilis />
    </>
  );
};

index.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default index;
