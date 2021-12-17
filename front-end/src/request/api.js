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
export const getRelation = user_id => get('/relationshipMap',user_id)
export const cancelFollow = user_id => get('/user/CancelFollow',user_id)
export const uploadImage = user_id => post('/user/postImage',user_id)
export const uploadNewFavo = param => post('/user/AddFavorite',param)
export const getdata = user_id => get('/relationshipMap',user_id)
export const getPieData = user_id => get('/cooperateAuthor',user_id)
export const changeUserPassword = params => post('/changePassword',params)
export const getFavo = user_id => get('/user/get_all_favo',user_id)
export const adminLogin = params => post('/AdminLogin', params)
export const identify = params => post('/Identify', params)
export const deleFavo = user_id => post('/user/DeleteFavorite',user_id)
export const delePaperInFavo = user_id => post('/user/DeletePaper',user_id)
export const moveFavo = user_id => post('/user/move_paper',user_id)
export const followAuthor = user_id => post('/user/FollowAuthor',user_id)
export const checkIfFollow = user_id => get('/user/CheckFollow',user_id)
export const undoFollow = user_id => get('/user/CancelFollow',user_id)
export const checkAuthor = author_id => get('/authorGetUser', author_id)
export const getScolarUserInfo = params => get('/authorGetUser',params)
export const uploadAppealImage = params => post('/user/submitAppeal',params)
export const emailIdentify = to_email => get('/portal/email_yzm', to_email)
export const emailConfirm = params => get('/portal/confirm', params)
export const getAppealList = params => get('/user/getAppealList', params)
