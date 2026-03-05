import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface Props {
  repo?: string;
  children: string;
}

export default function Commit({ repo, children }: Props) {
  const sha = children.trim();
  const short = sha.substring(0, 7);
  const url = `${repo}/commit/${sha}`;

  if (repo) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="text-sm"
      >
        <FontAwesomeIcon icon={faGithub} size="lg" className="mr-1" />
        {short}
      </a>
    );
  }

  return <span title="Git commit">{short}</span>;
}
