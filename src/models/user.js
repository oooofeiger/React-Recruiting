import { register } from '@/pages/api/register';
import { Toast } from 'antd-mobile';

export default{
    namespace: 'user',
    state:{},
    effects: {
        *handleRegister({ payload }, {call, put}){
            try {
                const res = yield call(register, payload);
                const { message } = res;
                Toast.fail(message)
                yield put({
                    type: 'register',
                    payload: message
                })
            } catch (error) {
                console.log(error)
            }
            
        }
    },

    reducers: {
        register(state, { payload }){
            return {
                ...state,
                register: payload
            }
        }
    }
}