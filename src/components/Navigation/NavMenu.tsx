import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { itemClassNames } from './NavItem';

interface Item {
  label: string;
  href: string;
  selected?: boolean;
}

export interface Props {
  label: string;
  items: Item[];
  menuClass?: string;
}

export default function NavMenu({ label, items, menuClass }: Props) {
  const location = useLocation();

  function isActive({ href, selected }: Item) {
    if (selected !== undefined) {
      return selected;
    }
    return location.pathname.startsWith(href);
  }

  const active = Boolean(items.find((item) => isActive(item)));

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={itemClassNames(active, menuClass)}>
          {label}
          <FontAwesomeIcon
            icon={faCaretDown}
            className="ml-2 mt-1"
            size="sm"
            aria-hidden="true"
          />
        </Menu.Button>
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
        <Menu.Items className="absolute left-0 mt-2 min-w-fit whitespace-nowrap origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.href}>
                {({ active }) => (
                  <Link
                    to={item.href}
                    className={`${active ? 'bg-blue-100' : ''} ${
                      isActive(item) ? 'bg-blue-300 text-white' : ''
                    } text-gray-900 group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                  >
                    {item.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
