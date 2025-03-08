const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addBase, addComponents, theme }) => {
  addBase({
    'tei-div': {
      display: 'block',
    },
    'tei-head': {
      display: 'block',
    },
    'tei-p': {
      display: 'block',
      marginTop: theme('spacing.2'),
      marginBottom: theme('spacing.2'),
    },
    'tei-front': {
      display: 'block',
      marginBottom: theme('spacing.6'),
    },
    'tei-front > tei-titlepage > tei-doctitle': {
      display: 'block',
      textAlign: 'center',
      marginBottom: theme('spacing.4'),
    },
    'tei-doctitle > tei-titlepart[type=main]': {
      fontSize: theme('fontSize.2xl'),
      marginTop: theme('spacing.3'),
      marginBottom: theme('spacing.3'),
    },
    'tei-doctitle > tei-titlepart[type=sub]': {
      fontSize: theme('fontSize.xl'),
      marginTop: theme('spacing.3'),
      marginBottom: theme('spacing.3'),
    },
    'tei-div[type=chapter] > tei-head': {
      fontSize: theme('fontSize.xl'),
      fontWeight: 'bold',
      marginTop: theme('spacing.8'),
      marginBottom: theme('spacing.4'),
    },
  });
});
