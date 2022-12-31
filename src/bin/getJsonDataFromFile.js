const fs = require("fs/promises");

const getJsonDataFromFile = async (fileBasePath) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Reading content of ${fileBasePath}...`);
    let jsonData = {};

    try {

        let streamData = await fs.readFile(`${fileBasePath}`, { encoding: 'utf-8' });
        jsonData = JSON.parse(streamData);

    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot read JSON from file. Error: ${err}`);
    }

    return jsonData;
}

module.exports = { getJsonDataFromFile };