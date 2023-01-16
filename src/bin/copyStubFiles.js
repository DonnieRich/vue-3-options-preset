const fs = require("fs/promises");

const { config } = require('../config/config.production');
const { COMPONENT_FOLDER } = config.get();

const copyStubFiles = async (baseStubsDir, baseDir, bootstrap) => {
    console.log('\x1b[37m%s\x1b[0m', '📑  Copying new files...');

    await fs.copyFile(`${baseStubsDir}/HelloWorld.vue`, `${baseDir}${COMPONENT_FOLDER}/HelloWorld.vue`);
    await fs.copyFile(`${baseStubsDir}/main.js`, `${baseDir}/main.js`);

    await fs.mkdir(`${baseDir}/styles`);

    if (bootstrap) {
        await fs.copyFile(`${baseStubsDir}/App-bootstrap.vue`, `${baseDir}/App.vue`);
        await fs.copyFile(`${baseStubsDir}/general-bootstrap.scss`, `${baseDir}/styles/general.scss`);
    } else {
        await fs.copyFile(`${baseStubsDir}/App.vue`, `${baseDir}/App.vue`);
        await fs.copyFile(`${baseStubsDir}/general.scss`, `${baseDir}/styles/general.scss`);
    }

}

module.exports = { copyStubFiles };