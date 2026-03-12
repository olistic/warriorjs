const siteConfig = require(`${process.cwd()}/siteConfig.js`);

const imgUrl = `${siteConfig.baseUrl}img`;

function getImgUrl(img) {
  return `${imgUrl}/${img}`;
}

module.exports = getImgUrl;
