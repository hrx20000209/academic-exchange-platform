webpackJsonp([19],{HqUs:function(t,e){},SHy6:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("2CGT"),n=i("ToqD"),s={name:"Applications",data:function(){return{detailsVisible:!1,relatedVisible:!1,currentPage:0,totalPage:5,userDetail:[{name:"",user_id:"",userName:"",phone:"",fields:"",background:"",institution:""}],tableData:[{date:"2016-05-02",name:"Tom",user_id:1,userName:"谭火彬",phone:"12345678910",fields:"软件工程 计算机科学",background:"博士",institution:"北京航空航天大学软件学院"}],authors:[]}},mounted:function(){this.getList({}).then(function(t){r})},methods:{getList:function(){Object(a.k)({}).then(function(t){console.log(t)})},tableRowClassName:function(t){t.row;return t.rowIndex%2==1?"row-one":"row-two"},indexMethod:function(t){return t+1},confirm:function(t){this.relatedVisible=!0,this.SearchAuthorByName(t)},SearchAuthorByName:function(t){var e=this;n.a.getAuthor(t).then(function(t){for(var i=t.data.hits.hits.length,a=0;a<i;a++){var n=t.data.hits.hits[a],s=e.default();s.id=n._id,s.name=n._source.name,s.n_pubs=n._source.n_pubs,s.n_citation=n._source.n_citation,s.pubs=n._source.pubs,0===n._source.orgs.length?s.organization_1="None":1===n._source.orgs.length?s.organization_1=n._source.orgs[0].name:(s.organization_1=n._source.orgs[0].name,s.organization_2=n._source.orgs[1].name),0===s.n_pubs?s.pub="None":s.pub=s.pubs[0].title,e.authors.push(s)}})},default:function(){return{id:"",name:"",n_pubs:0,n_citation:0,organization_1:"",organization_2:"",pubs:[],pub:""}},confirmApplication:function(){this.relatedVisible=!1},openDetails:function(t){this.detailsVisible=!0,this.userDetail=t},associate:function(t){console.log(t)},visitUser:function(){var t=this.$router.resolve({name:"authorPage",query:{id:this.userDetail.user_id}});window.open(t.href,"_blank")},closeDetail:function(){this.detailsVisible=!1}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-card",{staticStyle:{height:"747px"}},[i("h1",[t._v("诉求列表")]),t._v(" "),i("el-divider"),t._v(" "),i("div",{staticClass:"list-box"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:"","row-class-name":t.tableRowClassName}},[i("el-table-column",{attrs:{type:"index",index:t.indexMethod}}),t._v(" "),i("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{prop:"userName",label:"用户名",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{prop:"institution",label:"机构"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(i){return t.openDetails(e.row)}}},[t._v("查看详情\n            ")]),t._v(" "),i("el-button",{attrs:{size:"small",type:"success"},on:{click:function(i){return t.confirm(e.row.name)}}},[t._v("认证\n            ")]),t._v(" "),i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(i){return t.handleDelete(e.$index,e.row)}}},[t._v("拒绝\n            ")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-box"},[i("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.totalPage}})],1)],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"详细信息",visible:t.detailsVisible,width:"50%","append-to-body":""},on:{"update:visible":function(e){t.detailsVisible=e}}},[i("el-descriptions",{staticClass:"margin-top",attrs:{title:t.userDetail.userName,column:2,border:""}},[i("template",{slot:"extra"},[i("el-button",{attrs:{type:"primary",plain:""},on:{click:t.visitUser}},[t._v("查看用户主页")])],1),t._v(" "),i("el-descriptions-item",[i("template",{slot:"label"},[i("i",{staticClass:"el-icon-user"}),t._v("\n          姓名\n        ")]),t._v("\n        "+t._s(t.userDetail.name)+"\n      ")],2),t._v(" "),i("el-descriptions-item",[i("template",{slot:"label"},[i("i",{staticClass:"el-icon-mobile-phone"}),t._v("\n          手机号\n        ")]),t._v("\n        "+t._s(t.userDetail.phone)+"\n      ")],2),t._v(" "),i("el-descriptions-item",[i("template",{slot:"label"},[i("i",{staticClass:"el-icon-reading"}),t._v("\n          学历\n        ")]),t._v("\n        "+t._s(t.userDetail.background)+"\n      ")],2),t._v(" "),i("el-descriptions-item",[i("template",{slot:"label"},[i("i",{staticClass:"el-icon-office-building"}),t._v("\n          机构\n        ")]),t._v("\n        "+t._s(t.userDetail.institution)+"\n      ")],2),t._v(" "),i("el-descriptions-item",[i("template",{slot:"label"},[i("i",{staticClass:"el-icon-view"}),t._v("\n          研究领域\n        ")]),t._v("\n        "+t._s(t.userDetail.fields)+"\n      ")],2)],2),t._v(" "),i("div",{staticClass:"btn-box"},[i("el-button",{attrs:{type:"primary"},on:{click:t.closeDetail}},[t._v("确定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"认证",visible:t.relatedVisible,width:"80%","append-to-body":""},on:{"update:visible":function(e){t.relatedVisible=e}}},[i("h2",[t._v("系统中存在以下相关学者")]),t._v(" "),i("div",{staticClass:"text-box"},[t._v("请对该用户的身份进行匹配并完成认证，完成认证后用户即可关联该学者门户")]),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.authors,border:"","default-sort":{prop:"name",order:"ascending"}}},[i("el-table-column",{attrs:{prop:"name",label:"姓名",sortable:"",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{prop:"n_pubs",label:"发表数量",sortable:"",width:"120"}}),t._v(" "),i("el-table-column",{attrs:{prop:"pub",label:"代表文献"}}),t._v(" "),i("el-table-column",{attrs:{prop:"n_citation",label:"被引用量",sortable:"",width:"120"}}),t._v(" "),i("el-table-column",{attrs:{prop:"organization_1",label:"机构"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"success",plain:"",size:"small"},on:{click:function(i){return t.associate(e.row.id)}}},[t._v("关联")])]}}])})],1),t._v(" "),i("div",{staticClass:"btn-box"},[i("el-button",{attrs:{type:"primary"},on:{click:t.confirmApplication}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[]};var o=i("VU/8")(s,l,!1,function(t){i("HqUs")},"data-v-1ea1032a",null);e.default=o.exports}});
//# sourceMappingURL=19.a0f6f9e89837df930771.js.map