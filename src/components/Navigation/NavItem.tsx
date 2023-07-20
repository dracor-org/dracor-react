import { Link } from 'react-router-dom';

export interface Props {
  label: string;
  href: string;
  active?: boolean;
  className?: string;
}

export default function NavItem ({label, href, active, className}: Props) {
  return (
    <Link to={href} className={itemClassNames(active, className)}>
      {label}
    </Link>
  );
}

export function itemClassNames (
  active: boolean = false,
  className: string = ''
): string {
  return `block md:inline-block justify-center text-white hover:text-blue-100
    uppercase
    ${
      active ? 'border-b-4' : ''
    } ${className}`;
}
