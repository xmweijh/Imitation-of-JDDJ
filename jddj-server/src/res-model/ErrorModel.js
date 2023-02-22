/**
 * @description Error Model
 * @author xmweijh
 */

class ErrorModel {
    constructor(errno = -1, message = 'error') {
        this.errno = errno,
        this.message = message
    }
}

module.exports = ErrorModel
