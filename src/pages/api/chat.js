import request from '../../utils/request';

export async function getChatMsg(){
    return request('/api/user/getMsg')
}