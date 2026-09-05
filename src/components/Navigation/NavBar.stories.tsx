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
      { label: 'About', to: '/about' },
      {
        label: 'Corpora',
        items: [
          {
            to: '/corpora/$corpusId',
            params: { corpusId: 'ger' },
            label: 'German Drama Corpus',
          },
          {
            to: '/corpora/$corpusId',
            params: { corpusId: 'shake' },
            label: 'Shakespeare Drama Corpus',
          },
          {
            to: '/corpora/$corpusId',
            params: { corpusId: 'u' },
            label: 'Ukranian Drama Corpus',
          },
        ],
      },
      { label: 'How To', to: '/howto' },
      { label: 'Tools', to: '/tools' },
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
      { label: 'Plays', to: '/plays' },
      { label: 'Locations', to: '/locations' },
      { label: 'Originals', to: '/originals' },
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

export const WithBadge: Story = {
  parameters: {
    router: {
      initialEntries: ['/'],
      routes: ['/', '/about'],
    },
  },
  args: {
    title: 'Drama Corpora',
    logo: 'dracor.svg',
    gitHubUrl: 'https://github.com/dracor-org',
    gitHubTitle: 'DraCor GitHub',
    navItems: [{ label: 'About', to: '/about' }],
    badge: (
      <a
        href="https://example.org/prize"
        title="Example Badge"
        className="md:ml-2 md:-mt-4 md:self-start md:self-stretch flex md:flex-col items-center text-white md:bg-white md:text-primary rounded-b-lg md:px-3 py-1 text-xs font-bold leading-tight no-underline"
      >
        <span>Example</span>
        <span>Badge</span>
      </a>
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
          { to: '/about', label: 'What is EcoCor' },
          { to: '/credits', label: 'Credits' },
          { to: '/imprint', label: 'Imprint and GDPR' },
        ],
      },
      {
        label: 'Corpora',
        items: [
          {
            label: 'English EcoCor',
            to: '/corpora/$corpusId',
            params: { corpusId: 'en' },
          },
          {
            label: 'German EcoCor',
            to: '/corpora/$corpusId',
            params: { corpusId: 'de' },
          },
        ],
      },
      { label: 'Merch', to: '/merch' },
    ],
  },
};
