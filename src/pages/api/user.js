import request from '../../utils/request';

export async function register(params){
    return request('/api/user/register', {
        method: 'POST',
        body: params
    })
}

export async function login(params){
    return request('/api/user/login',{
        method: 'POST',
        body: params
    })
}

export async function getAccess(){
    return request('/api/user/info',{
        method: 'get'
    })
}

export async function infoUpdate(params){
    return request('/api/user/infoUpdate',{
        method: 'POST',
        body: params
    })
}

export async function getUserList(params){
    return request('/api/user/list?type=' + params)
}