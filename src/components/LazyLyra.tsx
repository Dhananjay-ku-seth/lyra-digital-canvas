import { lazy, Suspense, type ComponentProps } from 'react';

// The assistant is not needed for first paint, so it loads in its own chunk after the page is up.
const Lyra = lazy(() => import('./Lyra'));

const LazyLyra = (props: ComponentProps<typeof Lyra>) => (
  <Suspense fallback={null}>
    <Lyra {...props} />
  </Suspense>
);

export default LazyLyra;
