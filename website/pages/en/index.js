const PropTypes = require('prop-types');
const React = require('react');

const GitHubButton = require(`${process.cwd()}/core/GitHubButton`);
const getDocUrl = require(`${process.cwd()}/utils/getDocUrl`);
const getImgUrl = require(`${process.cwd()}/utils/getImgUrl`);
const siteConfig = require(`${process.cwd()}/siteConfig`);
const translation = require('../../server/translation.js'); // eslint-disable-line import/no-unresolved
const {
  Container,
  GridBlock,
  MarkdownBlock,
} = require('../../core/CompLibrary'); // eslint-disable-line import/no-unresolved
const { translate } = require('../../server/translate'); // eslint-disable-line import/no-unresolved

const PromoSection = ({ children }) => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{children}</div>
    </div>
  </div>
);

PromoSection.propTypes = {
  children: PropTypes.node.isRequired,
};

const Button = ({ children, href, primary, target }) => (
  <div className="pluginWrapper buttonWrapper">
    <a
      className={`button ${primary ? 'primary' : ''}`}
      href={href}
      target={target}
    >
      {children}
    </a>
  </div>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  target: PropTypes.string,
};

Button.defaultProps = {
  primary: false,
  target: '_self',
};

const HomeSplash = ({ language }) => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">
        <div className="inner">
          <h2 className="projectTitle">
            <img
              alt="WarriorJS Banner"
              title={siteConfig.title}
              src={getImgUrl('warriorjs.svg')}
            />
            <small>{translation[language]['localized-strings'].tagline}</small>
          </h2>
          <PromoSection>
            <Button href={getDocUrl('overview.html', language)} primary>
              <translate>Get Started</translate>
            </Button>
            <Button href={siteConfig.gitHubUrl}>GitHub</Button>
          </PromoSection>
          <div className="githubButton" style={{ minHeight: '20px' }}>
            <GitHubButton
              username={siteConfig.organizationName}
              repo={siteConfig.projectName}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

HomeSplash.propTypes = {
  language: PropTypes.string.isRequired,
};

const Code = () => (
  <Container padding={['bottom', 'top']}>
    <GridBlock
      contents={[
        {
          content: (
            <translate>
              Write JavaScript to teach your warrior what to do depending on the
              situation. Select abilities to customize how your warrior plays.
            </translate>
          ),
          imageAlign: 'right',
          image: getImgUrl('code-preview.png'),
          imageAlt: 'Code Preview',
          title: <translate>Code</translate>,
        },
      ]}
      layout="twoColumn"
    />
  </Container>
);

const Play = () => (
  <Container padding={['bottom', 'top']} background="light">
    <GridBlock
      contents={[
        {
          content: (
            <translate>
              Launch the game from your terminal and check how your warrior
              does.
            </translate>
          ),
          imageAlign: 'left',
          image: getImgUrl('play-preview.png'),
          imageAlt: 'Play Preview',
          title: <translate>Play</translate>,
        },
      ]}
      layout="twoColumn"
    />
  </Container>
);

const sh = (...args) => `~~~sh\n${String.raw(...args)}\n~~~`;

const QuickStart = () => (
  <div className="quickStart productShowcaseSection paddingTop paddingBottom">
    <h2>
      <translate>Quick Start</translate>
    </h2>
    <ol>
      <li>
        <translate>Install WarriorJS:</translate>
        <MarkdownBlock>{sh`npm install --global @warriorjs/cli`}</MarkdownBlock>
      </li>
      <li>
        <translate>Launch the game:</translate>
        <MarkdownBlock>{sh`warriorjs`}</MarkdownBlock>
      </li>
      <li>
        <translate>Create your warrior and begin your journey!</translate>
      </li>
    </ol>
  </div>
);

const Sponsors = () => {
  if (!siteConfig.sponsors) {
    return null;
  }

  return (
    <div className="productShowcaseSection lightBackground paddingTop paddingBottom">
      <h2>
        <translate>Sponsors</translate>
      </h2>
      <div className="logos">
        {siteConfig.sponsors.map((sponsor, index) => (
          <a href={sponsor.url} title={sponsor.name} key={index}>
            <img
              src={getImgUrl(`sponsors/${sponsor.logo}`)}
              alt={`Sponsored by ${sponsor.name}`}
            />
          </a>
        ))}
      </div>
      <PromoSection>
        <Button href="https://opencollective.com/warriorjs" target="_blank">
          <translate>Become a sponsor</translate>
        </Button>
      </PromoSection>
    </div>
  );
};

const Index = ({ language }) => (
  <div>
    <HomeSplash language={language} />
    <div className="mainContainer">
      <Code />
      <Play />
      <QuickStart />
      <Sponsors />
    </div>
  </div>
);

Index.propTypes = {
  language: PropTypes.string.isRequired,
};

module.exports = Index;
