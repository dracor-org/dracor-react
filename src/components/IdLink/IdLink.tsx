const types = [
  {
    schema: 'wikidata',
    label: 'Wikidata',
    url: 'https://www.wikidata.org/wiki',
    pattern: 'https://www.wikidata.org/(?:wiki|entity)',
    classes: 'pl-[26px] bg-(image:--img-wikidata) bg-[length:17px]',
  },
  {
    schema: 'dracor',
    label: 'DraCor',
    url: 'https://dracor.org/id',
    classes: 'pl-[23px] bg-(image:--img-dracor) bg-[length:13px]',
  },
  {
    schema: 'wega',
    label: 'Carl-Maria-von-Weber-Gesamtausgabe (WeGA)',
    url: 'https://weber-gesamtausgabe.de',
    classes: 'pl-[23px] bg-(image:--img-wega) bg-[length:13px]',
  },
  {
    schema: 'isni',
    label: 'ISNI',
    url: 'https://isni.org/isni',
  },
  {
    schema: 'pnd',
    label: 'PND',
    url: 'https://d-nb.info/gnd',
  },
];

// type LinkType = 'isni' | 'pnd' | 'wikidata';

export interface Props {
  button?: boolean;
  showLabel?: boolean;
  className?: string;
  children: string;
}

export default function IdLink({ showLabel, children, className }: Props) {
  let spanClasses =
    'inline-flex bg-white bg-no-repeat bg-[5px] rounded-sm px-1.5 gap-1 align-text-bottom';

  let id;
  const type = types.find(({ pattern, url, schema }) => {
    const rx = new RegExp(
      `^(?:${pattern || url}/|${schema}:)([a-z\\d]+)$`,
      'i'
    );
    const m = children.match(rx);
    if (m) {
      id = m[1];
      return true;
    }
    return false;
  });

  if (!type) {
    return <span className={spanClasses}>{children}</span>;
  }

  const { url, label, classes = '' } = type;

  spanClasses += ` ${classes}`;

  return (
    <span className={spanClasses}>
      {showLabel && `${label}: `}
      <a className={className} href={`${url}/${id}`} title={label}>
        {id}
      </a>
    </span>
  );
}
