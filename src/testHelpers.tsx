import { BrowserRouter } from 'react-router-dom';

export const withRouter = (
  children: JSX.Element,
  { route = '/' }: { route?: string } = {}
) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
