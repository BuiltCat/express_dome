const pages = []

class Page {
    constructor(title, author, page){
        Page.id ++
        this.id = Page.id
        this.title = title
        this.author = author
        this.page = page
        this.date = new Date()
    }
    static setInfo(info){
        const newPage = new Page(info.title, info.author, info.page)
        Page.pages.push(newPage)
        return newPage
    }
    static getPageList(){
        const list = []
        this.pages.forEach((vlaue) => {
            list.push(vlaue.title)
        })
        return list
    }
    static getOneByID(id){
        return Page.pages.find(P => P.id === id)
    }
    static get ['pages'](){
        return pages
    }
}
Page.id = 0

module.exports = Page