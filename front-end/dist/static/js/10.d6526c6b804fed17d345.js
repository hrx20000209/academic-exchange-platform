webpackJsonp([10],{IGjR:function(t,e){},tIL3:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("ToqD"),s=(i("Us0+"),{name:"References",data:function(){return{index:"",key:"",references:[],references_year:[],reference:[],length:""}},mounted:function(){this.bianli()},methods:{toWebsite:function(t){window.open(t,"_blank")},toOtherPaper:function(t){var e="/article/"+t+"/overviews";this.$route.params.paper_id=t,console.log(this.$route.params.paper_id),this.$router.push(e),this.$router.go(0)},bianli:function(){var t=this;this.reference=[];for(var e=0;e<this.$store.state.references.length;e++)this.reference.push(this.$store.state.references[e]);this.references=[],console.log(this.reference);for(var i=0;i<this.reference.length;i++)console.log("1.1"),console.log(this.reference[i]),n.a.getRe(this.reference[i]).then(function(e){console.log(e.data.hits.hits[0]),console.log(e.data.hits.total.value),console.log("1.2");var i=e.data.hits.hits[0];t.references.push(i._source),console.log(t.references),console.log(t.references.length)})},toAuthor:function(t){this.$router.push({path:"/authorPage",query:{id:t}})}}}),r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"grey"},[i("div",{staticStyle:{height:"20px"}}),t._v(" "),i("div",{staticStyle:{overflow:"hidden","margin-bottom":"5px"}},[i("div",{staticClass:"bigFrame",staticStyle:{float:"left","margin-bottom":"20px"}},[t._m(0),t._v(" "),0===this.references.length?i("div",[t._m(1)]):i("div",t._l(t.references,function(e,n){return i("div",{key:e,staticClass:"downFrame"},[i("div",{staticClass:"downFrameContent"},[i("div",{staticStyle:{"margin-bottom":"10px","font-size":"18px"},on:{click:function(i){return t.toOtherPaper(e.id)}}},[t._v("\n              "+t._s(e.title)+"\n            ")]),t._v(" "),i("div",{staticStyle:{"margin-bottom":"10px","font-size":"15px",color:"dimgrey"}},[i("a",{staticClass:"articleType"},[t._v("Article")]),t._v("\n              "+t._s(e.year)+"\n            ")]),t._v(" "),i("div",{staticStyle:{"margin-bottom":"10px","font-size":"16.5px",overflow:"hidden"}},t._l(t.references[n].authors,function(e){return i("div",{key:e,staticClass:"author",on:{click:function(i){return t.toAuthor(e.id)}}},[t._v(t._s(e.name))])}),0),t._v(" "),i("div",{staticStyle:{color:"dimgrey","font-size":"15px","margin-bottom":"10px"}},[t._v(t._s(e.n_citation)+" Citations")]),t._v(" "),i("div",{staticStyle:{height:"30px"}},[i("div",{staticStyle:{float:"left"}},[void 0===e.url?i("el-button",{attrs:{plain:"",disabled:""}},[t._v("访问全文")]):i("el-button",{attrs:{plain:""},on:{click:function(i){return t.toWebsite(e.url)}}},[t._v("访问全文")])],1),t._v(" "),i("div",{staticStyle:{float:"right","margin-top":"12px","text-align":"right"}},[t._v("\n                Share\n              ")])])])])}),0)])]),t._v(" "),i("div",{staticStyle:{height:"20px"}})])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"upFrame"},[e("div",{staticClass:"upFrameContent"},[this._v("参考文献")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"downFrame"},[e("div",{staticClass:"downFrameContent"},[e("div",{staticClass:"notAbstract"},[e("div",{staticStyle:{height:"30px"}}),this._v(" "),e("div",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:i("tdoA")}})]),this._v(" "),e("div",{staticStyle:{"text-align":"center"}},[this._v("\n                无参考文献\n              ")])])])])}]};var o=i("VU/8")(s,r,!1,function(t){i("IGjR")},"data-v-3cd61d83",null);e.default=o.exports},tdoA:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABTCAYAAAAr3tHWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEVSURBVHhe7dixDYMwGAXhzJIqqZmH/StYwZHRuYlEcGJDbOs+6RVQoZP+hlvQxhAwBAwBQ8AQMAQMAUPAEMgOMU1Tc5vnOSzLwheW6TpEXK0YX4doRe0Y3YeIEWrE6D7Euq5VYnQfIqoRY4gQUWmMYUJEJTGKQ9wfz23J0XMt6Xs+LcbINXSIuFzdnsYRQ8AQMAQuD5He/3vv9t7vMQQ8DRgCngYMAU8DhoCnAUPA04Ah4GnAEPA0YAgUh0g/Z3/dWQyBy0O0yhAwBAwBQ8AQMAQMAUPAEDAEDAFDwBAwBAwBQ8AQMAQMAUPAEDAEDAFDwBAwBAwBQ8AQOD1Eb8tlCGSHGJ0hYAgYAoaAIWAIGAKG2ITwAhd3MMP635RxAAAAAElFTkSuQmCC"}});
//# sourceMappingURL=10.d6526c6b804fed17d345.js.map