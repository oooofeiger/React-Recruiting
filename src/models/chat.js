import router from 'umi/router';
import { getChatMsg, recvMsg, readMsg, sendMsg } from '@/pages/api/chat';


export default{
    namespace: 'chat',
    state:{
        chatMsg: [],
        unRead: 0
    },
    effects: {
        *handleGetChatMsg({ payload }, {call, put}){
            try {
                const res = yield call(getChatMsg, payload);
                const { data } = res;
                yield put({
                    type: 'save',
                    payload: { chatMsg:data, getChatMsg: res, unRead: data.filter((item)=>(item.read=== false)).length}
                })
            } catch (error) {
                console.log(error)
            }
        },
        *handleRecvMsg({ payload }, {call, put, select}){
            try {
                let {chatMsg, unRead} = yield select(state=>state.chat)
                yield put({
                    type: 'save',
                    payload: { chatMsg: [...chatMsg, payload], unRead:unRead+1}
                })

            } catch (error) {
                console.log(error)
            }
        },
        *handleReacMsg({ payload }, {call, put}){
            try {
                const res = yield call(readMsg, payload);
                const { msg } = res;
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
        },
        clear(){
            return {}
        }
    }
}