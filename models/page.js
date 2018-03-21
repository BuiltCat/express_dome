const mongoose = require("mongoose");
const { pageSchema } = require("../config/Schema");

const uri = `mongodb://127.0.0.1:27017/bilibili`;

mongoose.connect(uri, {
  useMongoClient: true
});

const db = mongoose.Connection;

const pageModel = mongoose.model("page", pageSchema);

class Page {
  /**
   * 构造函数
   * @param {*文章标题} title
   * @param {*作者} author
   * @param {*文章内容} page
   */
  constructor(title, author, article, tags) {
    this.title = title;
    this.author = author;
    this.article = article;
    this.date = new Date().valueOf();
    this.tags = tags;
  }
  /**
   * 添加文章
   * @param {*信息对象：包含title、author、page} info
   */
  static async setInfo(title, author, article, tags) {
    const newPage = new Page(title, author, article, tags);
    const page = new pageModel(newPage);
    await page.save();
    return page;
  }
  /* 获取文章的列表 */
  static async getPageList() {
    const query = pageModel.find({},
      { page: 0, __v: 0, author: 0, article: 0}
      );
    const list = await query.then();
    return list;
  }
  /**
   * 获取文章
   * @param {*文章id} id
   */
  static async getOneByID(id) {
    const query = pageModel.findOne({ _id: id });
    const page = await query.then();
    return page;
  }
}

module.exports = Page;
