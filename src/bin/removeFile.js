const fs = require("fs/promises");
const path = require("path");
const { constants } = require("fs");

const { config } = require('../config/config');
const { PROTECTED_FILES } = config.get();

const removeFile = async (baseDir, extension) => {
    // TODO: use the same style of removeEmptyFolders.js
    return fs.access(baseDir, constants.F_OK)
        .then(async () => {
            for (const file of await fs.readdir(baseDir)) {
                if (file.includes(extension) && !PROTECTED_FILES.includes(file)) {
                    await fs.unlink(path.join(baseDir, file));
                    console.log('\x1b[36m%s\x1b[0m', `✅  ${file} removed!`);
                }
            }
        })
        .catch((err) => {
            if (err.code !== "ENOENT") {
                console.log('\x1b[36m%s\x1b[0m', `⚠️  cannot access ${baseDir}...`)
            }
        });

};

module.exports = { removeFile };