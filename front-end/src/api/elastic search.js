import axios from "axios"

const ESApi = {
  getMsg: async (id, title, authors, abstract, year, reference, venue, citation_by_year) => {
    let url = 'http://119.3.223.135:9200/cspaper/_search?q='+id
    const res = await axios({
      url: url
    })
    return res
  },
  getPopularPaper: async () =>{
    let url = 'http://119.3.223.135:9200/cspaper/_search?source_content_type=application/json&source=' +
      '{"query":{"match_all": {}}, "sort":[{"n_citation":"desc"}], "size": 15}'
    const res = await axios({
      url: url
    })
    return res
  },
  getPopularAuthor: async () =>{
    let url = 'http://119.3.223.135:9200/csauthor/_search?source_content_type=application/json&source=' +
      '{"query":{"match_all": {}}, "sort":[{"n_citation":"desc"}], "size": 10}'
    const res = await axios({
      url: url
    })
    return res
  },
  getRecentPaper: async () =>{
    let url = 'http://119.3.223.135:9200/cspaper/_search?source_content_type=application/json&source=' +
      '{"query":{"match_all": {}}, "sort":[{"year":"desc"}], "size": 15}'
    const res = await axios({
      url: url
    })
    return res
  },
  getInstitutionMsg: async (id) => {
    let url = 'http://119.3.223.135:9200/csaffiliation/_search?q='+id
    const res = await axios({
      url: url
    })
    return res
  },
  getAuthorInfo: async (id) => {
    let url = 'http://119.3.223.135:9200/csauthor/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"match": {"id":"' + id + '"}}]}}}'
    const res = await axios({
      url: url
    })
    return res
  },
    getInstituteInfo: async (id) => {
    let url = 'http://119.3.223.135:9200/csaffiliation/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"match": {"id":"' + id + '"}}]}}}'
    const res = await axios({
      url: url
    })
    return res
  },

}

export default ESApi
