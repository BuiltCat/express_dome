const mongoose = require('mongoose');

const uri = `mongodb://localhost:27017/test`;

mongoose.connect(uri,{
    userMongoClient: true
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
    constructor(title, author, page){
        this.title = title;
        this.author = author;
        this.page = page;
        this.date = new Date();
    }
    static setInfo(info){
        if (info.title && info.author && info.page) {
            const newPage = new Page(info.title, info.author, info.page);
            const page = new pageModel(newPage);
            page.save();
            return page;
        }
    }
    static async getPageList(){
        const query = pageModel.find({},{page:0,date:0,__v:0,author:0});
        const list = await query.then();
        return list;
    }
    static async getOneByID(id){
        const query = pageModel.findOne({_id:id});
        const page = await query.then();
        return page;
    }
}

module.exports = Page