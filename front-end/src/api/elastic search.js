import axios from "axios"

const ESApi = {
  getMsg: async (id, title, authors, abstract, year, reference, venue, citation_by_year) => {
    let url = 'http://119.3.223.135:9200/cspaper/_search?q='+id
    const res = await axios({
      url: url
    })
    return res
  },
  getAuthor: async (name) => {
    let url = 'http://119.3.223.135:9200/csauthor/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"match": {"name":"' + name + '"}}]}}}'
    const res = await axios({
      url: url
    })
    return res
  },
  getAuthorInfo: async (id) => {
    let url = 'http://119.3.223.135:9200/csauthor/_search?q='+id
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
  getTitle: async (title)=>{
    let url = 'http://119.3.223.135:9200/cspaper/_search?q=' + title
    const res = await axios({
      url:url
    })
    return res
  },
  getRe: async (references)=>{
    let url = 'http://119.3.223.135:9200/cspaper/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"match":{"id:":"'+references+'"}}]}}}'
    let url1 = 'http://119.3.223.135:9200/csauthor/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"match": {"id": "'+references+'"}}]}}}'
    let url2 = 'http://119.3.223.135:9200/cspaper/_search?source_content_type=application/json&source={%22query%22:{%22bool%22:{%22must%22:[{%22match%22:{%22id%22:%22'+references+'%22}}]}}}'
    const res = await axios({
      url:url2
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
    getAuthorPaper: async (id) =>{
    let url = 'http://119.3.223.135:9200/cspaper/_search?source_content_type=application/json&source={"query": {"nested": {"path": "authors","query": {"bool": {"must": [{ "match": { "authors.id": "'+id+'" }}]}}}}}'
    const res = await axios({
      url: url
    })
    return res
  },
}


export default ESApi

