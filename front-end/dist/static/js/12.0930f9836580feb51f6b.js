webpackJsonp([12],{FCZ3:function(t,e){},rzsW:function(t,e,i){"use strict";var a,r,n=i("Xxa5"),o=i.n(n),s=i("exGp"),l=i.n(s),c=i("mtWM"),u=i.n(c),h=this,p={getRealPic:(r=l()(o.a.mark(function t(e){var i,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i="http://139.9.132.83:8000/user/getImage?author_id="+e,t.next=3,u()({url:i,responseType:"arraybuffer"});case 3:return a=t.sent,t.abrupt("return",a);case 5:case"end":return t.stop()}},t,h)})),function(t){return r.apply(this,arguments)}),getUsrId:(a=l()(o.a.mark(function t(e){var i,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i="http://139.9.132.83:8000/user/get_user_id?author_id="+e,t.next=3,u()({url:i});case 3:return a=t.sent,t.abrupt("return",a);case 5:case"end":return t.stop()}},t,h)})),function(t){return a.apply(this,arguments)})};e.a=p},yE7a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("rzsW"),r=i("1IRg"),n=i("ToqD"),o=i("Icdr"),s={name:"Institution",components:{Nav_with_searchBox:r.a},data:function(){return{redraw:1,maxSize:50,maxNameLen:10,pic:{},row_size:6,InstitutionName:"",members:0,RG_score:0,citeTime:0,AuthorPapers:[],AuthorCitation:[],paperCitation:[],papers:[],authors:[],currentPage:1,pagesize:7,currentPage_author:1,pagesize_author:3,years:[],y_cites:[],y_pub:[],modalShow:!0}},created:function(){},mounted:function(){var t=this.$route.query.id;console.log("id is",t),this.test(t)},methods:{buildPie1:function(t){var e=o.init(document.getElementById("chart1")),i=o.init(document.getElementById("chart2")),a=o.init(document.getElementById("chart3")),r=o.init(document.getElementById("chart4")),n=this.randomColor(),s=this.randomColor(),l={backgroundColor:"#FFF",tooltip:{trigger:"item",formatter:"{a} <br/>{b}年   {c}篇"},legend:{data:[{name:"Citation"},{name:"Publication"}]},xAxis:{data:this.years},yAxis:[{name:"Citation",axisLine:{lineStyle:{color:n,width:1}}},{name:"Publication",axisLine:{lineStyle:{color:s}}}],series:[{name:"Citation",type:"bar",data:this.y_cites,itemStyle:{color:n}},{name:"Publication",type:"bar",data:this.y_pub,itemStyle:{color:s}}]},c={title:{text:"成员发表论文量",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>姓名：{b}<br/>文章数量：{c} ({d}%)"},series:[{name:"成员发表论文量",radius:["55%","70"],label:{alignTo:"labelLine",textStyle:{color:""}},labelLine:{},minShowLabelAngle:7,type:"pie",data:this.addColor(this.AuthorPapers)}]},u={title:{text:"成员被引用次数",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>姓名：{b}<br/>被引用量：{c} ({d}%)"},series:[{name:"成员被引次数",radius:["55%","70"],label:{alignTo:"labelLine",textStyle:{color:""}},labelLine:{},minShowLabelAngle:7,type:"pie",data:this.addColor(this.AuthorCitation)}]},h={title:{text:"论文被引用量",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>题目：{b}<br/>引用量：{c} ({d}%)"},series:[{name:"论文被引用量",radius:["55%","70"],label:{alignTo:"labelLine",textStyle:{color:""}},labelLine:{},minShowLabelAngle:7,type:"pie",data:this.addColor(this.paperCitation)}]};e.setOption(l),i.setOption(c),a.setOption(u),r.setOption(h),i.on("click",function(e){console.log(e.data.id,e.data.name),t.jump2authors(e.data.id)}),a.on("click",function(e){console.log(e.data.id,e.data.name),t.jump2authors(e.data.id)}),r.on("click",function(e){t.jump2papers(e.data.id)})},luanxu:function(t){for(var e=t.length,i=0;i<e;i++){var a=Math.floor(Math.random()*(e-i)),r=t[a];t[a]=t[e-i-1],t[e-i-1]=r}return t},addColor:function(t){for(var e=t,i=0;i<t.length;i++){t[i].itemStyle={color:this.randomColor()}}return e},randomColor:function(){for(var t=Math.floor(180*Math.random()),e=Math.floor(256*Math.random()),i=Math.floor(200*Math.random());.299*t+.578*e+.114*i>=130;)t=Math.floor(180*Math.random()),e=Math.floor(256*Math.random()),i=Math.floor(200*Math.random());return"rgb("+t+","+e+","+i+")"},handleCurrentChange:function(t){this.currentPage=t},handleCurrentChange_author:function(t){var e=this;this.currentPage_author=t;var i=this.authors.slice((this.currentPage_author-1)*this.pagesize_author,this.currentPage_author*this.pagesize_author);console.log("pageAuthor is",i),this.pic.hasOwnProperty(this.currentPage_author)||(this.pic[this.currentPage_author]=[]);for(var r=0;r<i.length;r++)for(var n=i[r],o=0;o<n.length;o++){var s=n[o];a.a.getRealPic(s.id).then(function(t){var i="data:image/png;base64,"+btoa(new Uint8Array(t.data).reduce(function(t,e){return t+String.fromCharCode(e)},""));e.pic[e.currentPage_author].push(i),e.rerender()})}},rerender:function(){this.modalShow=!1,this.modalShow=!0},test:function(t){var e=this,i=this;n.a.getInstitutionMsg(t).then(function(t){var a=t.data.hits.hits[0]._source;console.log("info is ",a),e.fillCites(a),e.fillPaperCites(a),e.fillAuthorCites(a),e.fillAuthorPubs(a),e.fillAuthors(a),e.fillPapers(a),e.fillAttribute(a),e.buildPie1(i),e.handleCurrentChange_author(1)})},jump2authors:function(t){this.$router.push({path:"/authorPage",query:{id:t}})},jump2papers:function(t){var e="/article/"+t+"/overviews";this.$router.push(e)},getPic:function(t,e){return console.log("pic is",this.pic[e]),this.pic[e]},fillAttribute:function(t){this.members=t.authors.length,this.citeTime=t.n_citation,this.RG_score=t.n_pubs,this.InstitutionName=t.name},fillPapers:function(t){for(var e=0;e<t.pubs.length;e++){var i=t.pubs[e],a={};a.id=i.id,a.title=i.title,a.cites=i.n_citation,this.papers.push(a)}},fillAuthors:function(t){for(var e=[],i=0,a=0;a<t.authors.length;a++){var r=t.authors[a],n={};n.name=r.name,n.id=r.id,n.pubs=r.n_pubs,n.cite=r.n_citation,e.push(n),++i===this.row_size&&(this.authors.push(e),e=[],i=0)}0!==i&&this.authors.push(e)},fillAuthorCites:function(t){t.authors.sort(function(t,e){return e.n_citation-t.n_citation});var e=t.authors.length>=this.maxSize?t.authors.slice(0,this.maxSize):t.authors;e=this.luanxu(e);for(var i=0;i<e.length;i++){var a=e[i],r={};r.name=a.name,r.value=a.n_citation,r.id=a.id,this.AuthorCitation.push(r)}},fillAuthorPubs:function(t){t.authors.sort(function(t,e){return e.n_pubs-t.n_pubs});var e=t.authors.length>=this.maxSize?t.authors.slice(0,this.maxSize):t.authors;e=this.luanxu(e);for(var i=0;i<e.length;i++){var a=e[i],r={};r.name=a.name,r.value=a.n_pubs,r.id=a.id,this.AuthorPapers.push(r)}},shortName:function(t){return t.length>this.maxNameLen?t.slice(0,this.maxNameLen)+"...":t},fillPaperCites:function(t){t.pubs.sort(function(t,e){return e.n_citation-t.n_citation});var e=t.pubs.length>=this.maxSize?t.pubs.slice(0,this.maxSize):t.pubs;e=this.luanxu(e);for(var i=0;i<e.length;i++){var a=e[i],r={};r.name=a.title,r.value=a.n_citation,r.id=a.id,this.paperCitation.push(r)}},fillCites:function(t){for(var e=0,i=9999,a=void 0,r={},n={},o=0;o<t.year_citation.length;o++){var s=t.year_citation[o];a=parseInt(s.year),r[s.year]=s.cnt,a>e&&(e=a),a<i&&(i=a)}for(var l=0;l<t.year_pubs.length;l++){var c=t.year_pubs[l];a=parseInt(c.year),n[c.year]=c.cnt,a>e&&(e=a),a<i&&(i=a)}for(var u=i,h=0;u<=e;u++,h++){this.$data.years.push(u);var p=""+u;r.hasOwnProperty(p)?this.y_cites[h]=r[p]:this.y_cites[h]=0,n.hasOwnProperty(p)?this.y_pub[h]=n[p]:this.y_pub[h]=0}}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-container",{staticStyle:{display:"flex","justify-content":"center","flex-direction":"column"}},[i("div",[i("Nav_with_searchBox")],1),t._v(" "),i("el-main",[i("div",{staticStyle:{display:"flex","flex-direction":"column","align-items":"center"}},[i("div",{staticClass:"IName"},[i("el-col",[i("el-row",{staticClass:"Iname_font"},[t._v("\n              "+t._s(this.InstitutionName)+"\n            ")]),t._v(" "),i("el-row",{staticStyle:{"margin-top":"23px","margin-left":"25px"}},[i("el-row",[i("el-col",{attrs:{span:6}},[i("i",{staticClass:"el-icon-user",staticStyle:{color:"#6E6E6E"}},[t._v("成员总数： "),i("a",{staticStyle:{color:"#00BFFF"}},[t._v(" "+t._s(this.members))]),t._v(" 人")])]),t._v(" "),i("el-col",{attrs:{span:6}},[i("i",{staticClass:"el-icon-collection-tag",staticStyle:{color:"#6E6E6E"}},[t._v("论文引用总次数： "),i("a",{staticStyle:{color:"#00BFFF"}},[t._v(" "+t._s(this.citeTime))]),t._v(" 次")])]),t._v(" "),i("el-col",{attrs:{span:10,offset:1}},[i("i",{staticClass:"el-icon-star-on",staticStyle:{color:"#6E6E6E"}},[t._v(" 总发布论文数: "),i("a",{staticStyle:{color:"#00BFFF"}},[t._v(t._s(this.RG_score))]),t._v(" 篇")])])],1)],1)],1)],1),t._v(" "),i("div",{staticClass:"statistics"},[i("el-row",[i("div",{staticStyle:{"font-family":"siyuan","font-weight":"bold","font-size":"25px","text-align":"center","margin-bottom":"40px","margin-top":"20px"}},[t._v("\n              数据统计\n            ")])]),t._v(" "),i("div",{staticStyle:{width:"1000px",display:"flex","justify-content":"center"}},[i("div",{staticStyle:{width:"475px",display:"flex","justify-content":"center"}},[i("div",{attrs:{id:"chart1"}})]),t._v(" "),i("div",{staticStyle:{width:"475px",display:"flex","justify-content":"center"}},[i("div",{attrs:{id:"chart2"}})])]),t._v(" "),i("div",{staticStyle:{width:"1000px","margin-top":"40px","margin-bottom":"60px",display:"flex","justify-content":"center"}},[i("div",{staticStyle:{width:"475px",display:"flex","justify-content":"center"}},[i("div",{attrs:{id:"chart3"}})]),t._v(" "),i("div",{staticStyle:{width:"475px",display:"flex","justify-content":"center"}},[i("div",{attrs:{id:"chart4"}})])])],1),t._v(" "),i("div",{staticClass:"authors"},[i("div",{staticStyle:{display:"flex","flex-direction":"column"}},[i("div",{staticStyle:{"font-family":"siyuan","font-weight":"bold","font-size":"25px","text-align":"center","margin-top":"20px",height:"50px"}},[t._v("\n              成员列表\n            ")]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"center","margin-bottom":"10px"}},[i("a",{staticStyle:{"font-family":"Georgia","font-size":"20px",color:"#2E9AFE"}},[t._v(t._s(this.members))]),t._v(" "),i("a",{staticStyle:{"font-family":"siyuan","font-size":"13px",color:"#848484","margin-left":"5px"}},[t._v("名成员")])]),t._v(" "),i("div",{staticStyle:{display:"flex","flex-direction":"column"}},[t.modalShow?i("div",{staticStyle:{display:"flex","justify-content":"center"}},[i("div",{staticStyle:{display:"flex","flex-direction":"column",width:"800px"}},t._l(t.authors.slice((t.currentPage_author-1)*t.pagesize_author,t.currentPage_author*t.pagesize_author),function(e,a){return i("div",{key:a,staticStyle:{"margin-top":"10px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-around"}},t._l(e,function(e,r){return i("el-tooltip",{key:r,attrs:{placement:"top",effect:"light"}},[i("div",{attrs:{slot:"content"},slot:"content"},[t._v("姓名："+t._s(e.name)),i("br"),t._v("被引次数："+t._s(e.cite)),i("br"),t._v("发表文章数："+t._s(e.pubs))]),t._v(" "),i("div",{staticStyle:{display:"flex","flex-direction":"column",cursor:"pointer"},on:{click:function(i){return t.jump2authors(e.id)}}},[i("div",{staticStyle:{display:"flex","justify-content":"center"}},[i("el-avatar",{staticStyle:{"margin-left":"10px","margin-top":"10px","background-color":"#81DAF5"},attrs:{size:50,src:t.pic[t.currentPage_author][a*t.row_size+r]}})],1),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"center","flex-wrap":"wrap",width:"100px"}},[i("div",{staticStyle:{"font-family":"Gabriola","font-size":"16px"}},[t._v("\n                              "+t._s(t.shortName(e.name))+"\n                            ")])])])])}),1)])}),0)]):t._e(),t._v(" "),i("div",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"center"}},[i("el-pagination",{staticClass:"greyPage",staticStyle:{"margin-top":"30px"},attrs:{small:"",layout:"prev, pager, next",total:t.authors.length,"current-page":t.currentPage_author,"page-size":t.pagesize_author},on:{"current-change":t.handleCurrentChange_author}})],1)])])]),t._v(" "),i("div",{staticClass:"papers"},[i("div",[i("div",{staticStyle:{"font-family":"siyuan","font-weight":"bold","font-size":"25px","text-align":"center","margin-bottom":"10px","margin-top":"20px"}},[t._v("\n              论文概览\n            ")])]),t._v(" "),i("div",{staticClass:"paperFather"},[t._l(t.papers.slice((t.currentPage-1)*t.pagesize,t.currentPage*t.pagesize),function(e,a){return i("div",{key:a,staticStyle:{"font-family":"Georgia","margin-top":"25px"}},[i("div",{staticStyle:{"background-color":"#FFF","box-shadow":"1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04)",padding:"15px"},on:{click:function(i){return t.jump2papers(e.id)}}},[i("el-row",[i("el-col",{attrs:{span:1}},[i("div",{staticClass:"xuhao"},[t._v(t._s(a+1))])]),t._v(" "),i("el-col",{attrs:{span:18}},[i("el-row",{staticClass:"paper_title",staticStyle:{"margin-top":"5px"}},[t._v("\n                    "+t._s(e.title)+"\n                  ")])],1),t._v(" "),i("el-col",{attrs:{span:4}},[i("div",{staticClass:"cites"},[t._v("被引次数："+t._s(e.cites))])])],1)],1)])}),t._v(" "),i("el-pagination",{staticStyle:{"margin-top":"30px","margin-bottom":"20px"},attrs:{background:"",layout:"prev, pager, next",total:t.papers.length,"current-page":t.currentPage,"page-size":t.pagesize,align:"center"},on:{"current-change":t.handleCurrentChange}})],2)])])])],1)],1)},staticRenderFns:[]};var c=i("VU/8")(s,l,!1,function(t){i("FCZ3")},"data-v-747f991a",null);e.default=c.exports}});
//# sourceMappingURL=12.0930f9836580feb51f6b.js.map