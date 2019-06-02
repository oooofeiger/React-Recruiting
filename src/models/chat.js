import router from 'umi/router';
import { getChatMsg, recvMsg, readMsg, sendMsg } from '@/pages/api/chat';


export default{
    namespace: 'chat',
    state:{
        chatMsg: [],
        users: {},
        unRead: 0
    },
    effects: {
        *handleGetChatMsg({ payload }, {call, put}){
            try {
                const res = yield call(getChatMsg, payload);
                const userid = payload.userid; //当前的用户id
                const { data, users } = res;
                yield put({
                    type: 'save',                                                                       //只有是未读的且是发送给当前用户的消息
                    payload: { chatMsg:data, users: users, getChatMsg: res, unRead: data.filter((item)=>(!item.read&&item.to === userid)).length}
                })
            } catch (error) {
                console.log(error)
            }
        },
        *handleRecvMsg({ payload }, {call, put, select}){
            try {debugger;
                let {chatMsg, unRead} = yield select(state=>state.chat);
                const {userid, to} = payload;//当前的用户id
                yield put({
                    type: 'save',                                   //只有是未读的且是发送给当前用户的消息
                    payload: { chatMsg: [...chatMsg, payload], unRead:userid=== to?unRead+1:unRead}
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