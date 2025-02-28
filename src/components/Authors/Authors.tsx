import IdLink from '../IdLink';

interface Author {
  name: string;
  pseudonym?: string;
  ref?: string;
}

export interface Props {
  data: Author[];
}

const Authors = ({ data }: Props) => {
  return (
    <>
      {data.map((author, i) => (
        <span key={`${i}-${author.name}`}>
          {i > 0 && <br />}
          {author.name}
          {author.pseudonym && <i> ({author.pseudonym})</i>}
          {author.ref && (
            <>
              {' '}
              <small>
                <IdLink>{author.ref}</IdLink>
              </small>
            </>
          )}
        </span>
      ))}
    </>
  );
};

export default Authors;
