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
 * import ApiDoc from '@dracor/react/dist/components/ApiDoc';
 * import 'swagger-ui-react/swagger-ui.css';
 *
 * <ApiDoc url="/api.yaml" />
 * ```
 *
 * Note: Because swagger-ui-react uses package exports which cause problems when
 * loaded into jest we currently do not include the component in the package
 * bundle. It needs to be imported from `@dracor/react/dist/components/ApiDoc`.
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
