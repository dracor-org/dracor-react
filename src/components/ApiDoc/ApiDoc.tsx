import type { ComponentProps } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

type ScalarConfiguration = ComponentProps<
  typeof ApiReferenceReact
>['configuration'];
export type ApiDocConfiguration = Omit<
  Extract<ScalarConfiguration, { url?: unknown }>,
  'url'
>;

export interface Props {
  /**
   * URL to OpenAPI specification
   */
  url: string;

  /**
   * Optional page title
   */
  title?: string;

  /**
   * Additional Scalar API Reference configuration. Merged on top of ApiDoc's
   * defaults, which override several Scalar defaults.
   * See https://scalar.com/products/api-references/configuration for available
   * options.
   */
  configuration?: ApiDocConfiguration;
}

const defaults: ApiDocConfiguration = {
  showDeveloperTools: 'never',
  agent: { disabled: true },
  hideDarkModeToggle: true,
  showSidebar: false,
  layout: 'classic',
};

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
 * <ApiDoc url="/api.yaml" configuration={{ hideDownloadButton: true }} />
 * ```
 */
export default function ApiDoc({ url, title, configuration }: Props) {
  return (
    <div>
      {title !== undefined && <title>{title}</title>}
      <ApiReferenceReact
        configuration={{ ...defaults, ...configuration, url }}
      />
    </div>
  );
}
