import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
  children: string;
  prefix?: string;
  uri?: string;
  className?: string;
}

const { protocol, host } = window.location;
const defaultPrefix = `${protocol}//${host}/id/`;

export default function IdCopy({
  children,
  className = '',
  uri,
  prefix,
}: Props) {
  const id = children;
  const text = uri || `${prefix || defaultPrefix}${id}`;
  return (
    <span
      className={`inline-flex bg-white rounded-sm px-1.5 gap-1 align-text-bottom cursor-pointer ${className}`}
    >
      <CopyToClipboard text={text}>
        <span title="copy to clipboard">
          <span className="pr-1">{id}</span>
          <FontAwesomeIcon icon={faClipboard} size="sm" />
        </span>
      </CopyToClipboard>
    </span>
  );
}
