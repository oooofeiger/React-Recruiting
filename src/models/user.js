import { register, login } from '@/pages/api/register';
import { getRedirectPatch } from '@/utils/tool';

export default{
    namespace: 'user',
    state:{},
    effects: {
        *handleRegister({ payload }, {call, put}){
            try {
                const res = yield call(register, payload);
                const { message, code } = res;
                yield put({
                    type: 'save',
                    payload: { register:{code, message, path: getRedirectPatch(payload.type)}}
                })
            } catch (error) {
                console.log(error)
            }
        },
        *handleLogin({ payload }, { call, put}){
            try {
                const res = yield call(login, payload);
                const { data } = res;
                if(!data) return;
                localStorage.setItem('identity', data.type);
                yield put({
                    type: 'save',
                    payload: {login:{data, path: getRedirectPatch(data.type, data.avatar)}}
                })
            } catch (error) {
                console.log(error)
            }
        }
    },

    reducers: {
        save(state, { payload }){
            return {
                ...state,
                ...payload
            }
        }
    }
}