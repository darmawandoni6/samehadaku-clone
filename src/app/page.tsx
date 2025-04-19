import { Suspense } from 'react';

import Main from './main';

export default async function Home() {
  return (
    <Suspense>
      <Main />
    </Suspense>
  );
}
