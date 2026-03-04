import { Link, type LinkProps } from '@tanstack/react-router';

type TabData = LinkProps & {
  label: string;
};

export interface Props {
  data: TabData[];
}

export default function Tabs({ data: tabs }: Props) {
  const linkClasses =
    'inline-block p-4 border-b-2  text-gray-500 hover:text-gray-600 ' +
    'border-transparent hover:border-gray-300 [&.active]:border-primary';
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <div className="flex flex-wrap -mb-px gap-3">
        {tabs.map(({ label, to }) => (
          <div key={label}>
            <Link to={to} className={linkClasses}>
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
