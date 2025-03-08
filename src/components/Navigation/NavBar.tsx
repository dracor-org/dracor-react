import { JSX, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  classnames,
  display,
  width,
  flexGrow,
  alignItems,
} from 'tailwindcss-classnames';
import NavItem, { Props as NavItemProps } from './NavItem';
import NavMenu, { Props as NavMenuProps } from './NavMenu';

export interface NavBarProps {
  title: string;
  logo?: string;
  logoClass?: string;
  version?: string;
  gitHubUrl?: string;
  gitHubIcon?: JSX.Element;
  navItems?: (NavItemProps | NavMenuProps)[];
}

export default function NavBar({
  title,
  logo,
  logoClass,
  version,
  gitHubUrl,
  gitHubIcon,
  navItems,
}: NavBarProps) {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  function isActive({ href, active }: NavItemProps) {
    if (active !== undefined) {
      return active;
    }
    return location.pathname.startsWith(href);
  }

  const menuWrapperClasses = classnames(
    display('block', 'md:flex', { hidden: !showNav }),
    flexGrow('grow'),
    alignItems('md:items-center'),
    width('w-full', 'md:w-auto')
  );

  return (
    <nav className="flex items-center justify-between flex-wrap p-4 bg-primary text-white font-medium">
      <Link to="/">
        <img
          alt={`${title} logo`}
          title={`${title}${version ? ` (${version})` : ''}`}
          className={`h-12 ${logoClass || ''}`}
          src={logo}
        />
      </Link>
      <div className="block md:hidden">
        <button
          className="flex items-center px-3 py-2 hover:text-blue-100"
          onClick={() => setShowNav(!showNav)}
        >
          <svg
            className="fill-current h-10 w-10"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className={menuWrapperClasses}>
        {navItems?.length && (
          <div className="my-2 md:grow md:flex-row flex justify-center flex-col gap-4">
            {navItems.map((item) =>
              'items' in item ? (
                <NavMenu
                  key={item.label}
                  label={item.label}
                  items={item.items}
                />
              ) : (
                <NavItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  active={isActive(item)}
                />
              )
            )}
          </div>
        )}
        {gitHubUrl && (
          <div>
            <a
              href={gitHubUrl}
              title="EcoCor Github"
              className="text-white text-2xl"
            >
              {gitHubIcon ? (
                gitHubIcon
              ) : (
                <FontAwesomeIcon icon={faGithub} size="2xl" />
              )}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
