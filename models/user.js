const mongoose = require('mongoose');
const HTTPRequestParamError = require('../errors/http_request_param_error');
const UserNotExistError = require('../errors/user_not_exist_error');
const pbkdf2Async = require('util').promisify(require('crypto').pbkdf2);
const passwordConfig = require('../config/passwordConfig');
const {
    userSchema
} = require('../config/Schema');

const uri = `mongodb://localhost:27017/bilibili`;

mongoose.connect(uri, {
    useMongoClient: true
})

const db = mongoose.Collection;

const userModel = mongoose.model('user', userSchema);
async function getUserList() {
    const userList = await userModel.find({}, {
        password: 0
    });
    return userList;
}
/**
 * 根据用户的id进行查询
 * @param {*用户id} id 
 */
async function getOneUserById(id) {
    try {
        const user = await userModel.findOne({
            _id: id
        }, {
            password: 0
        });
        return user;
    } catch (error) {
        throw new UserNotExistError(id, null);
    }
}
/**
 * 根据用户名进行查询
 * @param {*用户名} username 
 */
async function getOneuserByUsername(username) {
    try {
        const user = await userModel.findOne({
            username
        }, {
            password: 0
        })
        return user;
    } catch (error) {
        throw new UserNotExistError(null, username);
    }
}
/**
 * 插入用户
 * @param {*用户对象} user 
 */
async function insertUser(user) {
    const newUser = new userModel(user);
    await newUser.save();
    return newUser;
}
/**
 * 新建用户
 * @param {*用户对象} user 
 */
async function creatUser(user) {
    const haveUser = await userModel.findOne({
        username: user.username
    }, {
        _id: 1
    });
    if (haveUser) {
        throw new HTTPRequestParamError('username', '用户名已存在，换个更炫的吧~');
    }
    const savePassword = await pbkdf2Async(
        user.password,
        passwordConfig.salt,
        passwordConfig.iterations,
        passwordConfig.keylen,
        passwordConfig.digest
    )
    const newUser = await insertUser({
        username: user.username,
        name: user.name,
        password: savePassword
    })
    return {
        _id: newUser._id,
        name: newUser.username,
        username: newUser.username,
    };
}
/**
 * 通过用户名和密码获得用户
 * @param {*用户名} username 
 * @param {*密码} password 
 */
async function getUserByNamepassWord(username, password) {
    const passwordToFind = await pbkdf2Async(
        password,
        passwordConfig.salt,
        passwordConfig.iterations,
        passwordConfig.keylen,
        passwordConfig.digest
    );
    const isRightUser = await userModel.findOne({
        username,
        password: passwordToFind
    }, {
        password: 0
    })
    return isRightUser;
}
module.exports = {
    getUserList,
    getOneUserById,
    getOneuserByUsername,
    insertUser,
    getUserByNamepassWord,
    creatUser
}