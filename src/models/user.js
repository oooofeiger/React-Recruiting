import router from 'umi/router';
import { register, login, getAccess, infoUpdate } from '@/pages/api/user';
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
                    payload: { register:{code, message}}
                })
                if(code === 1){
                    router.push(getRedirectPatch(payload.type))
                }
            } catch (error) {
                console.log(error)
            }
        },
        *handleLogin({ payload }, { call, put}){
            try {
                const res = yield call(login, payload);
                const { data, code } = res;
                if(!data) return;
                // localStorage.setItem('identity', data.type);
                yield put({
                    type: 'save',
                    payload: {login: {data}}
                })
                if(code === 1){
                    router.push(getRedirectPatch(data.type, data.avatar))
                }
            } catch (error) {
                console.log(error)
            }
        },
        *handleGetAccess(_, { call, put}){
            try {
                const res = yield call(getAccess);
                yield put({
                    type: 'save',
                    payload: { 
                        access: res
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        *handleInfoUpdate({ payload }, {call, put}){
            try {
                const res = yield call(infoUpdate, payload);
                const { data, code } = res;
                
                yield put({
                    type: 'save',
                    payload: {
                        infoUpdate: { data }
                    }
                });
                if(code === 1){
                    router.push(getRedirectPatch(data.type, data.avatar))
                }
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