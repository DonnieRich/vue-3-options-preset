const fs = require("fs/promises");

const copyStubFiles = async (baseStubsDir, baseDir, bootstrap) => {
    console.log('\x1b[37m%s\x1b[0m', '📑  Copying new files...');

    await fs.copyFile(`${baseStubsDir}/HelloWorld.vue`, `${baseDir}/components/HelloWorld.vue`);
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