webpackJsonp([7],{"3YGZ":function(t,e){},"78TR":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABUCAYAAAAh+XGnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHvSURBVHhe7djRbcIwFIXhbAAbIPWpfQKJATICEyBGYISMACOwASOQDTICEwAjuDpuEqlI5VSpyb0155fuQwwP6JPtqC2CepiASAIiCYgkIJKASAIiCYgkINIgoOVy6W7W63W4XC7tL0xXNkCYZyD9CchLz0TKCgg4qZGyArper8mRsgJCqZGyA0IpkbIEQqmQkgK9vX/E6WLPqep+z6MB0pBeBggzpCyOGEtAJAGRBERyA9StW899P63/JgGRdMRIAiLpiJEERNIRIwmIpCNGEhBJR4wkIJKOGElAJB0xkoBISYG6f8oPnWclIJIbIK8JiCQgkjug2+0W6rruxzpXQNvtNkyn01AURT943u/37TfGzw3QbreLIJPJJEJVVRU2m00Phc8tcgGEY4WdApymadrVr06nU49kkQugDmG1WrUr35vNZvFzfG/sXACxsLMAdL+7xsg9UHc3YRdZ5BoIlzVwrHYPcgmES3uxWPQ7xwoHuQTCKx448/k8YlnmEqgsywhk8da6zzWQh1wCeUpAJJdAuHsOh0P7ZJs7oPP5HO8fzPF4bFftcgeE8HrHnxfAss4lkKcERBIQSUAkAZEERBIQSUAkAZEERDID+m8zJAGRBgG9UgIiCYgkIJKASAIiCYgkIJKASAIiCehhIXwC5PmQOhUj0TcAAAAASUVORK5CYII="},Gn4X:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("ToqD"),i=(a("Us0+"),a("Icdr")),s={name:"Overviews",data:function(){return{id:this.$route.params.paper_id,title:"",authors:[],abstract:"",reference:[],venue:{},url:"",citation_by_year:[],flag:1,relatedArticle:[],references:[],year:"",Ydata:[],oneData:{children:[{children:[{children:[{children:[],name:"低压车间表计82"}],name:"低压关口表计1"}],name:"高压子表计122"},{children:[{children:[],name:"低压关口表计101"}],name:"高压子表计141"}],name:"高压总表计102"}}},mounted:function(){console.log("333"),this.search(this.id),console.log(this.title),this.buildPie2()},methods:{search:function(t){var e=this;console.log("111"),o.a.getMsg(t).then(function(t){console.log(t.data),e.length=t.data.hits.total.value,console.log(e.length),e.$store.state.abstract="",e.$store.state.references=[],e.reference=[],e.citation_by_year=[];for(var a=0;a<e.length;a++){var o=t.data.hits.hits[0];e.title=o._source.title,console.log(e.title),e.$store.commit("setTitle",o._source.title),console.log(e.$store.state.title),e.year=o._source.year,void 0===o._source.url?(e.flagLoad=!1,console.log("aaaa")):(e.urlArticle=o._source.url,console.log(e.urlArticle)),void 0===o._source.abstract?(e.flag=0,console.log("flag")):(e.$store.commit("setAbstract",o._source.abstract),console.log(e.$store.state.abstract));for(var i=0;i<o._source.citation_by_year.length;i++)e.citation_by_year.push(o._source.citation_by_year[i]);console.log("333333333333333333333333333333333333333333333333333333333"),console.log(e.citation_by_year),console.log(e.$store.state.citation_by_year);for(var s=0;s<o._source.reference.length;s++)console.log(o._source.reference[s]),e.reference.push(o._source.reference[s]),e.$store.commit("setReferences",o._source.reference[s]),console.log(e.$store.state.references[s]);for(var r=0;r<o._source.authors.length;r++)e.authors.push(o._source.authors[r]);console.log(e.authors),e.searchRelated(),e.searchRe(),e.citation()}})},searchRe:function(){var t=this;this.$store.state.refer=[],console.log("进入");for(var e=0;e<this.reference.length;e++)console.log("1.1"),console.log(this.reference[e]),o.a.getRe(this.reference[e]).then(function(e){console.log("进入es搜索"),console.log(e.data.hits.hits[0]),console.log(e.data.hits.total.value),console.log("1.2");var a=e.data.hits.hits[0];t.references.push(a._source),t.$store.commit("setRefer",a._source),da.push({children:[]},{name:t.title}),console.log(t.$store.state.refer),console.log(t.$store.state.refer.length)})},searchRelated:function(){var t=this;console.log("related"),o.a.getTitle(this.$store.state.title).then(function(e){console.log(e.data),t.length=e.data.hits.total.value;for(var a=0;a<t.length-1;a++){var o=e.data.hits.hits[a+1];t.relatedArticle[a]=o,console.log(t.relatedArticle[a]),console.log(t.relatedArticle[a]._source.title),console.log(t.relatedArticle[a]._score)}}),setTimeout(function(){t.buildPie()},200)},buildPie2:function(){var t=i.init(document.getElementById("chart4")),e={tooltip:{trigger:"item",triggerOn:"mousemove"},series:[{type:"tree",data:[this.oneData],top:"1%",left:"7%",bottom:"1%",right:"20%",symbolSize:7,label:{normal:{position:"left",verticalAlign:"middle",align:"right",fontSize:9}},leaves:{label:{normal:{position:"right",verticalAlign:"middle",align:"left"}}},expandAndCollapse:!0,animationDuration:550,animationDurationUpdate:750}]};t.setOption(e)},citation:function(){if(console.log("111111111"),0===this.citation_by_year.length)this.Ydata=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],console.log("等于0");else{this.Ydata=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(var t=0;t<this.citation_by_year.length;t++){console.log("sjia");for(var e=1992;e<2016;e++)this.citation_by_year[t].year===e+""&&(this.Ydata[e-1992]=this.citation_by_year[t].cnt,console.log(this.citation_by_year[t].year+","+this.citation_by_year[t].cnt),console.log(this.Ydata[e-1992]),console.log("right"))}}},buildPie:function(){console.log("build"),console.log(this.relatedArticle);var t=i.init(document.getElementById("chart1")),e=i.init(document.getElementById("chart2")),a=[];console.log("re"),console.log(this.citation_by_year.length);for(var o=0;o<this.relatedArticle.length-1;o++)console.log(this.relatedArticle[o]._source.title),console.log(this.relatedArticle[o]._score),a.push({value:this.relatedArticle[o]._score,name:this.relatedArticle[o]._source.title});console.log("这里是ydata"),console.log(this.Ydata);var s=this.randomColor(),r={tooltip:{trigger:"item",formatter:"{a} <br/>{b}  {c} ({d}%)"},legend:{data:[{name:"Citation"}]},xAxis:{data:[1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]},yAxis:[{name:"Citation",axisLine:{lineStyle:{color:s,width:1}}}],series:[{name:"Citation",type:"bar",data:this.Ydata,itemStyle:{color:s}}]},l={title:{text:"相关文献",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b}  {c} ({d}%)"},series:[{name:"成员被引用量",type:"pie",radius:["30%","70%"],itemStyle:{borderRadius:10,borderColor:"#fff",borderWidth:2},data:this.addColor(a)}]};t.setOption(r),e.setOption(l)},addColor:function(t){for(var e=t,a=0;a<t.length;a++){t[a].itemStyle={color:this.randomColor()}}return e},randomColor:function(){return"rgb("+Math.floor(120*Math.random())+","+Math.floor(120*Math.random())+","+Math.floor(256*Math.random())+")"}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"grey"},[a("div",{staticStyle:{height:"20px"}}),t._v(" "),a("div",{staticStyle:{height:"100%",width:"100%",overflow:"hidden","margin-bottom":"5px"}},[a("div",{staticClass:"bigFrame",staticStyle:{float:"left","margin-bottom":"10px"}},[t._m(0),t._v(" "),a("div",{staticClass:"downFrame"},[a("div",{staticClass:"downFrameContent"},[""===this.$store.state.abstract?a("div",[t._m(1)]):a("div",[t._v("\n            "+t._s(this.$store.state.abstract)+"\n          ")])])])])]),t._v(" "),a("div",{staticStyle:{height:"20px"}}),t._v(" "),t._m(2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"upFrame"},[e("div",{staticClass:"upFrameContent"},[this._v("摘要")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"notAbstract"},[e("div",{staticStyle:{height:"30px"}}),this._v(" "),e("div",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:a("78TR")}})]),this._v(" "),e("div",{staticStyle:{"text-align":"center"}},[this._v("\n                无摘要\n              ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"textFrame"},[a("div",{staticStyle:{height:"20px"}}),t._v(" "),a("div",{staticClass:"stats"},[a("div",{staticClass:"statsFrame"},[a("div",{staticClass:"upFrame"},[a("div",{staticClass:"upFrameContent"},[t._v("引 用 量")])]),t._v(" "),a("div",{staticClass:"downFrame"},[a("div",{staticClass:"statsFrameContent"},[a("div",{attrs:{id:"chart1"}})])])]),t._v(" "),a("div",{staticStyle:{width:"4%",float:"left",height:"10px"}}),t._v(" "),a("div",{staticClass:"statsFrame"},[a("div",{staticClass:"upFrame"},[a("div",{staticClass:"upFrameContent"},[t._v("相 关 文 献")])]),t._v(" "),a("div",{staticClass:"downFrame"},[a("div",{staticClass:"statsFrameContent"},[a("div",{attrs:{id:"chart2"}})])])])]),t._v(" "),a("div",{staticClass:"tree",staticStyle:{height:"600px",width:"70%"}},[a("div",{staticClass:"upFrame"},[a("div",{staticClass:"upFrameContent"},[t._v("引用文献")])]),t._v(" "),a("div",{staticClass:"downFrame"},[a("div",{staticClass:"statsFrameContent"},[a("div",{staticStyle:{height:"500px"},attrs:{id:"chart4"}})])])]),t._v(" "),a("div",{staticStyle:{height:"20px"}})])}]};var l=a("VU/8")(s,r,!1,function(t){a("3YGZ")},"data-v-efd10288",null);e.default=l.exports}});
//# sourceMappingURL=7.6f9fc16c3b5f5bd197a1.js.map