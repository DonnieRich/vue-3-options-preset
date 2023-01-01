const { getJsonDataFromFile } = require("./getJsonDataFromFile");
const { mergeJsonObjects } = require("./mergeJsonObjects");
const { writeJsonDataToFile } = require("./writeJsonDataToFile");

module.exports = { jsonOperations: { getJsonDataFromFile, mergeJsonObjects, writeJsonDataToFile } };