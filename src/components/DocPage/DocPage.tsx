import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';

export interface Props {
  url?: string;
  match?: () => string | null;
}

export default function DocPage({ url, match }: Props) {
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchMarkdown(source: string) {
      try {
        const response = await fetch(source, { method: 'GET' });
        if (response.status == 404) {
          setMarkdown('Not Found');
          setTitle('Not Found');
          return;
        }
        if (response.status !== 200) {
          console.log(response.status);
          throw new Error(`Request failed with status ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        console.log({ contentType });
        if (!contentType || !contentType.includes('text/markdown')) {
          setMarkdown("Oops, we haven't got Markdown!");
          setTitle('No Markdown');
          return;
        }
        const data = await response.text();
        setMarkdown(data);
        const firstLine = data.replace(/^\s+/, '').split(/(\n|\r|\r\n){2,}/)[0];
        const m = firstLine.match(/^#\s*(.+)/);
        setTitle(m ? m[1] : '...');
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Request failed with status code 404'
        ) {
          setMarkdown('Not Found');
          setTitle('Not Found');
        } else {
          setMarkdown('Something went wrong.');
          setTitle('Error');
          console.error(error);
        }
      }
    }

    const source = url || (match ? match() : null);
    if (source) {
      fetchMarkdown(source);
    }
  }, [url, match]);

  return (
    <div>
      {title && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}
      <ReactMarkdown children={markdown} />
    </div>
  );
}
