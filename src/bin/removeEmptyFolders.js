const fs = require("fs/promises");

const removeEmptyFolders = async (folders, removableFolders) => {
    for (const folder of folders) {
        if (removableFolders.includes(folder)) {
            if (await fs.readdir(folder).length === 0) {
                await fs.rmdir(folder);
                console.log('\x1b[36m%s\x1b[0m', `✅  ${folder} directory removed!`);
            } else {
                console.log('\x1b[36m%s\x1b[0m', `⚠️  ${folder} is not empty...`)
            }
        }
    }
};

module.exports = { removeEmptyFolders };