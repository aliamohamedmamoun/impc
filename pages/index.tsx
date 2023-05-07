import { Suspense } from 'react';
import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';
import Header from '../components/Header';
import Intro from '../components/Intro';
import ImpcHeatMap from '@/components/ImpcHeatMap';
import type { Data } from '../constants/types';
import { ON_DEMAND_TIME_INTERVAL } from '../constants';

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_URL || '');
  const data: Data[] = await res.json();

  return {
    props: {
      data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: ON_DEMAND_TIME_INTERVAL,
  };
}

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>IMPC Landing page</title>
        <meta name="description" content="Introduction to IMPC Embryo Data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/impcLogo.png" />
      </Head>
      <Header />
      <main>
        <Intro />
        <Suspense fallback={<div>Loading...</div>}>
          <ImpcHeatMap data={data || []} />
        </Suspense>
      </main>
    </>
  );
}
