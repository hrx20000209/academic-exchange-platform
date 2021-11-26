import axios from "axios"

const ESTitle = {
  getTitle: async (title)=>{
    let url = 'http://119.3.223.135:9200/cspaper/_search?q=' + title
    const res = await axios({
      url:url
    })
    return res
  }
}

export default ESTitle
