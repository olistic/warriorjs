const PropTypes = require('prop-types');
const React = require('react');

const GitHubButton = require(`${process.cwd()}/core/GitHubButton`);
const TwitterButton = require(`${process.cwd()}/core/TwitterButton`);
const getDocUrl = require(`${process.cwd()}/utils/getDocUrl`);

const Footer = ({ config }) => (
  <footer className="footerSection nav-footer" id="footer">
    <section className="sitemap">
      <a href={config.baseUrl} className="nav-home">
        <img src={`${config.baseUrl}${config.footerIcon}`} alt={config.title} />
      </a>
      <div>
        <h5>Docs</h5>
        <a href={getDocUrl('overview.html')}>Play</a>
      </div>
      <div>
        <h5>Community</h5>
        <a
          href="https://spectrum.chat/warriorjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spectrum
        </a>
        <a
          href="https://twitter.com/warrior_js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <TwitterButton username={config.twitterUsername} />
      </div>
      <div>
        <h5>More</h5>
        <a
          href="https://opencollective.com/warriorjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate
        </a>
        <a href={config.gitHubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <GitHubButton
          username={config.organizationName}
          repo={config.projectName}
        />
      </div>
    </section>
  </footer>
);

Footer.propTypes = {
  config: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
    footerIcon: PropTypes.string.isRequired,
    gitHubUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = Footer;
