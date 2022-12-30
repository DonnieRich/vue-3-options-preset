const fs = require("fs/promises");

const getJsonDataFromFile = async (fileBasePath) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Reading content of ${fileBasePath}/package.json...`);
    let jsonData = {};

    try {
        await fs.readFile(`${fileBasePath}/package.json`, (err, data) => {

            if (err) {
                throw err;
            }

            jsonData = JSON.parse(data);
        });
        return jsonData;
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot read JSON from file. Error: ${err}`);
    }

}

module.exports = { getJsonDataFromFile };