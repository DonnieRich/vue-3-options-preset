const fs = require("fs/promises");

const writeJsonDataToFile = async (fileBasePath, data) => {
    console.log('\x1b[37m%s\x1b[0m', `📑  Writing to ${fileBasePath}/package.json...`);
    let jsonData = JSON.stringify(data);

    if (jsonData === '{}') {
        throw new Error("Empty object provided!");
    }

    await fs.writeFile(`${fileBasePath}/package.json`, jsonData, { encoding: 'utf-8' });

}

module.exports = { writeJsonDataToFile };