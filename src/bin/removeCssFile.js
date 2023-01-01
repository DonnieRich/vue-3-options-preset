const fs = require("fs/promises");
const path = require("path");

const removeCssFile = async (baseDir) => {
    console.log('\x1b[37m%s\x1b[0m', '♻️  Removing old files...');

    for (const file of await fs.readdir(baseDir)) {
        if (file === 'style.css') {
            await fs.unlink(path.join(baseDir, file));
            console.log('\x1b[36m%s\x1b[0m', '✅  All files removed!');
        }
    }
}

module.exports = { removeCssFile };