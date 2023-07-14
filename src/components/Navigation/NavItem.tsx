
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  classnames, display, textColor, margin, borders, TTailwindString
} from 'tailwindcss-classnames';

export interface Props {
  label: ReactNode;
  href: string;
  active?: boolean;
  className?: TTailwindString;
}

export default function NavItem ({label, href, active, className}: Props) {
  const classes = classnames(
    display('block', 'md:inline-block'),
    textColor('text-white', 'hover:text-blue-100'),
    margin('mt-4', 'md:mt-1', 'md:mr-6'),
    borders({'border-b-4': active}),
    className,
  );

  return (
    <Link to={href} className={classes}>{label}</Link>
  );
}
