import { useEffect, useState } from 'react';
import axios from 'axios';
import IdLink from '../IdLink';
import { formatYear } from '../../utils';

const endpoint = 'https://query.wikidata.org/sparql';

const commonsIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='102' height='137' viewBox='-305 -516 610 820'%3E%3Ctitle%3EWikimedia Commons Logo%3C/title%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Ccircle r='298'/%3E%3C/clipPath%3E%3C/defs%3E%3Ccircle r='100' fill='%23900'/%3E%3Cg fill='%23069'%3E%3Cg id='arrow' clip-path='url(%23c)'%3E%3Cpath d='m-11 180v118h22v-118'/%3E%3Cpath d='m-43 185l43-75 43 75'/%3E%3C/g%3E%3Cg id='arrows3'%3E%3Cuse xlink:href='%23arrow' transform='rotate(45)'/%3E%3Cuse xlink:href='%23arrow' transform='rotate(90)'/%3E%3Cuse xlink:href='%23arrow' transform='rotate(135)'/%3E%3C/g%3E%3Cuse xlink:href='%23arrows3' transform='scale(-1 1)'/%3E%3Cpath id='blue_path' transform='rotate(-45)' stroke='%23069' stroke-width='84' fill='none' d='M 0,-256 A 256 256 0 1 0 256,0 C 256,-100 155,-150 250,-275'/%3E%3Cpath id='arrow_top' d='m-23-515s-36 135-80 185 116-62 170-5-90-180-90-180z'/%3E%3C/g%3E%3C/svg%3E";

export interface Props {
  wikidataId: string;
  name?: string;
  birthLabel?: string;
  deathLabel?: string;
}

interface Info {
  name: string;
  imageUrl?: string;
  commonsPage?: string;
  birth?: string[];
  death?: string[];
  gender?: string;
}

export default function AuthorInfo({
  wikidataId,
  name: fullname,
  birthLabel = 'b.',
  deathLabel = 'd.',
}: Props) {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    async function fetchInfo(id: string) {
      const sparql = `
SELECT ?author ?authorLabel ?birthDate ?deathDate ?gender ?genderLabel
  ?birthPlace ?birthPlaceLabel ?birthCoord
  ?deathPlace ?deathPlaceLabel ?deathCoord
  ?img ?gnd
WHERE {
  BIND (wd:${id} AS ?author)
  OPTIONAL { ?author wdt:P569 ?birthDate. }
  OPTIONAL { ?author wdt:P570 ?deathDate. }
  OPTIONAL { ?author wdt:P21 ?gender. }
  OPTIONAL { ?author wdt:P19 ?birthPlace. }
  OPTIONAL { ?author wdt:P20 ?deathPlace. }
  #OPTIONAL { ?birthPlace wdt:P625 ?birthCoord. }
  OPTIONAL { ?author wdt:P18 ?img. }
  OPTIONAL { ?author wdt:P227 ?gnd. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". }
}
`;

      const url = `${endpoint}?query=${encodeURIComponent(sparql)}`;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const sparqlResults = response.data.results?.bindings || [];

          const {
            authorLabel,
            img,
            birthDate,
            birthPlaceLabel,
            deathDate,
            deathPlaceLabel,
          } = sparqlResults[0];

          const birth = [];
          const death = [];

          if (birthDate?.value) {
            birth.push(
              formatYear(birthDate?.value.replace(/^(-?\d{4}).*$/, '$1'))
            );
          }
          if (birthPlaceLabel?.value) birth.push(birthPlaceLabel.value);

          if (deathDate?.value) {
            death.push(
              formatYear(deathDate?.value.replace(/^(-?\d{4}).*$/, '$1'))
            );
          }
          if (deathPlaceLabel?.value) death.push(deathPlaceLabel.value);

          const aInfo: Info = { name: authorLabel.value, birth, death };

          if (img?.value) {
            aInfo.imageUrl = img.value.replace(/^http:/, 'https:');
            aInfo.commonsPage = img.value
              .replace(/Special:FilePath\//, 'File:')
              .replace(/^http:/, 'https:');
          }

          setInfo(aInfo);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (wikidataId) fetchInfo(wikidataId);
  }, [wikidataId]);

  const { name, imageUrl, commonsPage, birth = [], death = [] } = info || {};

  return (
    <div className="flex whitespace-nowrap">
      <div
        className="relative w-[5em] h-[6em] overflow-hidden bg-author bg-no-repeat bg-center bg-primary rounded-md border-2 border-primary mr-4"
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
