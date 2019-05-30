

export function getRedirectPatch(type, avatar){
    //根据身份返回不同的url
    //boss和genius，如果身份信息不全跳转到各自的身份信息页面/bossinfo,/geniusinfo
    let url = type === 'boss' ? '/accout/boss' : '/accout/genius';
    if(!avatar){
        url += 'info';
    }
    return url;
}

export function getChatId(userId, targetId){
    return [userId, targetId].sort().join('_');
}