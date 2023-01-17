const { fileOperations } = require('./fileOperations');

const cleanupScaffolding = async (paths = [], extensions = [], removableFolders = []) => {
    console.log('\x1b[37m%s\x1b[0m', '♻️  Removing old files...');

    for (const path of paths) {
        for (const extension of extensions) {
            await fileOperations.removeFile(path, extension);
        }
    }

    await fileOperations.removeEmptyFolders(paths, removableFolders);
};

module.exports = { cleanupScaffolding };