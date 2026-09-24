import { lazy, Suspense } from 'react';

// The assistant is not needed for first paint, so it loads in its own chunk after the page is up.
const Lyra = lazy(() => import('./Lyra'));

const LazyLyra = () => (
  <Suspense fallback={null}>
    <Lyra />
  </Suspense>
);

export default LazyLyra;
