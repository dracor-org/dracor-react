const plugin = require('tailwindcss/plugin');

const config = {
  theme: {
    extend: {
      colors: {
        primary: '#1f2448',
        secondary: {
          100: '#aef',
          200: '#08f',
        },
        neutral: {
          100: '#ebf0f7',
          200: '#1f244809',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            strong: {
              fontWeight: '500',
            },
            h1: {
              fontWeight: '500',
            },
            h2: {
              fontWeight: '500',
            },
            h3: {
              fontWeight: '500',
            },
            a: {
              color: '#08f',
                '&:hover': {
                color: '#0056b3',
              },
              fontWeight: '400',
              textDecoration: false,
            },
          },
        },
      },
      height: {
        'calc-full-0.75': 'calc(100% - 0.75rem)',
      },
      backgroundImage: {
        wikidata: `url("data:image/svg+xml,%3Csvg version='1.1' id='Ebene_1' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 810 500' style='enable-background:new 0 0 810 500;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23990000;%7D .st1%7Bfill:%23339966;%7D .st2%7Bfill:%23006699;%7D%3C/style%3E%3Cpath class='st0' d='M0,500h30V0H0V500z M60,500h90V0H60V500z M180,0v500h90V0H180z'/%3E%3Cpath class='st1' d='M720,500h30V0h-30V500z M780,0v500h30V0H780z M300,500h30V0h-30V500z M360,0v500h30V0H360z'/%3E%3Cpath class='st2' d='M420,500h90V0h-90V500z M540,500h30V0h-30V500z M600,0v500h90V0H600z'/%3E%3C/svg%3E%0A")`,
        dracor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 384 384'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-2%7Bclip-path:url(%23clip-path);%7D.cls-3%7Bfill:%231f2447;%7D%3C/style%3E%3CclipPath id='clip-path' transform='translate(0 0)'%3E%3Crect class='cls-1' width='384' height='384'/%3E%3C/clipPath%3E%3C/defs%3E%3Ctitle%3EDraCor-Symbol-Square-Blue%3C/title%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cg id='Vektor-Smartobjekt'%3E%3Cg class='cls-2'%3E%3Cg class='cls-2'%3E%3Cpath class='cls-3' d='M378.47,146A192.23,192.23,0,0,0,192,0H0V384H192A192.23,192.23,0,0,0,378.47,238.05a194.5,194.5,0,0,0,0-92.1M192,347.51H36.49V210.25H71.6a121.84,121.84,0,0,0,233.18,27.8h-41a85.29,85.29,0,1,1-11.51-106.34A86.09,86.09,0,0,1,263.8,146h41A121.81,121.81,0,0,0,71.6,173.76H36.49V36.49H192c69.73,0,128.88,46.12,148.55,109.46q2.13,6.84,3.62,13.91c1,4.56,1.73,9.2,2.27,13.9H240.84a50.2,50.2,0,0,0-2.38-5.43c-.48-.94-1-1.86-1.54-2.77a50.8,50.8,0,0,0-3.89-5.7,49.82,49.82,0,0,0-4.17-4.71,52,52,0,0,0-61.31-9.2c-1.14.6-2.26,1.26-3.35,2a51.23,51.23,0,0,0-9,7.25,52.09,52.09,0,0,0,0,73.71,51.17,51.17,0,0,0,9,7.24l3.34,2a52.07,52.07,0,0,0,61.32-9.19,50,50,0,0,0,4.18-4.72,52.26,52.26,0,0,0,3.47-5c.7-1.14,1.35-2.3,2-3.49a48.31,48.31,0,0,0,2.38-5.43h105.6c-.54,4.7-1.31,9.34-2.27,13.9q-1.49,7.08-3.62,13.91C320.88,301.39,261.73,347.51,192,347.51' transform='translate(0 0)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        wega: `url("data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3E%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='70.000000pt' height='70.000000pt' viewBox='0 0 70.000000 70.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cmetadata%3E%0ACreated by potrace 1.11, written by Peter Selinger 2001-2013%0A%3C/metadata%3E%3Cg transform='translate(0.000000,70.000000) scale(0.100000,-0.100000)'%0Afill='%230064b4' stroke='none'%3E%3Cpath d='M223 664 c-29 -19 -53 -39 -53 -44 0 -5 -11 -26 -25 -46 -14 -21 -23%0A-44 -20 -51 2 -8 -3 -25 -12 -39 -13 -21 -14 -29 -4 -52 7 -15 19 -34 27 -42%0A8 -8 29 -37 46 -63 l31 -48 -19 -40 c-9 -22 -42 -63 -73 -91 l-55 -50 23 -44%0A24 -44 87 0 87 0 -27 115 c-19 82 -23 112 -14 104 20 -17 17 2 -6 31 -11 14%0A-20 35 -20 47 0 12 -7 43 -16 69 -12 36 -13 48 -4 54 7 4 9 13 5 19 -4 7 -1%0A18 5 26 7 8 10 24 7 35 -3 10 2 25 10 31 8 7 12 21 10 31 -4 15 1 18 38 18 52%0A0 90 -15 128 -49 37 -34 36 -61 -3 -61 -38 0 -53 -27 -48 -93 3 -50 2 -52 -22%0A-49 -24 2 -24 2 -5 -12 27 -19 57 -3 50 27 -12 59 -11 72 12 72 28 0 41 14 23%0A25 -13 8 -13 10 1 10 27 0 31 -66 8 -140 -20 -65 -51 -110 -76 -110 -7 0 -13%0A-4 -13 -10 0 -15 23 -12 48 6 26 18 26 29 2 -110 -15 -92 -20 -86 75 -86 l86%0A0 20 47 20 47 -65 58 c-77 69 -98 116 -76 169 8 17 22 39 32 49 11 10 20 25%0A22 33 1 8 8 22 15 31 17 20 5 73 -19 81 -10 3 -21 16 -24 29 -3 12 -13 32 -23%0A44 -10 12 -26 33 -36 47 -10 14 -26 25 -36 25 -9 0 -26 7 -37 15 -29 22 -54%0A18 -111 -21z'/%3E%3Cpath d='M246 475 c-22 -17 -20 -28 2 -16 10 6 28 7 40 4 12 -3 22 -1 22 5 0%0A15 -45 20 -64 7z'/%3E%3Cpath d='M252 437 c-10 -11 -5 -14 24 -15 24 -1 34 3 31 11 -5 17 -42 20 -55%0A4z'/%3E%3Cpath d='M299 289 c-9 -6 1 -9 29 -9 24 0 41 4 38 9 -7 11 -50 11 -67 0z'/%3E%3Cpath d='M315 260 c3 -5 15 -10 26 -10 10 0 19 5 19 10 0 6 -12 10 -26 10 -14%0A0 -23 -4 -19 -10z'/%3E%3C/g%3E%3C/svg%3E")`
      },
    },
  },
}

module.exports = plugin(() => {}, config);
