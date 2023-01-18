const fs = require("fs/promises");
const { constants } = require("fs");

const removeEmptyFolders = async (folders, removableFolders) => {
    for (const folder of folders) {
        if (removableFolders.includes(folder)) {
            await fs.access(folder, constants.F_OK)
                .then(async () => {
                    if (await fs.readdir(folder).length === 0) {
                        await fs.rmdir(folder);
                        console.log('\x1b[36m%s\x1b[0m', `✅  ${folder} directory removed!`);
                    } else {
                        console.log('\x1b[36m%s\x1b[0m', `❌  ${folder} is not empty...`)
                    }
                })
                .catch((err) => console.log('\x1b[36m%s\x1b[0m', `⚠️  ${folder} does not exist...`));
        }
    }
};

module.exports = { removeEmptyFolders };