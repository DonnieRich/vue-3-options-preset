const fs = require("fs/promises");

const { config } = require('../config/config');
const { REMOVABLE_FOLDERS } = config.get();

const removeEmptyFolders = async (folder) => {
    return await new Promise((resolve, reject) => {
        if (REMOVABLE_FOLDERS.includes(folder)) {
            fs.rmdir(folder)
                .then(async () => {
                    const message = `✅  ${folder} directory removed!`;
                    console.log('\x1b[36m%s\x1b[0m', message);
                    resolve(message);
                })
                .catch((err) => {
                    console.log('\x1b[36m%s\x1b[0m', `⚠️  ${err}`);
                    reject(new Error(err.message));
                })

        } else {
            const message = `⚠️  ${folder} directory should not be removed!`;
            console.log('\x1b[36m%s\x1b[0m', message);
            reject(new Error(message))
        }
    });
};

module.exports = { removeEmptyFolders };