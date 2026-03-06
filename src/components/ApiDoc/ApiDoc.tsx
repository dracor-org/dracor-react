import SwaggerUI from 'swagger-ui-react';

export interface Props {
  /**
   * URL to OpenAPI specification
   */
  url: string;

  /**
   * Optional page title
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
      {title !== undefined && <title>{title}</title>}
      <SwaggerUI url={url} deepLinking />
    </div>
  );
}
