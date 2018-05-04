const PropTypes = require('prop-types');
const React = require('react');

const GitHubButton = require(`${process.cwd()}/core/GitHubButton`);
const getDocUrl = require(`${process.cwd()}/utils/getDocUrl`);
const getImgUrl = require(`${process.cwd()}/utils/getImgUrl`);
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const { MarkdownBlock } = require('../../core/CompLibrary.js'); // eslint-disable-line import/no-unresolved

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

const HomeSplash = () => (
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
            <small>{siteConfig.tagline}</small>
          </h2>
          <PromoSection>
            <Button href={getDocUrl('overview.html')} primary>
              Get Started
            </Button>
            <Button href={siteConfig.gitHubUrl}>Github</Button>
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

const sh = (...args) => `~~~sh\n${String.raw(...args)}\n~~~`;

const QuickStart = () => (
  <div className="quickStart productShowcaseSection">
    <h2>Quick Start</h2>
    <ol>
      <li>
        Install WarriorJS:
        <MarkdownBlock>{sh`npm install --global @warriorjs/cli`}</MarkdownBlock>
      </li>
      <li>
        Launch the game:
        <MarkdownBlock>{sh`warriorjs`}</MarkdownBlock>
      </li>
      <li>Create your warrior and begin your journey!</li>
    </ol>
  </div>
);

const Sponsors = () => {
  if (!siteConfig.sponsors) {
    return null;
  }

  return (
    <div className="productShowcaseSection lightBackground">
      <h2>Sponsors</h2>
      <ul className="sponsors-list">
        {siteConfig.sponsors.map((sponsor, index) => (
          <li key={index}>
            <a href={sponsor.url} title={sponsor.name}>
              <img
                src={getImgUrl(`sponsors/${sponsor.logo}`)}
                alt={`Sponsored by ${sponsor.name}`}
              />
            </a>
          </li>
        ))}
      </ul>
      <PromoSection>
        <Button href="https://opencollective.com/warriorjs" target="_blank">
          Become a sponsor
        </Button>
      </PromoSection>
    </div>
  );
};

const Index = () => (
  <div>
    <HomeSplash />
    <div className="mainContainer">
      <QuickStart />
      <Sponsors />
    </div>
  </div>
);

module.exports = Index;
