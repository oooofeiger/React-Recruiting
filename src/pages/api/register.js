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