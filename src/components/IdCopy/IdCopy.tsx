import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Dracor, Ein } from '../icons';

interface Props {
  children: string;
  prefix?: string;
  uri?: string;
  className?: string;
  icon?: 'ein' | 'dracor';
}

const { protocol, host } = window.location;
const defaultPrefix = `${protocol}//${host}/id/`;

export default function IdCopy({
  children,
  className = '',
  uri,
  prefix,
  icon,
}: Props) {
  const [copied, setCopied] = useState(false);
  const id = children;
  const text = uri || `${prefix || defaultPrefix}${id}`;

  function handleClick() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <span
      className={`inline-flex bg-white rounded-sm px-1.5 gap-1 align-text-bottom cursor-pointer ${className}`}
    >
      {icon === 'ein' && <Ein style={{ width: '25px' }} />}
      {icon === 'dracor' && <Dracor style={{ width: '15px' }} />}
      <span title={copied ? 'Copied!' : 'copy to clipboard'} onClick={handleClick}>
        <span className="pr-1">{id}</span>
        <FontAwesomeIcon icon={copied ? faCheck : faClipboard} size="sm" />
      </span>
    </span>
  );
}
