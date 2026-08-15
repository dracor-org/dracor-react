import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

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
 * Renders a Scalar API Reference page for the provided OpenAPI specification.
 *
 * This component requires `@scalar/api-reference-react` to be installed as a
 * peer dependency. Its stylesheet (`@scalar/api-reference-react/style.css`)
 * is imported by this module and will be pulled in automatically.
 *
 * ```
 * import {ApiDoc} from '@dracor/react';
 *
 * <ApiDoc url="/api.yaml" />
 * ```
 */
export default function ApiDoc({ url, title }: Props) {
  return (
    <div>
      {title !== undefined && <title>{title}</title>}
      <ApiReferenceReact configuration={{ url }} />
    </div>
  );
}
