// TODO: lazy load the button components
import Bibtex from '../icons/Bibtex';
import Csv from '../icons/Csv';
import Gexf from '../icons/Gexf';
import Graphml from '../icons/Graphml';
import Json from '../icons/Json';
import Rdf from '../icons/Rdf';
import Ris from '../icons/Ris';
import Tei from '../icons/Tei';
import Txt from '../icons/Txt';

export interface Props {
  /**
   * URL to download
   */
  href: string;

  /**
   * Download file name
   *
   * The name needs to start with an ASCII character or a digit. Otherwise the
   * name "download" will be used.
   */
  name: string;

  /**
   * File type of the download
   */
  type?:
    | 'bibtex'
    | 'csv'
    | 'gexf'
    | 'graphml'
    | 'json'
    | 'rdf'
    | 'ris'
    | 'tei'
    | 'txt';
}

/**
 * The download button displays an icon for the supported file types. If the
 * type is omitted the download file name is displayed as link text.
 */
export default function DownloadButton({ href, type, name }: Props) {
  const classes = 'w-14';

  // make sure we have a usable filename
  const filename = name.match(/^[a-z0-9]/i) ? name : 'download';

  let icon;
  switch (type) {
    case 'bibtex':
      icon = <Bibtex className={classes} />;
      break;
    case 'csv':
      icon = <Csv className={classes} />;
      break;
    case 'gexf':
      icon = <Gexf className={classes} />;
      break;
    case 'graphml':
      icon = <Graphml className={classes} />;
      break;
    case 'json':
      icon = <Json className={classes} />;
      break;
    case 'rdf':
      icon = <Rdf className={classes} />;
      break;
    case 'ris':
      icon = <Ris className={classes} />;
      break;
    case 'tei':
      icon = <Tei className={classes} />;
      break;
    case 'txt':
      icon = <Txt className={classes} />;
      break;
  }

  return (
    <a href={href} download={filename} className="inline-block">
      {icon || filename}
    </a>
  );
}
