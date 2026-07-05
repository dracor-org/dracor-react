import { type ReactNode, useId } from 'react';
import { Link } from '@tanstack/react-router';
import Commit from '../Commit';

export interface CorpusCardRowProps {
  label: ReactNode;
  value: ReactNode;
  valueClassName?: string;
  popoverContent?: ReactNode;
  numberLocale?: string;
}

export function CorpusCardRow({
  label,
  value,
  valueClassName,
  popoverContent,
  numberLocale = 'en',
}: CorpusCardRowProps) {
  const id = useId();
  const anchorName = `--anchor-${id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  const content =
    typeof value === 'number' ? value.toLocaleString(numberLocale) : value;
  const valueClasses = `font-bold ${valueClassName ?? ''}`.trim();
  return (
    <tr className="border-b-2 text-primary font-normal">
      <td className="pt-2 pb-1 px-3">
        {popoverContent ? (
          <>
            <button
              type="button"
              popoverTarget={id}
              style={{ anchorName } as React.CSSProperties}
              className={`${valueClasses} cursor-pointer`}
            >
              {content}
            </button>
            <div
              id={id}
              popover=""
              className="m-0 p-3 rounded-lg border border-gray-200 shadow-lg bg-white text-sm [position-area:block-end_span-inline-end]"
              style={{ positionAnchor: anchorName } as React.CSSProperties}
            >
              {popoverContent}
            </div>
          </>
        ) : (
          <span className={valueClasses}>{content}</span>
        )}
      </td>
      <th className="pt-2 pb-1 px-3 text-right font-normal">{label}</th>
    </tr>
  );
}

export interface CorpusCardProps {
  title: string;
  to: string;
  commit?: string;
  repo?: string;
  updated?: string;
  locale?: string;
  className?: string;
  children?: ReactNode;
}

export default function CorpusCard({
  title,
  to,
  commit,
  repo,
  updated,
  locale,
  className,
  children,
}: CorpusCardProps) {
  const hasFooterRows = Boolean(commit || updated);
  const hasTable = Boolean(children) || hasFooterRows;
  const wrapperClass =
    `rounded-xl inline-block shadow-lg ${className ?? ''}`.trim();
  return (
    <div className={wrapperClass}>
      <div className="bg-white rounded-t-xl p-2 text-2xl font-bold text-primary whitespace-nowrap text-ellipsis overflow-hidden">
        <Link to={to as never} className="text-primary" title={title}>
          {title}
        </Link>
      </div>
      {hasTable && (
        <table className="m-0 w-full">
          <tbody>
            {children}
            {commit && (
              <CorpusCardRow
                label="Git commit"
                value={<Commit repo={repo}>{commit}</Commit>}
              />
            )}
            {updated && (
              <CorpusCardRow
                label="last update"
                value={new Date(updated).toLocaleString(locale)}
              />
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
