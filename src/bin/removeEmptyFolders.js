const fs = require("fs/promises");

const removeEmptyFolders = async (folder) => {
    return await new Promise((resolve, reject) => {
        fs.rmdir(folder, { maxRetries: 0 })
            .then(async () => {
                const message = `✅  ${folder} directory removed!`;
                console.log('\x1b[36m%s\x1b[0m', message);
                resolve(message);
            })
            .catch((err) => {
                // If the folder is missing, resolve with a message
                if (err.code === 'ENOENT') {
                    console.log('\x1b[36m%s\x1b[0m', `⚠️  ${folder} does not exist...`);
                    resolve(err.message);
                } else {
                    console.log('\x1b[31m%s\x1b[0m', `❌  ${folder} is not empty...`);
                    reject(new Error(err.message));
                }
            })
    });
};

module.exports = { removeEmptyFolders };