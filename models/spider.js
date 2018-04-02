const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Redis = require("ioredis");

const redis = new Redis();
const Schema = require('../config/Schema');
const uri = `mongodb://127.0.0.1:27017/bilibili`;

mongoose.connect(uri, {
    userMongoClient: true
});

const db = mongoose.Connection;

const connect = mongoose;
const PageSchema = Schema.pageSchema;
const PageModle = mongoose.model("page", PageSchema);
const TextModle = mongoose.model("Text", PageSchema);

async function setSartId(id) {
    if (!id) {
        return await redis.set('startId', '117318');
    }
    return await redis.set('startId', id);
}
async function getSartId() {
    const id = await redis.incr('startId');
    return id;
}
async function getTextById(id) {
    const bilibili = await axios.get(`https://www.bilibili.com/read/cv${id}`);
    if (!bilibili.data) {
        return;
    }
    const $ = cheerio.load(bilibili.data);
    const title = $("h1").text();
    const tags = $("a.category-link").children().text();
    const article = new Array();
    const articleFather = $("div.article-holder").children();
    for (let i = 0; i < articleFather.length; i++) {
        getArticle(articleFather[i], article);
    }

    function getArticle(element, arr) {
        const node = $(element);
        if (node[0].name === "img") {
            arr.push("img".concat(node[0].attribs["data-src"]));
        }
        if (node.children().length === 0) {
            if (node.text()) {
                arr.push(node.text());
            }
        } else {
            const nodeFather = node.children();
            for (let i = 0; i < nodeFather.length; i++) {
                getArticle(nodeFather[i], arr);
            }
        }
    }
    return {
        bilibiliID: id,
        title,
        tags,
        article
    };
}
async function getHtmlById(id) {
    const bilibili = await axios.get(`https://www.bilibili.com/read/cv${id}`);
    if (!bilibili.data) {
        return;
    }
    const $ = cheerio.load(bilibili.data);
    const title = $("h1").text();
    const tags = $("a.category-link").children().text();
    const article = $("div.article-holder").html();
    return {
        bilibiliID: id,
        title,
        tags,
        article
    };
}
async function saveText() {
    const id = await getSartId();
    const article = await getTextById(id);
    const newArticle = new TextModle(article);
    await newArticle.save();
    return article;
}
async function saveHtml() {
    const id = await getSartId();
    const article = await getHtmlById(id);
    const newArticle = new PageModle(article);
    await newArticle.save();
    return article;
}

module.exports = {
    setSartId,
    getSartId,
    getTextById,
    getHtmlById,
    saveText,
    saveHtml
};