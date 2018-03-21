const page = require("../models/page");

module.exports.setPage = async (title, author, article, tags) => {
  return await page.setInfo(title, author, article, tags);
};
module.exports.getList = async () => {
  return await page.getPageList();
};
module.exports.getPage = async id => {
  return await page.getOneByID(id);
};
