import { get, post } from './http'
// export const api1 = p1 => get('https://xxx/v5/weather?city=qingdao&key=1b47b16e4aa545eaa55a66f859ac0089', p1)
// export const api2 = p2 => get('https://xxx/v5/weather?city=taian&key=1b47b16e4aa545eaa55a66f859ac0089', p2)
// export const api3 = p => post('https://xxx/svserver/upload/', p)
export const getUsrInfo = user_id => get('/user/GetUserInfo', user_id)
export const updateInfo = detail => get('/user/ChangeUserInfo', detail)
export const register = params => post('/register', params)
export const userLogin = params => get('/login', params)
export const getMessageList = params => get('/communicate/GetSendList', params)
export const readMessage = params => post('/communicate/ReadLetter', params)
export const sendMessage = params => post('/communicate/SendLetter', params)
export const getFollow = user_id => get('/user/getFollowList',user_id)
export const getRelation = user_id =>get('/relationshipMap',user_id)
export const cancelFollow = user_id =>get('/relationshipMap',user_id)
export const uploadImage = user_id =>post('/user/postImage',user_id)
export const getdata= user_id =>get('/relationshipMap',user_id)
export const changeUserPassword = params => post('/changePassword', params)
