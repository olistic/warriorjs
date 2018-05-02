const siteConfig = require(`${process.cwd()}/siteConfig.js`);

const docsUrl = `${siteConfig.baseUrl}docs`;

function getDocUrl(doc) {
  return `${docsUrl}/${doc}`;
}

module.exports = getDocUrl;
