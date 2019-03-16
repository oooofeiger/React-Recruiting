const utility = require('utility');

function md5(pwd){
    const salt = 'feier_yulian';
    return utility.md5(utility.md5(pwd + salt));
}

module.exports = {
    md5
}