const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const spiderServicse = require('../../servicse/spider_servicse');
const apiRes = require('../../utils/api_response');
const HTTPRequestParamError = require("../../errors/http_request_param_error");

router.get("/getOneHtml", (req, res, next) => {
    (async () => {
        const html = await spiderServicse.saveOneHtml();
        return html;
    })().then((r) => {
        res.data = r;
        apiRes(req , res);
    }).catch((e) => {
        next(e);
    })
})
router.get("/getOneText", (req, res, next) => {
    (async ()=>{
        const text = await spiderServicse.saveOneText();
        return text;
    })().then((r) => {
        res.data = r;
        apiRes(req, res);
    }).catch((e) => {
        next(e);
    })
})
router.get("/setDefaultId", (req, res, next) => {
    (async () => {
        const state = await spiderServicse.setDefaultId();
        return state;
    })().then((r) => {
        res.data = r;
        apiRes(req, res);
    }).catch((e) => {
        next(e);
    })
})
router.get("/setSartId/:id", (req, res, next) => {
    (async () => {
        if(req.params.id){
            const state = await spiderServicse.setSartId(req.params.id);
            return state;
        }else{
            throw new HTTPRequestParamError('id','未输入id');
        }
    })().then((r) => {
        res.data = r;
        apiRes(req,res);
    }).catch((e) => {
        next(e);
    })
})
router.get("/saveManyHtml", (req, res, next) => {
    (async ()=>{
       const a =  spiderServicse.saveManyHtml();
       return a;
    })().then((r) => {
        res.data = r;
        apiRes(req, res);
    }).catch((e) => {
        next(e);
    })
})

module.exports = router;