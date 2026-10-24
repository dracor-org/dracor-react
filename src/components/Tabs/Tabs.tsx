import { useEffect, useRef } from 'react';
import { Link, useLocation, type LinkProps } from '@tanstack/react-router';

type TabData = LinkProps & {
  label: string;
};

export interface Props {
  data: TabData[];
  /** Wrap tabs onto several rows instead of scrolling horizontally. */
  wrap?: boolean;
  /**
   * Additional classes for the row containing the tabs. They are appended
   * without merging, so they cannot reliably override the row's own utilities
   * (`flex`, `gap-*`, `shadow-*`, …). To change or remove the baseline, set
   * the `--tabs-baseline` CSS variable on the row or any ancestor instead,
   * e.g. `--tabs-baseline: transparent`.
   */
  className?: string;
}

export default function Tabs({
  data: tabs,
  wrap = false,
  className = '',
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const href = useLocation({ select: (location) => location.href });

  // Keep the active tab visible when the location changes, e.g. on a deep
  // link or browser back/forward while the tabs stay mounted. We set
  // scrollLeft directly since scrollIntoView would also scroll the page.
  useEffect(() => {
    const row = rowRef.current!;
    if (wrap) return;
    const scrollToActive = () => {
      const active = row.querySelector('[data-status="active"]');
      if (!active) return;
      const rowRect = row.getBoundingClientRect();
      const tabRect = active.getBoundingClientRect();
      if (tabRect.left < rowRect.left) {
        row.scrollLeft -= Math.ceil(rowRect.left - tabRect.left);
      } else if (tabRect.right > rowRect.right) {
        row.scrollLeft += Math.ceil(tabRect.right - rowRect.right);
      }
    };
    scrollToActive();
    // measure again once webfonts have loaded and tab widths have settled
    document.fonts?.ready.then(scrollToActive);
  }, [wrap, href]);

  const linkClasses =
    'inline-block p-4 border-b-2  text-gray-500 hover:text-gray-600 ' +
    'border-transparent hover:border-gray-300 [&.active]:border-primary ' +
    // inset ring, since an outline would be clipped by the scrolling row
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ' +
    'focus-visible:ring-primary';

  // The baseline is drawn as an inset shadow on the row itself (rather than
  // a border on a wrapper with a -1px overlap) so that the active tab's
  // underline covers it without being clipped by overflow-x-auto. Consumers
  // can recolour or hide it through the --tabs-baseline variable.
  const rowClasses = wrap
    ? 'flex flex-wrap'
    : 'flex flex-nowrap overflow-x-auto whitespace-nowrap ' +
      '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <div
        ref={rowRef}
        className={
          `${rowClasses} gap-3 ` +
          'shadow-[inset_0_-1px_0_0_var(--tabs-baseline,var(--color-gray-200))] ' +
          'dark:shadow-[inset_0_-1px_0_0_var(--tabs-baseline,var(--color-gray-700))] ' +
          className
        }
      >
        {tabs.map(({ label, ...linkProps }) => (
          <div key={label} className="shrink-0">
            <Link {...linkProps} className={linkClasses}>
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
