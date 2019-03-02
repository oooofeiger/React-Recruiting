import request from '../utils/request';

export default{
    namespace: 'test',
    state:{},
    effects: {
        *get(_, {call, put}){
             const res = yield request('/api/data');
            yield put({
                type: 'testData',
                payload: res
            })
        }
    },

    reducers: {
        testData(state, { payload }){
            return {
                ...state,
                testData:payload
            }
        }
    }
}