webpackJsonp([19],{SHy6:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("2CGT"),s=i("ToqD"),l={name:"Applications",data:function(){return{detailsVisible:!1,relatedVisible:!1,currentPage:0,totalPage:5,appealList:[{issue_id:0,user_id:0,scolar_id:"",describe:""}],appealDetail:{author_name:"",describe:"",issue_id:"",pic0:"",scolar_id:"",userName:"",user_id:""},authors:[],picID:1}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;Object(a.k)({}).then(function(e){t.appealList=e.favorites,t.getListUserName(),t.getListAuthorNameAndPic()})},getListUserName:function(){for(var t=this,e=function(e){Object(a.q)({user_id:t.appealList[e].user_id}).then(function(i){t.appealList[e].userName=i.data.name})},i=0;i<this.appealList.length;i++)e(i)},getListAuthorNameAndPic:function(){for(var t=this,e=function(e){s.a.getAuthorInfo(t.appealList[e].scolar_id).then(function(i){t.appealList[e].author_name=i.data.hits.hits[0]._source.name})},i=0;i<this.appealList.length;i++)e(i)},tableRowClassName:function(t){t.row;return t.rowIndex%2==1?"row-one":"row-two"},indexMethod:function(t){return t+1},confirm:function(t){this.relatedVisible=!0},confirmApplication:function(){this.relatedVisible=!1},openDetails:function(t){this.appealDetail=t,this.appealDetail.pic0="http://139.9.132.83:8000/user/getAppealPic?issue_id="+this.appealDetail.issue_id+"&number=1",2===this.appealDetail.picNum&&(this.appealDetail.pic1="http://139.9.132.83:8000/user/getAppealPic?issue_id="+this.appealDetail.issue_id+"&number=2"),this.detailsVisible=!0},visitUser:function(){var t=this.$router.resolve({name:"authorPage",query:{id:this.userDetail.user_id}});window.open(t.href,"_blank")},closeDetail:function(){this.detailsVisible=!1}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-card",{staticStyle:{height:"747px"}},[i("h1",[t._v("诉求列表")]),t._v(" "),i("el-divider"),t._v(" "),i("div",{staticClass:"list-box"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.appealList,stripe:"","row-class-name":t.tableRowClassName}},[i("el-table-column",{attrs:{type:"index",index:t.indexMethod}}),t._v(" "),i("el-table-column",{attrs:{prop:"user_id",label:"用户ID",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{prop:"scolar_id",label:"申诉门户ID"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"large",type:"primary"},on:{click:function(i){return t.openDetails(e.row)}}},[t._v("查看详情\n            ")]),t._v(" "),i("el-button",{attrs:{size:"large",type:"success"}},[t._v("处理\n            ")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-box"},[i("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.totalPage}})],1)],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"详细信息",visible:t.detailsVisible,width:"50%","append-to-body":""},on:{"update:visible":function(e){t.detailsVisible=e}}},[i("div",{staticStyle:{height:"550px"}},[i("el-descriptions",{attrs:{direction:"horizontal",column:8,border:""}},[i("el-descriptions-item",{attrs:{label:"用户名",span:4}},[t._v(" "+t._s(t.appealDetail.userName)+" ")]),t._v(" "),i("el-descriptions-item",{attrs:{label:"申诉门户",span:4}},[t._v(" "+t._s(t.appealDetail.author_name)+" ")]),t._v(" "),i("el-descriptions-item",{attrs:{label:"描述",span:8}},[t._v(" "+t._s(t.appealDetail.describe)+" ")])],1),t._v(" "),i("div",{staticClass:"pic-box"},[i("el-radio-group",{model:{value:t.picID,callback:function(e){t.picID=e},expression:"picID"}},[i("el-radio-button",{attrs:{label:"1"}},[t._v("图片一")]),t._v(" "),i("el-radio-button",{attrs:{label:"2"}},[t._v("图片二")])],1)],1),t._v(" "),"1"==t.picID?i("el-image",{attrs:{src:this.appealDetail.pic0}}):"2"==t.picID?i("div",[2===t.appealDetail.picNum?i("el-image",{attrs:{src:this.appealDetail.pic1}}):i("el-empty")],1):t._e(),t._v(" "),i("div",{staticClass:"btn-box"},[i("el-button",{attrs:{type:"primary"},on:{click:t.closeDetail}},[t._v("确定")])],1)],1)])],1)},staticRenderFns:[]};var r=i("VU/8")(l,n,!1,function(t){i("yult")},"data-v-3726f579",null);e.default=r.exports},yult:function(t,e){}});
//# sourceMappingURL=19.bdd27163fbb261f58978.js.map