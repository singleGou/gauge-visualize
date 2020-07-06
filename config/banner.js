const packageJson = require('../package.json');
const version = packageJson.version;

const CopyRight = `/**
* HT simple-2d-editor 
* index.js - ${version}
* Compiled ${new Date().toLocaleString()}
*/
`;

module.exports = CopyRight;