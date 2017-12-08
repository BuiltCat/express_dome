const page = require('../models/page')

module.exports.setPage = (info) => {
     return page.setInfo(info)
}
module.exports.getList = async () => {
    return  await page.getPageList()
}
module.exports.getPage = async (id) => {
    return await page.getOneByID(id)
}