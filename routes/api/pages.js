const express = require('express');
const router = express.Router();
const pageServicse = require('../../servicse/page_servicse');
const HTTPRequestParamError = require('../../errors/http_request_param_error');
const ResourceNotFound = require('../../errors/resource_not_found_error');

/* 获取所有文章列表. */
router.get('/', (req, res, next) => {
    (async () => {
        // res.locals.List =
        const List = await pageServicse.getList();
        if (List.length !== 0){
            return List;
        } else {
            throw new ResourceNotFound('文章列表', 'null', '当前没有文章啊QAQ!');
        }
    })().then((r) => {
        res.json(r);
    }).catch((e) => {
        next(e);
    })
})
/* 通过id获取文章 */
router.use('/:id', (req, res, next) => {
    (async () => {
        if (req.params.id) {
            const page = await pageServicse.getPage(req.params.id);
            if (page) {
                res.locals.page = page;
            } else {
                throw new ResourceNotFound('id', req.params.id,'id不存在请检查一下');
            }
        } else {
            throw new HTTPRequestParamError('id', '未输入id');
        }
    })().then((r) => {
        res.render('read');
    }).catch((e) => {
        next(e);
    })
})

/* 设置文章
 * title 文章标题
 * author 作者
 * page 文章内容 
 */
router.post('/', (req, res, next) => {
    if(!req.body.title){
        throw new HTTPRequestParamError('title','不存在')
    }else if(!req.body.author){
        throw new HTTPRequestParamError('author', '不存在')
    }else if(!req.body.page){
        throw new HTTPRequestParamError('page', '不存在')
    }else{
        res.json(pageServicse.setPage(req.body));

    }
})

module.exports = router;
