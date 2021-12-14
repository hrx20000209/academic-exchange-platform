import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    title:'',
    abstract:'',
    references:[],
    citation_by_year:[],
    paper_id:'',
    refer:[]
  },
  mutations: {
    setTitle(state,title) {
      this.state.title = title;
    },
    setAbstract(state,abstract){
      this.state.abstract = abstract
    },
    setReferences(state,references){
      this.state.references.push(references)
    },
    setCitation(state,citation_by_year){
      this.state.citation_by_year.push(citation_by_year)
    },
    setPaperId(state,paper_id){
      this.state.paper_id = paper_id
    },
    setRefer(state,refer){
      this.state.refer.push(refer)
    },
  },
  actions: {
  },
  modules: {
  }
})
