const fs = require("fs/promises");

const copyStubFiles = async (baseStubsDir, baseDir, bootstrap) => {
    console.log('\x1b[37m%s\x1b[0m', '📑  Copying new files...');

    try {
        await fs.copyFile(`${baseStubsDir}/App.vue`, `${baseDir}/App.vue`);
        await fs.copyFile(`${baseStubsDir}/HelloWorld.vue`, `${baseDir}/components/HelloWorld.vue`);
        await fs.copyFile(`${baseStubsDir}/main.js`, `${baseDir}/main.js`);

        await fs.mkdir(`${baseDir}/styles`);

        if (bootstrap) {
            await fs.copyFile(`${baseStubsDir}/general-bootstrap.scss`, `${baseDir}/styles/general.scss`);
        } else {
            await fs.copyFile(`${baseStubsDir}/general.scss`, `${baseDir}/styles/general.scss`);
        }

        console.log('\x1b[36m%s\x1b[0m', '✅  Copy completed!');

    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `❌  Error! Cannot complete copy of new files. Error: ${err}`);
    }
}

module.exports = { copyStubFiles };