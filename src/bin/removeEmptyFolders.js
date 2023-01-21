const fs = require("fs/promises");

const removeEmptyFolders = async (folder, removableFolders) => {
    return await new Promise((resolve, reject) => {
        if (removableFolders.includes(folder)) {
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