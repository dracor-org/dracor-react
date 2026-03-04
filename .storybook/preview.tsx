import type { Preview, StoryContext } from '@storybook/react-vite';
import '../src/tailwind.css';

import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { PartialStoryFn } from 'storybook/internal/types';

function withRouter(Story: PartialStoryFn, { parameters }: StoryContext) {
  const {
    initialEntries = ['/'],
    initialIndex,
    routes = ['/'],
    routeParams = {},
  } = parameters?.router || {};

  const rootRoute = createRootRoute();

  const children = routes.map((path: string) =>
    createRoute({
      path,
      getParentRoute: () => rootRoute,
      component: Story,
    })
  );

  rootRoute.addChildren(children);

  // ensure initialEntries are strings
  const formattedInitialEntries = initialEntries.map((entry: string) => {
    // if the entry includes parameters, replace them with the provided values
    return Object.keys(routeParams).reduce((acc, key) => {
      return acc.replace(`$${key}`, routeParams[key]);
    }, entry);
  });

  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: formattedInitialEntries,
      initialIndex,
    }),
    routeTree: rootRoute,
    context: routeParams,
  });

  return <RouterProvider router={router} />;
}

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
