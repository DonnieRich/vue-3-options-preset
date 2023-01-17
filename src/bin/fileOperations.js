const { removeFile } = require("./removeFile");
const { removeEmptyFolders } = require("./removeEmptyFolders");

module.exports = { fileOperations: { removeFile, removeEmptyFolders } };