const { removeFile } = require('./removeFile');

const cleanupScaffolding = async (paths = [], extensions = []) => {
    console.log('\x1b[37m%s\x1b[0m', '♻️  Removing old files...');

    paths.forEach((path) => {
        extensions.forEach(async (extension) => {
            await removeFile(path, extension);
        });
    });
};

module.exports = { cleanupScaffolding };