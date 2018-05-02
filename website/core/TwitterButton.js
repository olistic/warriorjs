const PropTypes = require('prop-types');
const React = require('react');

const TwitterButton = ({ username }) => (
  <a
    href={`https://twitter.com/${username}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      alt="Follow WarriorJS on Twitter"
      src={`https://img.shields.io/twitter/follow/${username}.svg?label=Follow+WarriorJS&style=social`}
    />
  </a>
);

TwitterButton.propTypes = {
  username: PropTypes.string.isRequired,
};

module.exports = TwitterButton;
