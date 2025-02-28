import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import einakterGithubIcon from '../../einakter-gh';
import NavBar from './NavBar';

const meta = {
  title: 'Navigation/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routing: { path: '/' },
    },
  },
  argTypes: {
    logo: {
      control: { type: 'select' },
      options: ['dracor.svg', 'ecocor.svg', 'einakter.svg'],
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dracor: Story = {
  parameters: {
    reactRouter: {
      location: {
        pathParams: { corpusId: 'shake' },
      },
      routing: { path: '/corpora/:corpusId' },
    },
  },
  args: {
    title: 'Drama Corpora',
    logo: 'dracor.svg',
    gitHubUrl: 'https://github.com/dracor-org',
    version: '1.2.3',
    navItems: [
      { label: 'About', href: '/about' },
      {
        label: 'Corpora',
        items: [
          { href: '/corpora/ger', label: 'German Drama Corpus' },
          { href: '/corpora/shake', label: 'Shakespeare Drama Corpus' },
          { href: '/corpora/u', label: 'Ukranian Drama Corpus' },
        ],
      },
      { label: 'How To', href: '/howto' },
      { label: 'Tools', href: '/tools' },
      { label: 'Merch', href: '/merch' },
    ],
  },
};

export const Einakter: Story = {
  args: {
    title: 'Einakter',
    logo: 'einakter.svg',
    gitHubUrl: 'https://github.com/dracor-org/einakter',
    gitHubIcon: einakterGithubIcon,
    version: '1.2.3',
    navItems: [
      { label: 'Plays', href: '/plays', active: true },
      { label: 'Locations', href: '/locations' },
      { label: 'Originals', href: '/originals' },
      { label: 'About', href: '/about' },
    ],
  },
};

export const Ecocor: Story = {
  parameters: {
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
          { href: '/about', label: 'What is EcoCor' },
          { href: '/credits', label: 'Credits' },
          { href: '/imprint', label: 'Imprint and GDPR' },
        ],
      },
      {
        label: 'Corpora',
        items: [
          { href: '/corpora/en', label: 'English EcoCor' },
          { href: '/corpora/de', label: 'German EcoCor' },
        ],
      },
      { label: 'Merch', href: '/merch' },
    ],
  },
};
