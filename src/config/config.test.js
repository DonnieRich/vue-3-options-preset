const config = {
    get() {
        return {
            "BASE_DIR": "/src",
            "BASE_STUBS_DIR": "/node_modules/vue-3-options-preset/src/stubs",
            "JSON_FILE": "/package.json",
            "COMPONENT_FOLDER": "/components",
            "EXTENSIONS": [".css", ".vue"],
            "PROTECTED_FILES": ["App.vue"],
            "REMOVABLE_FOLDERS": ["icons"]
        }
    }
};

module.exports = { config };