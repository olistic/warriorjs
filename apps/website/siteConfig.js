const pkg = require('../package');
const sponsors = require('./data/sponsors');

const gitHubUrl = pkg.repository;
const twitterUsername = 'warrior_js';

const siteConfig = {
  gitHubUrl,
  twitterUsername,
  sponsors,
  title: 'WarriorJS Docs',
  tagline: 'An exciting game of programming and Artificial Intelligence',
  url: pkg.homepage,
  baseUrl: '/',
  projectName: 'warriorjs',
  organizationName: 'olistic',
  cname: 'warrior.js.org',
  noIndex: false,
  cleanUrl: true,
  editUrl: `${gitHubUrl}/edit/master/docs/`,
  translationRecruitingLink: 'https://crowdin.com/project/warriorjs',
  headerLinks: [
    { doc: 'player/overview', label: 'Player' },
    { doc: 'maker/introduction', label: 'Maker' },
    { doc: 'community/socialize', label: 'Community' },
    { languages: true },
    { search: true },
    { href: gitHubUrl, label: 'GitHub' },
  ],
  headerIcon: 'img/warriorjs-text.svg',
  footerIcon: 'img/warriorjs-sword.svg',
  favicon: 'img/favicon.png',
  twitterImage: 'img/warriorjs.png',
  ogImage: 'img/warriorjs.png',
  colors: {
    primaryColor: '#2e3440',
    secondaryColor: '#3b4252',
    accentColor: '#8fbcbb',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  disableHeaderTitle: true,
  disableTitleTagline: true,
  onPageNav: 'separate',
  gaTrackingId: 'UA-118632697-1',
  algolia: {
    apiKey: 'af0d3f56837aacc96ccd573d9208966c',
    indexName: 'warriorjs',
  },
};

module.exports = siteConfig;
