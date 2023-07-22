import { Helmet } from 'react-helmet-async';
import SwaggerUI from 'swagger-ui-react';

import 'swagger-ui-react/swagger-ui.css';

export interface Props {
  url: string;
  title?: string;
}

export default function ApiDoc({ url, title }: Props) {
  return (
    <div>
      {title && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
    )}
      <SwaggerUI url={url} deepLinking />
    </div>
  );
}
