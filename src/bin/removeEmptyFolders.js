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
                console.log('\x1b[36m%s\x1b[0m', `⚠️  ${err.message}`);
                // If the folder is missing, resolve with a message
                if (err.code === 'ENOENT') {
                    resolve(err.message);
                } else {
                    reject(new Error(err.message));
                }
            })
    });
};

module.exports = { removeEmptyFolders };