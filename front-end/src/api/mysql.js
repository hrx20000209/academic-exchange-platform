import axios from "axios"

const api = {
  getRealPic: async (id) =>{
    let url = 'http://139.9.132.83:8000/user/getImage?user_id=' + id
    const res = await axios({
      url: url,
      responseType: 'arraybuffer',
    })
    return res
  },
  getUsrId: async (id) =>{
    let url = 'http://139.9.132.83:8000/user/get_user_id?author_id=' + id
    const res = await axios({
      url: url,
    })
    return res
  },
}

export default api
