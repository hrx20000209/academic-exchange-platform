webpackJsonp([9],{"78TR":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABUCAYAAAAh+XGnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHvSURBVHhe7djRbcIwFIXhbAAbIPWpfQKJATICEyBGYISMACOwASOQDTICEwAjuDpuEqlI5VSpyb0155fuQwwP6JPtqC2CepiASAIiCYgkIJKASAIiCYgkINIgoOVy6W7W63W4XC7tL0xXNkCYZyD9CchLz0TKCgg4qZGyArper8mRsgJCqZGyA0IpkbIEQqmQkgK9vX/E6WLPqep+z6MB0pBeBggzpCyOGEtAJAGRBERyA9StW899P63/JgGRdMRIAiLpiJEERNIRIwmIpCNGEhBJR4wkIJKOGElAJB0xkoBISYG6f8oPnWclIJIbIK8JiCQgkjug2+0W6rruxzpXQNvtNkyn01AURT943u/37TfGzw3QbreLIJPJJEJVVRU2m00Phc8tcgGEY4WdApymadrVr06nU49kkQugDmG1WrUr35vNZvFzfG/sXACxsLMAdL+7xsg9UHc3YRdZ5BoIlzVwrHYPcgmES3uxWPQ7xwoHuQTCKx448/k8YlnmEqgsywhk8da6zzWQh1wCeUpAJJdAuHsOh0P7ZJs7oPP5HO8fzPF4bFftcgeE8HrHnxfAss4lkKcERBIQSUAkAZEERBIQSUAkAZEERDID+m8zJAGRBgG9UgIiCYgkIJKASAIiCYgkIJKASAIiCehhIXwC5PmQOhUj0TcAAAAASUVORK5CYII="},Gn4X:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("ToqD"),r=(s("Us0+"),s("Icdr")),a={name:"Overviews",data:function(){return{id:this.$route.params.paper_id,title:"",authors:[],abstract:"",reference:[],venue:{},url:"",citation_by_year:{},flag:1,relatedArticle:[],references:[]}},mounted:function(){console.log("333"),this.search(this.id),console.log(this.title)},methods:{search:function(t){var e=this;console.log("111"),o.a.getMsg(t).then(function(s){console.log(s.data),e.length=s.data.hits.total.value,console.log(e.length),e.$store.state.abstract="",e.$store.state.references=[],e.reference=[];for(var o=0;o<e.length;o++)if(s.data.hits.hits[o]._source.id===t){var r=s.data.hits.hits[o];e.title=r._source.title,console.log(e.title),e.$store.commit("setTitle",r._source.title),console.log(e.$store.state.title),e.year=r._source.year,void 0===r._source.url?(e.flagLoad=!1,console.log("aaaa")):(e.urlArticle=r._source.url,console.log(e.urlArticle)),void 0===r._source.abstract?(e.flag=0,console.log("flag")):(e.$store.commit("setAbstract",r._source.abstract),console.log(e.$store.state.abstract));for(var a=0;a<r._source.citation_by_year.length;a++)e.$store.commit("setCitation",r._source.citation_by_year[a]);for(var i=0;i<r._source.reference.length;i++)console.log(r._source.reference[i]),e.reference.push(r._source.reference[i]),e.$store.commit("setReferences",r._source.reference[i]),console.log(e.$store.state.references[i]);for(var l=0;l<r._source.authors.length;l++)e.authors.push(r._source.authors[l]);console.log(e.authors),e.searchRelated(),e.searchRe()}})},searchRe:function(){var t=this;this.$store.state.refer=[],console.log("进入");for(var e=0;e<this.reference.length;e++)console.log("1.1"),console.log(this.reference[e]),o.a.getRe(this.reference[e]).then(function(e){console.log("进入es搜索"),console.log(e.data.hits.hits[0]),console.log(e.data.hits.total.value),console.log("1.2");var s=e.data.hits.hits[0];t.references.push(s._source),t.$store.commit("setRefer",s._source),console.log(t.$store.state.refer),console.log(t.$store.state.refer.length)})},searchRelated:function(){var t=this;console.log("related"),o.a.getTitle(this.$store.state.title).then(function(e){console.log(e.data),t.length=e.data.hits.total.value;for(var s=0;s<t.length-1;s++){var o=e.data.hits.hits[s+1];t.relatedArticle[s]=o,console.log(t.relatedArticle[s]),console.log(t.relatedArticle[s]._source.title),console.log(t.relatedArticle[s]._score)}}),setTimeout(function(){t.buildPie()},100)},buildPie:function(){console.log("build"),console.log(this.relatedArticle);var t=r.init(document.getElementById("chart1")),e=r.init(document.getElementById("chart2")),s=[],o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];console.log("re");for(var a=0;a<this.relatedArticle.length-1;a++)console.log(this.relatedArticle[a]._source.title),console.log(this.relatedArticle[a]._score),s.push({value:this.relatedArticle[a]._score,name:this.relatedArticle[a]._source.title});console.log("jixu"),console.log(this.$store.state.citation_by_year.length),console.log(this.$store.state.citation_by_year[0].year);for(var i=0;i<this.$store.state.citation_by_year.length;i++){console.log("sjia");for(var l=1992;l<2016;l++)this.$store.state.citation_by_year[i].year===l+""&&(o[l-1992]=this.$store.state.citation_by_year[i].cnt,console.log(this.$store.state.citation_by_year[i].year+","+this.$store.state.citation_by_year[i].cnt),console.log(o[l-1992]),console.log("right"))}console.log("这里是ydata"),console.log(o);var c=this.randomColor(),n={tooltip:{trigger:"item",formatter:"{a} <br/>{b}  {c} ({d}%)"},legend:{data:[{name:"Citation"}]},xAxis:{data:[1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]},yAxis:[{name:"Citation",axisLine:{lineStyle:{color:c,width:1}}}],series:[{name:"Citation",type:"bar",data:o,itemStyle:{color:c}}]},h={title:{text:"相关文献",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b}  {c} ({d}%)"},series:[{name:"成员被引用量",type:"pie",radius:["30%","70%"],itemStyle:{borderRadius:10,borderColor:"#fff",borderWidth:2},data:this.addColor(s)}]};t.setOption(n),e.setOption(h)},addColor:function(t){for(var e=t,s=0;s<t.length;s++){t[s].itemStyle={color:this.randomColor()}}return e},randomColor:function(){return"rgb("+Math.floor(120*Math.random())+","+Math.floor(120*Math.random())+","+Math.floor(256*Math.random())+")"}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"grey"},[s("div",{staticStyle:{height:"20px"}}),t._v(" "),s("div",{staticStyle:{height:"100%",width:"100%",overflow:"hidden","margin-bottom":"5px"}},[s("div",{staticClass:"bigFrame",staticStyle:{float:"left","margin-bottom":"10px"}},[t._m(0),t._v(" "),s("div",{staticClass:"downFrame"},[s("div",{staticClass:"downFrameContent"},[""===this.$store.state.abstract?s("div",[t._m(1)]):s("div",[t._v("\n            "+t._s(this.$store.state.abstract)+"\n          ")])])])])]),t._v(" "),s("div",{staticStyle:{height:"20px"}}),t._v(" "),t._m(2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"upFrame"},[e("div",{staticClass:"upFrameContent"},[this._v("摘要")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"notAbstract"},[e("div",{staticStyle:{height:"30px"}}),this._v(" "),e("div",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:s("78TR")}})]),this._v(" "),e("div",{staticStyle:{"text-align":"center"}},[this._v("\n                无摘要\n              ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"textFrame"},[s("div",{staticStyle:{height:"20px"}}),t._v(" "),s("div",{staticClass:"stats"},[s("div",{staticClass:"statsFrame"},[s("div",{staticClass:"upFrame"},[s("div",{staticClass:"upFrameContent"},[t._v("Stats overview")])]),t._v(" "),s("div",{staticClass:"downFrame"},[s("div",{staticClass:"statsFrameContent"},[s("div",{attrs:{id:"chart1"}})])])]),t._v(" "),s("div",{staticStyle:{width:"4%",float:"left",height:"10px"}}),t._v(" "),s("div",{staticClass:"statsFrame"},[s("div",{staticClass:"upFrame"},[s("div",{staticClass:"upFrameContent"},[t._v("Stats overview")])]),t._v(" "),s("div",{staticClass:"downFrame"},[s("div",{staticClass:"statsFrameContent"},[s("div",{attrs:{id:"chart2"}})])])])]),t._v(" "),s("div",{staticStyle:{height:"20px"}})])}]};var l=s("VU/8")(a,i,!1,function(t){s("Nr7/")},"data-v-5ee17122",null);e.default=l.exports},"Nr7/":function(t,e){}});
//# sourceMappingURL=9.7b17d78380c366e3e7c7.js.map