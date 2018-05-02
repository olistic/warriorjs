const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');

function loadYaml(filePath) {
  return yaml.safeLoad(
    fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8'),
  );
}

module.exports = loadYaml;
