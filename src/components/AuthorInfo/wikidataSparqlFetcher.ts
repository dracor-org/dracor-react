/**
 * Normalised author data returned by an `AuthorInfoFetcher`.
 *
 * `birthDate` / `deathDate` accept either a plain YYYY (or -YYYY) string
 * or a Wikidata "blank node" URL like
 * `http://www.wikidata.org/.well-known/genid/abc123`. The latter is
 * detected and rendered as `unknownLabel`.
 */
export interface AuthorInfoData {
  name: string;
  birthDate?: string;
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  imageUrl?: string;
}

export type AuthorInfoFetcher = (
  wikidataId: string
) => Promise<AuthorInfoData | null>;

const wikidataSparqlEndpoint = 'https://query.wikidata.org/sparql';

/**
 * Default fetcher — queries Wikidata's public SPARQL endpoint directly.
 * Suitable for casual use; consumers with a backend proxy that caches
 * or aggregates Wikidata should pass their own `fetcher` prop instead
 * to avoid hitting Wikidata's per-visitor rate limits on every render.
 */
export const wikidataSparqlFetcher: AuthorInfoFetcher = async (wikidataId) => {
  const sparql = `
SELECT ?author ?authorLabel ?birthDate ?deathDate ?gender ?genderLabel
  ?birthPlace ?birthPlaceLabel ?birthCoord
  ?deathPlace ?deathPlaceLabel ?deathCoord
  ?img ?gnd
WHERE {
  BIND (wd:${wikidataId} AS ?author)
  OPTIONAL { ?author wdt:P569 ?birthDate. }
  OPTIONAL { ?author wdt:P570 ?deathDate. }
  OPTIONAL { ?author wdt:P21 ?gender. }
  OPTIONAL { ?author wdt:P19 ?birthPlace. }
  OPTIONAL { ?author wdt:P20 ?deathPlace. }
  OPTIONAL { ?author wdt:P18 ?img. }
  OPTIONAL { ?author wdt:P227 ?gnd. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". }
}
`;

  const url = `${wikidataSparqlEndpoint}?query=${encodeURIComponent(sparql)}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (response.status !== 200) return null;

  const data = await response.json();
  const [first] = data.results?.bindings || [];
  if (!first) return null;

  const {
    authorLabel,
    img,
    birthDate,
    birthPlaceLabel,
    deathDate,
    deathPlaceLabel,
  } = first;

  return {
    name: authorLabel?.value,
    birthDate: birthDate?.value,
    birthPlace: birthPlaceLabel?.value,
    deathDate: deathDate?.value,
    deathPlace: deathPlaceLabel?.value,
    imageUrl: img?.value,
  };
};
