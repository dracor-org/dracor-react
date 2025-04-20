import { Helmet } from 'react-helmet-async';
import SwaggerUI from 'swagger-ui-react';

export interface Props {
  /**
   * URL to OpenAPI specification
   */
  url: string;

  /**
   * Optional page title passed to `Helmet`
   */
  title?: string;
}

/**
 * Renders a Swagger UI page for the provided OpenAPI specification.
 *
 * This component requires `swagger-ui-react` and `@types/swagger-ui-react` to
 * be installed as peer dependencies.
 *
 * For proper styling the Swagger UI stylesheet needs to be imported:
 *
 * ```
 * import {ApiDoc} from '@dracor/react';
 * import 'swagger-ui-react/swagger-ui.css';
 *
 * <ApiDoc url="/api.yaml" />
 * ```
 */
export default function ApiDoc({ url, title }: Props) {
  return (
    <div>
      {title !== undefined && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}
      <SwaggerUI url={url} deepLinking />
    </div>
  );
}
