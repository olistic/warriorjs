const PropTypes = require('prop-types');
const React = require('react');

const GitHubButton = ({ username, repo }) => (
  <a
    className="github-button"
    href={`https://github.com/${username}/${repo}`}
    data-icon="octicon-star"
    data-show-count
    aria-label="Star this project on GitHub"
  >
    Star
  </a>
);

GitHubButton.propTypes = {
  username: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
};

module.exports = GitHubButton;
