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
 * The DraCor Tailwind theme provides some styling for the TEI elements. Import
 * the theme adding `@import "@dracor/react/dracor.css";` to your index.css.
 */
export default function TEIText({ url }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CETEIcean = new CETEI();

    while (ref.current?.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    CETEIcean.getHTML5(url, (data: any) => {
      ref.current?.appendChild(data);
    });
  }, [url]);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
}
