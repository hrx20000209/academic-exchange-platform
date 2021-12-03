import { get, post } from './http'
// export const api1 = p1 => get('https://xxx/v5/weather?city=qingdao&key=1b47b16e4aa545eaa55a66f859ac0089', p1)
// export const api2 = p2 => get('https://xxx/v5/weather?city=taian&key=1b47b16e4aa545eaa55a66f859ac0089', p2)
// export const api3 = p => post('https://xxx/svserver/upload/', p)
export const getUsrInfo = user_id => get('/user/GetUserInfo',user_id)
export const getFollow = user_id => get('/user/getFollowList',user_id)
export const updateInfo = params =>post('/user/ChangeUserInfo',params)
export const getRelation= user_id =>get('/relationshipMap',user_id)
export const cancelFollow= user_id =>get('/relationshipMap',user_id)


