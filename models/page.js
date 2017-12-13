const mongoose = require('mongoose');

const uri = `mongodb://localhost:27017/test`;

mongoose.connect(uri,{
    useMongoClient:true
});

const db = mongoose.Connection;

const pageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    page: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const pageModel = mongoose.model('page',pageSchema);

class Page {
    /**
     * 构造函数
     * @param {*文章标题} title 
     * @param {*作者} author 
     * @param {*文章内容} page 
     */
    constructor(title, author, page){
        this.title = title;
        this.author = author;
        this.page = page;
        this.date = new Date();
    }
    /**
     * 添加文章
     * @param {*信息对象：包含title、author、page} info 
     */
    static setInfo(info){
        const newPage = new Page(info.title, info.author, info.page);
        const page = new pageModel(newPage);
        page.save();
        return page;
    }
    /* 获取文章的列表 */
    static async getPageList(){
        const query = pageModel.find({},{page:0,date:0,__v:0,author:0});
        const list = await query.then();
        return list;
    }
    /**
     * 获取文章
     * @param {*文章id} id 
     */
    static async getOneByID(id){
        const query = pageModel.findOne({_id:id});
        const page = await query.then();
        return page;
    }
}

module.exports = Page