const isObjectOrNull = (item) => {
    return item?.constructor === Object || item === null;
};

module.exports = { isObjectOrNull };