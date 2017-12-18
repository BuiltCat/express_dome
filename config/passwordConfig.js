module.exports = {
    salt: 'salt', 
    // iterations参数必须是一个数设置尽可能高。迭代次数越多，派生密钥的安全性越高，但需要更长的时间才能完成。
    iterations: 100000, 
    keylen: 64, 
    digest: 'sha512'
}