class HTTPBaseError extends Error{
    constructor (httpstatusCode,httpMsg,errCode,msg) {
        super(`HTTP ERROR ${msg}`);
        this.httpstatusCode = httpstatusCode;
        this.httpMsg = httpMsg;
        this.errCode = errCode;
    }
}
module.exports = HTTPBaseError;