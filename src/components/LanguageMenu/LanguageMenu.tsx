import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';

export interface Props {
  languages: string[];
  current?: string;
  onSelect: (lang: string) => void;
}

export default function LanguageMenu({
  languages,
  current = '',
  onSelect,
}: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="relative justify-center inline-flex mr-8 hover:text-neutral-100">
        <FontAwesomeIcon icon={faLanguage} size="2x" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="flex flex-col origin-top absolute top-6 mt-2 p-[0.2em] rounded-sm shadow-lg bg-white ring-1 ring-black/10 focus:outline-none z-10">
          {languages.map((lng) => (
            <MenuItem key={lng}>
              <button
                key={lng}
                className={`group flex w-full items-center rounded-sm px-2 py-1
                    text-sm ${
                      lng === current
                        ? 'bg-blue-300 text-white font-medium'
                        : 'text-gray-900 hover:text-gray-900 hover:bg-blue-100'
                    }`}
                onClick={() => onSelect(lng)}
              >
                {lng}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
