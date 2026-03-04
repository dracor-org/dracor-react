import type { Meta, StoryObj } from '@storybook/react-vite';
import einakterGithubIcon from '../../einakter-gh';
import LanguageMenu from '../LanguageMenu/LanguageMenu';
import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'Navigation/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: { type: 'select' },
      options: ['dracor.svg', 'ecocor.svg', 'einakter.svg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dracor: Story = {
  parameters: {
    router: {
      initialEntries: ['/'],
      routes: ['/', '/corpora/$corpusId', '/about', '/howto'],
      routeParams: { corpusId: 'shake' },
    },
  },
  args: {
    title: 'Drama Corpora',
    logo: 'dracor.svg',
    gitHubUrl: 'https://github.com/dracor-org',
    gitHubTitle: 'DraCor GitHub',
    version: '1.2.3',
    navItems: [
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'About', to: '/about' },
      {
        label: 'Corpora',
        items: [
          {
            // @ts-expect-error - FIXME: `to` is not fully typed
            to: '/corpora/$corpusId',
            params: { corpusId: 'ger' },
            label: 'German Drama Corpus',
          },
          {
            // @ts-expect-error - FIXME: `to` is not fully typed
            to: '/corpora/$corpusId',
            params: { corpusId: 'shake' },
            label: 'Shakespeare Drama Corpus',
          },
          {
            // @ts-expect-error - FIXME: `to` is not fully typed
            to: '/corpora/$corpusId',
            params: { corpusId: 'u' },
            label: 'Ukranian Drama Corpus',
          },
        ],
      },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'How To', to: '/howto' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Tools', to: '/tools' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Merch', to: '/merch' },
    ],
  },
};

export const Einakter: Story = {
  parameters: {
    router: {
      initialEntries: ['/plays'],
      routes: ['/', '/about', '/locations', '/originals', '/plays'],
    },
  },
  args: {
    title: 'Einakter',
    logo: 'einakter.svg',
    gitHubUrl: 'https://github.com/dracor-org/einakter',
    gitHubIcon: einakterGithubIcon,
    version: '1.2.3',
    navItems: [
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Plays', to: '/plays' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Locations', to: '/locations' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Originals', to: '/originals' },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'About', to: '/about' },
    ],
    addItem: (
      <LanguageMenu
        languages={['en', 'de', 'fr']}
        onSelect={(l) => console.log(l)}
        current="en"
      />
    ),
  },
};

export const Ecocor: Story = {
  parameters: {
    router: {
      initialEntries: ['/corpora/$corpusId'],
      routes: ['/', '/about', '/credits', '/imprint', '/corpora/$corpusId'],
      routeParams: { corpusId: 'en' },
    },
    reactRouter: {
      location: {
        pathParams: { corpusId: 'en' },
      },
      routing: { path: '/corpora/:corpusId' },
    },
  },
  args: {
    title: 'EcoCor',
    logo: 'ecocor.svg',
    // custom class defined in tailwind.config.js
    logoClass: 'animate-spin-slow infinite',
    gitHubUrl: 'https://github.com/EcoCor',
    version: '1.2.3',
    navItems: [
      {
        label: 'About',
        items: [
          // @ts-expect-error - FIXME: `to` is not fully typed
          { to: '/about', label: 'What is EcoCor' },
          // @ts-expect-error - FIXME: `to` is not fully typed
          { to: '/credits', label: 'Credits' },
          // @ts-expect-error - FIXME: `to` is not fully typed
          { to: '/imprint', label: 'Imprint and GDPR' },
        ],
      },
      {
        label: 'Corpora',
        items: [
          {
            label: 'English EcoCor',
            // @ts-expect-error - FIXME: `to` is not fully typed
            to: '/corpora/$corpusId',
            params: { corpusId: 'en' },
          },
          {
            label: 'German EcoCor',
            // @ts-expect-error - FIXME: `to` is not fully typed
            to: '/corpora/$corpusId',
            params: { corpusId: 'de' },
          },
        ],
      },
      // @ts-expect-error - FIXME: `to` is not fully typed
      { label: 'Merch', to: '/merch' },
    ],
  },
};
