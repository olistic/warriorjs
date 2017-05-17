module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  env: {
    jest: true,
    node: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-mixed-operators': 0, // prettier doesn't play well with this rule yet
  },
};
