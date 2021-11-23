import axios from "axios"

const ESApi = {
  getMsg: async (id, title, authors, abstract, year, reference, venue, citation_by_year) => {
    let url = 'http://119.3.223.135:9200/cspaper/_search?q='+id
    const res = await axios({
      url: url
    })
    return res
  }
}

export default ESApi