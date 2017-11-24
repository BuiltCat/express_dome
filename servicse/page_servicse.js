const page = require('../models/page')

module.exports.setPage = (info) => {
     return page.setInfo(info)
}
module.exports.getList = () => {
    return page.getPageList()
}
module.exports.getPage = (id) => {
    id = parseInt(id)
    return page.getOneByID(id)
}