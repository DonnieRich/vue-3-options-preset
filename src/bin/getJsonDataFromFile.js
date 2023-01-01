const fs = require("fs/promises");

const getJsonDataFromFile = async (fileBasePath) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Reading content of ${fileBasePath}...`);
    let jsonData = {};

    let streamData = await fs.readFile(`${fileBasePath}`, { encoding: 'utf-8' });
    jsonData = JSON.parse(streamData);

    return jsonData;
}

module.exports = { getJsonDataFromFile };