webpackJsonp([13],{SHy6:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("2CGT"),s=i("ToqD"),l={name:"Applications",data:function(){return{detailsVisible:!1,handleVisible:!1,handleMethod:0,currentPage:0,totalPage:5,text:"",appealList:[{issue_id:0,user_id:0,scolar_id:"",describe:""}],appealDetail:{author_name:"",describe:"",issue_id:"",pic0:"",scolar_id:"",userName:"",user_id:""},scholar:{userName:"",user_id:""},authors:[],picID:1}},mounted:function(){this.getList()},methods:{getList:function(){var e=this;Object(a.l)({}).then(function(t){e.appealList=t.favorites,e.getListUserName(),e.getListAuthorNameAndPic()})},getAnotherUser:function(){var e=this;Object(a.q)({author_id:this.appealDetail.scolar_id}).then(function(t){e.scholar.userName=t.user.name,e.scholar.user_id=t.user.user_id})},getListUserName:function(){for(var e=this,t=function(t){Object(a.r)({user_id:e.appealList[t].user_id}).then(function(i){e.appealList[t].userName=i.data.name})},i=0;i<this.appealList.length;i++)t(i)},getListAuthorNameAndPic:function(){for(var e=this,t=function(t){s.a.getAuthorInfo(e.appealList[t].scolar_id).then(function(i){e.appealList[t].author_name=i.data.hits.hits[0]._source.name})},i=0;i<this.appealList.length;i++)t(i)},tableRowClassName:function(e){e.row;return e.rowIndex%2==1?"row-one":"row-two"},indexMethod:function(e){return e+1},openDetails:function(e){this.appealDetail=e,this.getAnotherUser(),this.appealDetail.pic0="http://139.9.132.83:8000/user/getAppealPic?issue_id="+this.appealDetail.issue_id+"&number=1",2===this.appealDetail.picNum&&(this.appealDetail.pic1="http://139.9.132.83:8000/user/getAppealPic?issue_id="+this.appealDetail.issue_id+"&number=2"),this.detailsVisible=!0},visitAuthor:function(){var e=this.$router.resolve({name:"authorPage",query:{id:this.appealDetail.scolar_id}});window.open(e.href,"_blank")},closeDetail:function(){this.detailsVisible=!1},handle:function(e){this.appealDetail=e,this.handleVisible=!0},handleConfirm:function(){var e=this;Object(a.u)({issue_id:this.appealDetail.issue_id,handle:this.handleMethod}).then(function(t){"handle success: not remove bounding"==t.message?(e.$message({type:"success",message:"处理成功，申诉被驳回"}),0===e.text.length&&(e.text="您的申诉已被驳回，请修改后重新提交！"),Object(a.z)({sender_id:16,receiver_name:e.appealDetail.userName,text:e.text}).then()):(e.$message({type:"success",message:"处理成功，已解除该门户的绑定"}),0===e.text.length&&(e.text="您的申诉成功了，该门户的认证已被撤销！"),Object(a.z)({sender_id:16,receiver_name:e.appealDetail.userName,text:e.text}).then(),Object(a.z)({sender_id:16,receiver_name:e.scholar.userName,text:"非常抱歉的通知您，您的认证门户被其他用户申诉成功，该门户已经与您解除绑定。"}).then())}),this.handleVisible=!1,this.getList()}}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-card",{staticStyle:{height:"747px"}},[i("h1",[e._v("诉求列表")]),e._v(" "),i("el-divider"),e._v(" "),i("div",{staticClass:"list-box"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.appealList,stripe:"","row-class-name":e.tableRowClassName}},[i("el-table-column",{attrs:{type:"index",index:e.indexMethod}}),e._v(" "),i("el-table-column",{attrs:{prop:"user_id",label:"用户ID",width:"180"}}),e._v(" "),i("el-table-column",{attrs:{prop:"scolar_id",label:"申诉门户ID"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"large",type:"primary"},on:{click:function(i){return e.openDetails(t.row)}}},[e._v("查看详情\n            ")]),e._v(" "),i("el-button",{attrs:{size:"large",type:"success"},on:{click:function(i){return e.handle(t.row)}}},[e._v("处理\n            ")])]}}])})],1),e._v(" "),i("div",{staticClass:"pagination-box"},[i("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.totalPage}})],1)],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"详细信息",visible:e.detailsVisible,width:"50%","append-to-body":""},on:{"update:visible":function(t){e.detailsVisible=t}}},[i("div",{staticStyle:{height:"550px"}},[i("el-descriptions",{attrs:{direction:"horizontal",column:8,border:""}},[i("el-descriptions-item",{attrs:{label:"用户名",span:4}},[e._v("\n          "+e._s(e.appealDetail.userName)+"\n        ")]),e._v(" "),i("el-descriptions-item",{attrs:{label:"申诉门户",span:4}},[e._v("\n          "+e._s(e.appealDetail.author_name)+"\n          "),i("el-button",{staticClass:"check-btn",attrs:{type:"primary",plain:""},on:{click:e.visitAuthor}},[e._v("查看门户")])],1),e._v(" "),i("el-descriptions-item",{attrs:{label:"描述",span:8}},[e._v(" "+e._s(e.appealDetail.describe)+" ")])],1),e._v(" "),i("div",{staticClass:"pic-box"},[i("el-radio-group",{model:{value:e.picID,callback:function(t){e.picID=t},expression:"picID"}},[i("el-radio-button",{attrs:{label:"1"}},[e._v("图片一")]),e._v(" "),i("el-radio-button",{attrs:{label:"2"}},[e._v("图片二")])],1)],1),e._v(" "),i("div",{staticClass:"picture"},["1"==e.picID?i("el-image",{attrs:{src:this.appealDetail.pic0}}):"2"==e.picID?i("div",[2===e.appealDetail.picNum?i("el-image",{attrs:{src:this.appealDetail.pic1}}):i("el-empty")],1):e._e(),e._v(" "),i("div",{staticClass:"btn-box"},[i("el-button",{attrs:{type:"primary"},on:{click:e.closeDetail}},[e._v("确定")])],1)],1)],1)]),e._v(" "),i("el-dialog",{attrs:{title:"处理申诉",visible:e.handleVisible,width:"40%","append-to-body":""},on:{"update:visible":function(t){e.handleVisible=t}}},[i("div",{staticClass:"handle-body"},[i("div",{staticClass:"handle-text"},[e._v("请选择处理方式：")]),e._v(" "),i("el-radio-group",{model:{value:e.handleMethod,callback:function(t){e.handleMethod=t},expression:"handleMethod"}},[i("div",{staticClass:"choice-box"},[i("div",{staticClass:"choice-item"},[i("el-radio",{attrs:{label:1,border:""}},[e._v("申诉通过（被申诉的门户将被解除认证）")])],1),e._v(" "),i("div",{staticClass:"choice-item"},[i("el-radio",{attrs:{label:0,border:""}},[e._v("驳回申诉")])],1)])]),e._v(" "),i("div",{staticClass:"input-box"},[e._v("\n        附加信息：\n      ")]),e._v(" "),i("el-input",{attrs:{type:"textarea",placeholder:"选填，会以私信的形式通知用户",maxlength:"250",rows:"8",resize:"none","show-word-limit":""},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),e._v(" "),i("div",{staticClass:"confirm-btn-box"},[i("el-button",{attrs:{type:"primary"},on:{click:e.handleConfirm}},[e._v("确定")])],1)],1)])],1)},staticRenderFns:[]};var r=i("VU/8")(l,n,!1,function(e){i("TIjV")},"data-v-fb0f3612",null);t.default=r.exports},TIjV:function(e,t){}});
//# sourceMappingURL=13.5efaad07ce9c0101efc9.js.map