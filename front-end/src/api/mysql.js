import axios from "axios"

const api = {
  register: async (name, password, email) => {
    const res = await axios({
      url: 'http://192.168.206.1:8000/register',
      method: 'post',
      params: {
        name: name,
        password: password,
        mailbox: email
      }
    })
    return res
  }
}

export default api
