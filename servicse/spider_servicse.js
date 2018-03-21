const spider = require("../models/spider");

module.exports.setDefaultId = async function () {
    return await spider.setSartId();
}

module.exports.setSartId = async function (id) {
    return await spider.setSartId(id);
}

module.exports.saveOneHtml = async function () {
    return await spider.saveHtml();
}

module.exports.saveOneText = async function () {
    return await spider.saveText();
}