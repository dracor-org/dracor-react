import { Link } from 'react-router-dom';

interface TabData {
  label: string;
  href: string;
  active?: boolean;
}

export interface Props {
  data: TabData[];
}

export default function Tabs({data: tabs}: Props) {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <div className="flex flex-wrap -mb-px gap-3">
        {tabs.map(({label, href, active}) => (
          <div key={href}>
            <Link to={href} className={linkClasses(active || false)}>
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export function linkClasses(active: boolean) {
  let classes = 'inline-block p-4 border-b-2  text-gray-500 hover:text-gray-600';
  if (active) {
    classes += ' border-primary';
  } else {
    classes += ' border-transparent hover:border-gray-300';
  }
  return classes;
}
