const { saveHtml,saveText } = require('../models/spider');

const SPIDER_INTERVAL = process.argv[4] || process.env.NODE_ARGV_4;
const SPIDER_COUNT = process.argv[3] || process.env.NODE_ARGV_3;
const SPIDER_TYPE = process.argv[2] || process.env.NODE_ARGV_2;

let success_count = 0;
let error_count = 0;

switch (SPIDER_TYPE) {
    case 'HTML':
        getHtml();  
        break;

    case 'TEXT':
        getText();
        break;
}

async function getHtml() {
    for (let i = 0; i < process.argv[3]; i++) {
        await saveHtml().catch((e)=>{
            error_count ++;
            console.log("当前失败条数："+error_count);
        }).then((r) => {
            success_count ++;
            console.log("当前成功条数："+success_count);
        });
        await new Promise((rev) => {
            setTimeout(rev, SPIDER_INTERVAL * 1000);
        });
    }
}
async function getText() {
    for (let i = 0; i < process.argv[3]; i++) {
        await saveHtml().catch((e) => {
            error_count++;
            console.log("当前失败条数：" + error_count);
        }).then((r) => {
            success_count++;
            console.log("当前成功条数：" + success_count);
        });
        await new Promise((rev) => {
            setTimeout(rev, SPIDER_INTERVAL * 1000);
        });
    }
}