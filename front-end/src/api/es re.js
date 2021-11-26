import axios from "axios"

const ESRe = {
  getRe: async (references)=>{
    let url = 'http://119.3.223.135:9200/cspaper/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"match":{"id:":"'+references+'"}}]}}}'
    let url1 = 'http://119.3.223.135:9200/csauthor/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"match": {"id": "'+references+'"}}]}}}'
    let url2 = 'http://119.3.223.135:9200/cspaper/_search?source_content_type=application/json&source={%22query%22:{%22bool%22:{%22must%22:[{%22match%22:{%22id%22:%22'+references+'%22}}]}}}'
    const res = await axios({
      url:url2
    })
    return res
  }
}

export default ESRe
