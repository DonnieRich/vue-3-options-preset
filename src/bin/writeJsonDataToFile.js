const fs = require("fs/promises");

const writeJsonDataToFile = async (fileBasePath, data) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Writing to ${fileBasePath}/package.json...`);
    let jsonData = JSON.stringify(data);

    try {

        await fs.writeFile(`${fileBasePath}/package.json`, jsonData, { encoding: 'utf-8' });

    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot write JSON data to file. Error: ${err}`);
    }

    //return jsonData;
}

module.exports = { writeJsonDataToFile };