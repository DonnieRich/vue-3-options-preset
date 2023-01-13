const fs = require("fs/promises");
const path = require("path");

const { config } = require('../config/config.production');
const { PROTECTED_FILES } = config.get();

const removeFile = async (baseDir, extension) => {
    for (const file of await fs.readdir(baseDir)) {
        if (file.includes(extension) && !PROTECTED_FILES.includes(file)) {
            await fs.unlink(path.join(baseDir, file));
            console.log('\x1b[36m%s\x1b[0m', `✅  ${file} removed!`);
        }
    }
};

module.exports = { removeFile };