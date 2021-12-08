import axios from "axios"

const api = {
  getPic: async (id) =>{
    let url = 'http://139.9.132.83:8000/user/getUserImage?user_id=' + id
    const res = await axios({
      url: url,
      responseType: "blob"
    })
    return res
  },
}

export default api
