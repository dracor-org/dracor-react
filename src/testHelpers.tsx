import { ReactElement } from 'react';
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router';
import { HelmetProvider } from 'react-helmet-async';
import { render, RenderResult } from '@testing-library/react';

// Just for type augmentation (we’ll override it in each test)
const rootRoute = createRootRoute();
const dummyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => null,
});

export const dummyRouter = createRouter({
  routeTree: rootRoute.addChildren([dummyRoute]),
  history: createMemoryHistory(),
});

// Module augmentation using dummy router just for types
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof dummyRouter;
  }
}

// Main test helper: creates a fresh router for every test
export function renderWithRouter(
  path: string,
  component: () => ReactElement
): RenderResult {
  const testRoot = createRootRoute();
  const testRoute = createRoute({
    getParentRoute: () => testRoot,
    path,
    component,
  });

  const testTree = testRoot.addChildren([testRoute]);

  const testRouter = createRouter({
    routeTree: testTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });

  return render(<RouterProvider router={testRouter} />);
}

export const renderWithProviders = (
  path: string,
  component: ReactElement
): RenderResult => {
  return renderWithRouter(path, () => (
    <HelmetProvider>{component}</HelmetProvider>
  ));
};

export function createStoryRouter(component: () => ReactElement) {
  const rootRoute = createRootRoute();
  const storyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/*',
    component,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([storyRoute]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  return <RouterProvider router={router} />;
}
