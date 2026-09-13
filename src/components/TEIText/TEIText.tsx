import { useEffect, useRef } from 'react';
import CETEI from 'CETEIcean';

export interface Props {
  /**
   * URL to a TEI document
   */
  url: string;
}
/**
 * Component rendering a TEI document using [CETEIcean](https://github.com/TEIC/CETEIcean)
 *
 * Styling for TEI elements ships in a dedicated stylesheet. Import it
 * from your index.css:
 *
 *     @import "@dracor/react/tei.css";
 *
 * Import in addition to `@dracor/react/dracor.css`, or on its own if
 * you are only rendering TEI documents.
 */
export default function TEIText({ url }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CETEIcean = new CETEI();

    while (ref.current?.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    CETEIcean.getHTML5(url, (data: never) => {
      ref.current?.appendChild(data);
    });
  }, [url]);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
}
