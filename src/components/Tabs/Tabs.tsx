import { useEffect, useRef } from 'react';
import { Link, type LinkProps } from '@tanstack/react-router';

type TabData = LinkProps & {
  label: string;
};

export interface Props {
  data: TabData[];
  /** Wrap tabs onto several rows instead of scrolling horizontally. */
  wrap?: boolean;
  /** Additional classes for the row containing the tabs. */
  className?: string;
}

export default function Tabs({
  data: tabs,
  wrap = false,
  className = '',
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Make sure a deep-linked tab at the end of the row is visible. We set
  // scrollLeft directly since scrollIntoView would also scroll the page.
  useEffect(() => {
    // The row starts at scrollLeft 0, so we only need to scroll to the right.
    const row = rowRef.current!;
    const active = row.querySelector<HTMLElement>('[data-status="active"]');
    if (wrap || !active) return;
    const overflow =
      active.getBoundingClientRect().right - row.getBoundingClientRect().right;
    if (overflow > 0) row.scrollLeft += Math.ceil(overflow);
  }, [wrap]);

  const linkClasses =
    'inline-block p-4 border-b-2  text-gray-500 hover:text-gray-600 ' +
    'border-transparent hover:border-gray-300 [&.active]:border-primary';

  // The baseline is drawn as an inset shadow on the row itself (rather than
  // a border on a wrapper with a -1px overlap) so that the active tab's
  // underline covers it without being clipped by overflow-x-auto.
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
          'shadow-[inset_0_-1px_0_0_var(--color-gray-200)] ' +
          `dark:shadow-[inset_0_-1px_0_0_var(--color-gray-700)] ${className}`
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
