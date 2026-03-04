import { Link, type LinkProps } from '@tanstack/react-router';

export type Props = LinkProps & {
  label: string;
  className?: string;
};

export default function NavItem({ label, to, params, href, className }: Props) {
  const linkClasses =
    `block md:inline-block justify-center text-white ` +
    `hover:text-blue-100 uppercase ${className}`;

  if (href?.startsWith('http') || href?.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      to={to}
      params={params}
      className={`[&.active]:border-b-4  ${linkClasses}`}
    >
      {label}
    </Link>
  );
}
