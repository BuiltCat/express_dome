const express = require('express');
const router = express.Router();
const userServicse = require('../../servicse/user_servicse');
const apiRes = require('../../utils/api_response');

router.get('/', (req, res, next) => {
    (async() => {
        const userList = await userServicse.getAllUsers();
        return userList;
    })()
    .then((r) => {
            res.data = r;
            apiRes(req, res);
        })
        .catch((e) => {
            next(e);
        })
})

router.post('/', (req, res, next) => {
    (async() => {
        const {
            username,
            name,
            password
        } = req.body;
        const user = userServicse.addNewUser({
            username,
            name,
            password
        });
        return user;
    })()
    .then((r) => {
            res.data = r;
            apiRes(req, res);
        })
        .catch((e) => {
            next(e);
        })
})

router.get('/id/:id', (req, res, next) => {
    (async() => {
        const {
            id
        } = req.params;
        const user = await userServicse.getUserById(id);
        return user;
    })().then((r) => {
        res.data = r;
        apiRes(req, res);
    }).catch((e) => {
        next(e);
    })
})

router.get('/username/:username', (req, res, next) => {
    (async () => {
        const {
            username
        } = req.params;
        const user = await userServicse.getUserByusername(username);
        return user;
    })().then((r) => {
        res.data = r;
        apiRes(req, res);
    }).catch((e) => {
        next(e);
    })
})


router.post('/login', (req, res, next) => {
    (async() => {
        const { username, password } = req.body;
        const user = await userServicse.loginWithNamePassword(username, password);
        return user;
    })().then((r) => {
        res.data = r;
        apiRes(req, res);
    }).catch((e) => {
        next(e);
    })
})

module.exports = router;