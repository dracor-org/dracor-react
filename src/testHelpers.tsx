import { BrowserRouter } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

export const withRouter = (
  children: JSX.Element,
  { route = '/' }: { route?: string } = {}
) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export const withProviders = (
  children: JSX.Element,
  { route = '/' }: { route?: string } = {}
) => {
  return (
    <HelmetProvider>
      {withRouter(children, { route })}
    </HelmetProvider>
  );
}
