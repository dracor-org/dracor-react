import { useState, type ComponentProps } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

type ScalarConfiguration = ComponentProps<
  typeof ApiReferenceReact
>['configuration'];
export type ApiDocConfiguration = Omit<
  Extract<ScalarConfiguration, { url?: unknown }>,
  'url'
>;

export type ApiDocLayout = 'modern' | 'classic';

/**
 * The `modern` and `classic` keys take configuration applied only while that
 * layout is active, merged on top of `configuration` (`customCss` is appended
 * rather than replaced). E.g. `{ modern: { showSidebar: true } }`.
 */
export interface LayoutSwitchOptions extends Partial<
  Record<ApiDocLayout, ApiDocConfiguration>
> {
  /**
   * localStorage key the chosen layout is remembered under.
   * Defaults to `dracor.apiDocLayout`.
   */
  storageKey?: string;
}

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

  /**
   * Show a Modern / Classic switch in the top right corner. The choice is
   * remembered in localStorage; `configuration.layout` is the layout used
   * until the reader picks one.
   */
  layoutSwitch?: boolean | LayoutSwitchOptions;

  /**
   * Hide the "Powered by Scalar" link in the sidebar footer. Scalar has no
   * option for this, so it is done with CSS.
   */
  hidePoweredBy?: boolean;
}

const defaults: ApiDocConfiguration = {
  showDeveloperTools: 'never',
  agent: { disabled: true },
  // Scalar shows a "Generate MCP" button in the sidebar footer on localhost,
  // and an "Open API Client" button (linking to its hosted client) elsewhere.
  mcp: { disabled: true },
  hideClientButton: true,
  hideDarkModeToggle: true,
  showSidebar: false,
  layout: 'classic',
};

const layouts: { value: ApiDocLayout; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' },
];

const defaultStorageKey = 'dracor.apiDocLayout';

// Below Scalar's `lg` breakpoint the modern layout shows a sticky header,
// whose right end the switch covers. With the sidebar it holds the menu
// button and a breadcrumb, which is truncated short of the switch; without
// it, a full-width search button, capped at the classic layout's width
// (`max-w-64`) since it only opens the search modal. The header's bottom
// border otherwise sits right on top of the content below.
const layoutSwitchCss = `
  .t-doc__header { margin-bottom: 1rem; }
  .t-doc__header > header > span {
    min-width: 0;
    margin-right: 9.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .t-doc__header > header > button { max-width: 16rem; }
`;

const hidePoweredByCss = `
  .darklight-reference a[href^="https://scalar.com/"] { display: none; }
`;

function isLayout(value: unknown): value is ApiDocLayout {
  return value === 'modern' || value === 'classic';
}

// localStorage can be unavailable (private mode, blocked site data), in which
// case the choice just isn't remembered.
function readLayout(key: string): ApiDocLayout | undefined {
  try {
    const stored = localStorage.getItem(key);
    return isLayout(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

function storeLayout(key: string, layout: ApiDocLayout) {
  try {
    localStorage.setItem(key, layout);
  } catch {
    // ignore
  }
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
 * <ApiDoc url="/api.yaml" configuration={{ hideDownloadButton: true }} />
 * ```
 *
 * Scalar's own layout (title, license/TOS toolbar, sidebar, etc.) can be
 * tweaked via the `customCss` configuration option. See the `HiddenTitle`
 * Storybook story for a worked example that hides the OpenAPI title and
 * left-aligns the license / terms-of-service links.
 *
 * Pass `layoutSwitch` to let readers toggle between Scalar's modern and
 * classic layouts. Only the modern layout updates the URL hash as you scroll
 * through the operations, so it is the one that yields shareable links to
 * individual endpoints.
 *
 * The sidebar is off by default; pass `configuration.showSidebar: true` to
 * enable it. Note that on wide screens the modern layout only offers a search
 * button inside the sidebar. With the switch, enable it for the modern layout
 * alone via `layoutSwitch.modern`.
 */
export default function ApiDoc({
  url,
  title,
  configuration,
  layoutSwitch,
  hidePoweredBy,
}: Props) {
  const merged = { ...defaults, ...configuration };
  const options = typeof layoutSwitch === 'object' ? layoutSwitch : {};
  const storageKey = options.storageKey || defaultStorageKey;
  const initialLayout = isLayout(merged.layout) ? merged.layout : 'classic';
  const [layout, setLayout] = useState<ApiDocLayout>(
    () => (layoutSwitch && readLayout(storageKey)) || initialLayout
  );

  function changeLayout(value: ApiDocLayout) {
    setLayout(value);
    storeLayout(storageKey, value);
  }

  const forLayout = layoutSwitch ? options[layout] : undefined;
  const customCss = [
    merged.customCss,
    forLayout?.customCss,
    layoutSwitch && layoutSwitchCss,
    hidePoweredBy && hidePoweredByCss,
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="relative">
      {title !== undefined && <title>{title}</title>}
      {layoutSwitch && (
        <div
          role="radiogroup"
          aria-label="Layout"
          className="absolute top-3 right-3 z-20 flex gap-2 text-sm"
        >
          {layouts.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={layout === value}
              onClick={() => changeLayout(value)}
              className={`px-2 py-0.5 rounded border border-primary cursor-pointer ${
                layout === value ? 'bg-primary text-white' : 'text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {/* Remount on layout change rather than reconfiguring the live Scalar
          instance, which isn't built for switching layouts. */}
      <ApiReferenceReact
        key={layoutSwitch ? layout : undefined}
        configuration={{
          ...merged,
          ...forLayout,
          ...(layoutSwitch ? { layout } : {}),
          customCss,
          url,
        }}
      />
    </div>
  );
}
