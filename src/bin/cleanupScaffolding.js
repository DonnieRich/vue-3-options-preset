const { fileOperations } = require('./fileOperations');

const cleanupScaffolding = async (paths = [], extensions = [], removable_folders = []) => {
    console.log('\x1b[37m%s\x1b[0m', '♻️  Removing old files...');

    for (const path of paths) {
        for (const extension of extensions) {
            await fileOperations.removeFile(path, extension);
        }
    }
    for (const folder of removable_folders) {
        await fileOperations.removeEmptyFolders(folder);
    }
};

module.exports = { cleanupScaffolding };