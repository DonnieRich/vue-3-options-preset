const { removeFile } = require('./removeFile');

const cleanupScaffolding = async (paths = [], extensions = []) => {
    console.log('\x1b[37m%s\x1b[0m', '♻️  Removing old files...');

    for (const path of paths) {
        for (const extension of extensions) {
            await removeFile(path, extension);
        }
    }
};

module.exports = { cleanupScaffolding };