import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenFancy,
  faTheaterMasks,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { formatYear } from '../../utils';

export interface Props {
  written?: number;
  premiere?: number;
  print?: number;
  locale?: string;
  labelWritten?: string;
  labelPremiered?: string;
  labelPrinted?: string;
}

export default function Years({
  written,
  premiere,
  print,
  locale,
  labelPremiered = 'premiered',
  labelPrinted = 'printed',
  labelWritten = 'written',
}: Props) {
  return (
    <>
      {written && (
        <>
          <span title={labelWritten}>
            <FontAwesomeIcon icon={faPenFancy} size="sm" />
            &nbsp;
            {formatYear(written, locale)}
          </span>{' '}
        </>
      )}
      {premiere && (
        <>
          <span title={labelPremiered}>
            <FontAwesomeIcon icon={faTheaterMasks} size="sm" />
            &nbsp;
            {formatYear(premiere, locale)}
          </span>{' '}
        </>
      )}
      {print && (
        <span title={labelPrinted}>
          <FontAwesomeIcon icon={faBook} size="sm" />
          &nbsp;
          {formatYear(print, locale)}
        </span>
      )}
    </>
  );
}
