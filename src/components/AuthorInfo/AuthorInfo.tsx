import { useEffect, useState } from 'react';
import IdLink from '../IdLink';
import { formatYear } from '../../utils';
import {
  wikidataSparqlFetcher,
  type AuthorInfoFetcher,
} from './wikidataSparqlFetcher';

const commonsIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='102' height='137' viewBox='-305 -516 610 820'%3E%3Ctitle%3EWikimedia Commons Logo%3C/title%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Ccircle r='298'/%3E%3C/clipPath%3E%3C/defs%3E%3Ccircle r='100' fill='%23900'/%3E%3Cg fill='%23069'%3E%3Cg id='arrow' clip-path='url(%23c)'%3E%3Cpath d='m-11 180v118h22v-118'/%3E%3Cpath d='m-43 185l43-75 43 75'/%3E%3C/g%3E%3Cg id='arrows3'%3E%3Cuse xlink:href='%23arrow' transform='rotate(45)'/%3E%3Cuse xlink:href='%23arrow' transform='rotate(90)'/%3E%3Cuse xlink:href='%23arrow' transform='rotate(135)'/%3E%3C/g%3E%3Cuse xlink:href='%23arrows3' transform='scale(-1 1)'/%3E%3Cpath id='blue_path' transform='rotate(-45)' stroke='%23069' stroke-width='84' fill='none' d='M 0,-256 A 256 256 0 1 0 256,0 C 256,-100 155,-150 250,-275'/%3E%3Cpath id='arrow_top' d='m-23-515s-36 135-80 185 116-62 170-5-90-180-90-180z'/%3E%3C/g%3E%3C/svg%3E";

export interface Props {
  wikidataId: string;
  name?: string;
  birthLabel?: string;
  deathLabel?: string;
  unknownLabel?: string;
  /**
   * Async function returning normalised author data for a Wikidata QID.
   * Defaults to `wikidataSparqlFetcher`, which queries Wikidata's public
   * SPARQL endpoint. Pass a custom fetcher to route through a backend
   * proxy for caching / rate-limit protection.
   */
  fetcher?: AuthorInfoFetcher;
}

interface RenderInfo {
  name: string;
  imageUrl?: string;
  commonsPage?: string;
  birth: string[];
  death: string[];
}

export default function AuthorInfo({
  wikidataId,
  name: fullname,
  birthLabel = 'b.',
  deathLabel = 'd.',
  unknownLabel = 'unknown',
  fetcher = wikidataSparqlFetcher,
}: Props) {
  const [info, setInfo] = useState<RenderInfo | null>(null);

  useEffect(() => {
    function formatDate(value: string): string {
      // See https://www.mediawiki.org/wiki/Wikidata_Query_Service/Blank_Node_Skolemization
      if (value.startsWith('http://www.wikidata.org/.well-known/genid')) {
        return unknownLabel;
      }
      return formatYear(value.replace(/^(-?\d{4}).*$/, '$1'));
    }

    async function load(id: string) {
      try {
        const data = await fetcher(id);
        if (!data) return;

        const birth: string[] = [];
        const death: string[] = [];
        if (data.birthDate) birth.push(formatDate(data.birthDate));
        if (data.birthPlace) birth.push(data.birthPlace);
        if (data.deathDate) death.push(formatDate(data.deathDate));
        if (data.deathPlace) death.push(data.deathPlace);

        const render: RenderInfo = { name: data.name, birth, death };
        if (data.imageUrl) {
          render.imageUrl = data.imageUrl.replace(/^http:/, 'https:');
          render.commonsPage = data.imageUrl
            .replace(/Special:FilePath\//, 'File:')
            .replace(/^http:/, 'https:');
        }
        setInfo(render);
      } catch (error) {
        console.error(error);
      }
    }

    if (wikidataId) load(wikidataId);
  }, [wikidataId, unknownLabel, fetcher]);

  const { name, imageUrl, commonsPage, birth = [], death = [] } = info || {};

  return (
    <div className="flex whitespace-nowrap">
      <div
        className="relative w-[5em] h-[6em] overflow-hidden bg-(image:--img-author) bg-no-repeat bg-center bg-primary rounded-md border-2 border-primary mr-4"
        style={{ backgroundSize: '70%' }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            title={name}
            alt=""
            className="object-cover object-top w-full h-full"
          />
        )}
        {commonsPage && (
          <a
            href={commonsPage}
            title="© Wikimedia Commons"
            className="absolute flex inset-0 z-10 bg-white/0 hover:bg-white/60"
          >
            <img
              src={commonsIcon}
              className="opacity-0 hover:opacity-100 place-self-center w-full h-full p-[20%]"
              width="17"
              alt="Wikimedia Commons"
            />
          </a>
        )}
      </div>
      <span>
        <div className="text-lg">{fullname || name}</div>
        {wikidataId && (
          <div>
            <IdLink>{`wikidata:${wikidataId}`}</IdLink>
          </div>
        )}
        {birth.length > 0 && (
          <div>
            {birthLabel} {birth.join(', ')}
          </div>
        )}
        {death.length > 0 && (
          <div>
            {deathLabel} {death.join(', ')}
          </div>
        )}
      </span>
    </div>
  );
}
