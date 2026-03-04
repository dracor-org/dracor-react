import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import { Link, useLocation, type LinkProps } from '@tanstack/react-router';

const menuLinkClasses =
  'group flex w-full items-center rounded-sm px-2 py-1 text-sm text-gray-900 ' +
  'hover:text-gray-900 hover:bg-blue-100';

type Item = LinkProps & {
  label: string;
};

export interface Props {
  label: string;
  items: Item[];
  menuClass?: string;
}

export default function NavMenu({ label, items, menuClass }: Props) {
  const location = useLocation();

  function isActive({ to }: Item) {
    return to && location.pathname.startsWith(to);
  }

  const active = Boolean(items.find((item) => isActive(item)));

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className={
            'block md:inline-block justify-center text-white ' +
            `hover:text-blue-100 uppercase ${active ? 'border-b-4' : ''} ${menuClass}`
          }
        >
          {label}
          <FontAwesomeIcon
            icon={faCaretDown}
            className="ml-2 mt-1"
            size="sm"
            aria-hidden="true"
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute left-0 mt-2 min-w-fit whitespace-nowrap origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg focus:outline-hidden">
          <div className="px-1 py-1">
            {items.map(({ to, href, params, label }) => (
              <MenuItem key={label}>
                {href?.startsWith('http') || href?.startsWith('mailto:') ? (
                  <a
                    href={href}
                    className={menuLinkClasses}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    to={to}
                    params={params}
                    className={
                      menuLinkClasses +
                      ' [&.active]:bg-blue-300 [&.active]:text-white [&.active]:font-medium [&.active]:hover:bg-blue-100 [&.active]:hover:text-gray-900'
                    }
                  >
                    {label}
                  </Link>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
