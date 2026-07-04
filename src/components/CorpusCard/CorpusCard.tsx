import { Link } from '@tanstack/react-router';
import Commit from '../Commit';

export interface Metrics {
  plays: number;
  characters: number;
  male: number;
  female: number;
  sp?: number;
  stage?: number;
  wordcount: {
    text: number;
    sp: number;
    stage: number;
  };
  updated: string;
}

export interface Props {
  name: string;
  title: string;
  to: string;
  acronym?: string;
  commit?: string;
  repo?: string;
  metrics: Metrics;
  locale?: string;
}

const badge = 'bg-primary text-white px-1.5 py-0.5 rounded-full text-xs';

export default function CorpusCard({
  name,
  title,
  to,
  acronym,
  commit,
  repo,
  metrics,
  locale = 'en',
}: Props) {
  const prefix = acronym
    ? acronym.replace('DraCor', '')
    : name.charAt(0).toUpperCase() + name.slice(1);

  const fn = (val: number) =>
    Number(Number.parseFloat(String(val))).toLocaleString(locale);

  return (
    <div className="w-full rounded-[0.8em] shadow-[0_5px_5px_0_rgba(0,0,0,0.2),0_5px_1em_0_rgba(0,0,0,0.08),0_4px_0px_0_#33405220] hover:shadow-[0px_10px_35px_-15px_rgba(0,0,0,0.75),0_5px_1em_0_rgba(0,0,0,0.08),0_2px_0px_0_#33405220] transition-shadow duration-300 bg-neutral-100 text-primary">
      <Link to={to} className="hover:no-underline">
        <h2 className="bg-white text-primary px-3 py-3 rounded-t-[0.4em] text-[2.5rem] font-medium mt-0 mb-0">
          <span className="bg-primary text-white px-[0.45rem] py-[0.05rem] rounded-[0.2em] mr-[0.05em] font-normal capitalize">
            {prefix}
          </span>
          DraCor
        </h2>
      </Link>
      <h3 className="bg-secondary-100 text-primary px-3 py-1.5 text-[1.2em] font-light mt-0 mb-0">
        <Link to={to} className="text-primary hover:no-underline">
          {title}
        </Link>
      </h3>
      <table className="grow-0 w-[calc(100%-1.6em)] mx-[0.8em] mb-[0.8em] mt-0">
        <tbody>
          <tr className="h-[3.5em] border-b border-primary">
            <th className="p-1 text-left align-bottom text-[3em] leading-none font-medium">
              {fn(metrics.plays)}
            </th>
            <td className="p-1 text-right align-bottom font-light">
              Number of plays
            </td>
          </tr>
          <tr className="h-[4em] border-b border-primary">
            <th className="p-1 text-left align-bottom text-base font-medium">
              {fn(metrics.characters)}
              <br />
              <span className="font-light">
                {metrics.male + metrics.female > 0
                  ? `(M: ${metrics.male}, F: ${metrics.female})`
                  : ''}
              </span>
            </th>
            <td className="p-1 text-right align-bottom font-light">
              <code className={badge}>person</code>
              {' + '}
              <code className={badge}>personGrp</code>
              <br />
              Number of characters
            </td>
          </tr>
          <tr className="h-[4em] border-b border-primary">
            <th className="p-1 text-left align-bottom text-base font-medium">
              {fn(metrics.wordcount.text)}
            </th>
            <td className="p-1 text-right align-bottom font-light">
              <code className={badge}>text</code>
              <br />
              Text tokens
            </td>
          </tr>
          <tr className="h-[4em] border-b border-primary">
            <th className="p-1 text-left align-bottom text-base font-medium">
              {metrics.sp !== undefined ? fn(metrics.sp) : '—'}
              <br />
              <span className="font-light">({fn(metrics.wordcount.sp)})</span>
            </th>
            <td className="p-1 text-right align-bottom font-light">
              <code className={badge}>sp</code>
              <br />
              (Tokens)
            </td>
          </tr>
          <tr className="h-[4em] border-b border-primary">
            <th className="p-1 text-left align-bottom text-base font-medium">
              {metrics.stage !== undefined ? fn(metrics.stage) : '—'}
              <br />
              <span className="font-light">({fn(metrics.wordcount.stage)})</span>
            </th>
            <td className="p-1 text-right align-bottom font-light">
              <code className={badge}>stage</code>
              <br />
              (Tokens)
            </td>
          </tr>
          <tr className="h-[4em]">
            <th className="p-1 text-left align-bottom text-base font-medium">
              Last update
            </th>
            <td className="p-1 text-right align-bottom font-light">
              {commit && (
                <>
                  <Commit repo={repo}>{commit}</Commit>
                  <br />
                </>
              )}
              {new Date(metrics.updated).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
