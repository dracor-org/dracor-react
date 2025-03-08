import type { SVGProps } from 'react';
const SvgDracor = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" {...props}>
    <defs>
      <clipPath id="dracor_svg__clip-path">
        <path
          d="M0 0h384v384H0z"
          style={{
            fill: 'none',
          }}
        />
      </clipPath>
      <style>
        {'.dracor_svg__cls-2{clip-path:url(#dracor_svg__clip-path)}'}
      </style>
    </defs>
    <g id="dracor_svg__Layer_2" data-name="Layer 2">
      <g id="dracor_svg__Layer_1-2" data-name="Layer 1">
        <g id="dracor_svg__Vektor-Smartobjekt" className="dracor_svg__cls-2">
          <path
            d="M378.47 146A192.23 192.23 0 0 0 192 0H0v384h192a192.23 192.23 0 0 0 186.47-145.95 194.5 194.5 0 0 0 0-92.1M192 347.51H36.49V210.25H71.6a121.84 121.84 0 0 0 233.18 27.8h-41a85.29 85.29 0 1 1-11.51-106.34A86 86 0 0 1 263.8 146h41a121.81 121.81 0 0 0-233.2 27.76H36.49V36.49H192c69.73 0 128.88 46.12 148.55 109.46q2.13 6.84 3.62 13.91c1 4.56 1.73 9.2 2.27 13.9h-105.6a50 50 0 0 0-2.38-5.43c-.48-.94-1-1.86-1.54-2.77a51 51 0 0 0-3.89-5.7 50 50 0 0 0-4.17-4.71 52 52 0 0 0-61.31-9.2c-1.14.6-2.26 1.26-3.35 2a51.2 51.2 0 0 0-9 7.25 52.09 52.09 0 0 0 0 73.71 51.2 51.2 0 0 0 9 7.24l3.34 2a52.07 52.07 0 0 0 61.32-9.19 50 50 0 0 0 4.18-4.72 52 52 0 0 0 3.47-5c.7-1.14 1.35-2.3 2-3.49a48 48 0 0 0 2.38-5.43h105.6c-.54 4.7-1.31 9.34-2.27 13.9q-1.49 7.08-3.62 13.91c-19.72 63.26-78.87 109.38-148.6 109.38"
            className="dracor_svg__cls-2"
            style={{
              fill: '#1f2447',
            }}
          />
        </g>
      </g>
    </g>
  </svg>
);
export default SvgDracor;
