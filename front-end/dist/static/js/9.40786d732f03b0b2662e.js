webpackJsonp([9],{"2ZRI":function(t,e){},Nxxn:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("1IRg"),a=s("ToqD"),o=s("2CGT"),n={name:"authorSearchResult",props:["author","user_id"],data:function(){return{circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",email:"",code:"",dialogVisible:!1,haveSend:!1,refuseEmailList:["qq.com","163.com","vip.163.com","gmail.com","126.com","vip.126.com","sohu.com","139.com","189.cn","189.com","sina.com","outlook.com","aliyun.com","hotmail.com","tom.com","sogou.com","2980.com","21cn.com","188.com","yeah.net"]}},methods:{changeActive:function(t){t.currentTarget.className="main-body-move"},removeActive:function(t){t.currentTarget.className="main-body"},jumpToAuthorPage:function(t){var e=this.$router.resolve({name:"authorPage",query:{id:t}});window.open(e.href,"_blank")},openDialog:function(){var t=this;Object(o.e)({author_id:this.author._source.id}).then(function(e){e.ifHaveAccount?t.$message({type:"warning",message:"该门户已被认证"}):t.dialogVisible=!0})},sendCode:function(){var t=this;0===this.email.length?this.$message({type:"warning",message:"邮箱不能为空"}):this.judgeEmail()?Object(o.j)({to_email:this.email}).then(function(e){"this email has been used for verification"===e.message?t.$message({type:"warning",message:"该邮箱已经被认证过，请使用其他邮箱"}):"success"===e.message&&(t.$message({type:"success",message:"验证码已发送"}),t.haveSend=!0)}):this.$message({type:"warning",message:"不可用的邮箱类型，请输入其他邮箱"})},close:function(){this.email="",this.text=""},confirm:function(){var t=this;0===this.email.length?this.$message({type:"warning",message:"邮箱不能为空"}):0===this.code.length?this.$message({type:"warning",message:"验证码不能为空"}):Object(o.i)({to_email:this.email,re_yzm:this.code}).then(function(e){"success"==e.message?Object(o.v)({user_id:t.user_id,author_id:t.author._source.id,mail:t.email}).then(function(e){console.log(e),"Identify success"==e.message&&(t.$message({type:"success",message:"认证成功"}),t.$router.push({path:"userHome",query:{id:t.user_id}})),t.dialogVisible=!1,t.haveSend=!1}):t.$message({type:"warning",message:"验证码错误"})})},judgeEmail:function(){for(var t=this.email.split("@")[1],e=0;e<this.refuseEmailList.length;e++)if(this.refuseEmailList[e]===t)return!1;return!0}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"main-body",on:{mouseover:function(e){return t.changeActive(e)},mouseleave:function(e){return t.removeActive(e)}}},[s("div",[s("el-avatar",{attrs:{size:85,src:t.circleUrl}})],1),t._v(" "),s("div",{staticClass:"right-box"},[s("div",{staticClass:"name-box"},[s("h2",[t._v(" "+t._s(t.author._source.name)+" ")])]),t._v(" "),t._l(t.author._source.orgs,function(e){return s("div",{key:e.id,staticClass:"orgs-box"},[t._v("\n        "+t._s(e.name)+"\n      ")])}),t._v(" "),s("div",{staticClass:"detail-box"},[s("div",{staticClass:"detail-item-box"},[s("a",{staticClass:"title"},[t._v("发表文章：")]),t._v("\n          "+t._s(t.author._source.n_pubs)+"\n        ")]),t._v(" "),s("div",{staticClass:"detail-box"},[s("a",{staticClass:"title"},[t._v("被引次数：")]),t._v("\n          "+t._s(t.author._source.n_citation)+"\n        ")])])],2),t._v(" "),s("div",{staticClass:"btn-box"},[s("el-button",{staticClass:"item-btn",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",plain:""},on:{click:function(e){return t.jumpToAuthorPage(t.author._source.id)}}},[t._v("前往查看\n      ")]),t._v(" "),s("el-button",{staticClass:"item-btn",attrs:{type:"primary",plain:""},on:{click:t.openDialog}},[t._v("我要认证\n      ")])],1)]),t._v(" "),s("el-dialog",{attrs:{title:"邮箱认证",visible:t.dialogVisible,width:"35%","append-to-body":""},on:{"update:visible":function(e){t.dialogVisible=e},close:t.close}},[s("div",{staticClass:"letter-body"},[s("div",{staticClass:"letter-title"},[s("p",[t._v("您是 "),s("a",{staticClass:"author-name"},[t._v(t._s(t.author._source.name))]),t._v("  ?  ")]),t._v(" "),s("p",[t._v("我们将通过邮箱验证的方式确认您的身份。")])]),t._v(" "),s("div",{staticClass:"email-box"},[s("div",{staticStyle:{width:"100%"}},[s("el-input",{attrs:{size:"medium",placeholder:"请使用您所在机构的邮箱认证"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)]),t._v(" "),s("div",{staticClass:"email-box"},[s("div",{staticStyle:{width:"75%"}},[s("el-input",{attrs:{size:"medium",placeholder:"请输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1),t._v(" "),s("el-button",{staticClass:"send-code-btn",attrs:{type:"primary"},on:{click:t.sendCode}},[t._v("发送验证码")])],1),t._v(" "),s("div",[s("el-popover",{attrs:{placement:"right",width:"300",trigger:"hover"}},[s("h3",{staticClass:"refuse-email-title"},[t._v("不可用邮箱列表")]),t._v(" "),s("div",{staticClass:"refuse-email-list"},[s("p",[t._v("163邮箱：163.com,vip.163.com")]),t._v(" "),s("p",[t._v("gmail邮箱：gmail.com")]),t._v(" "),s("p",[t._v("qq邮箱：qq.com")]),t._v(" "),s("p",[t._v("126邮箱：126.com,vip.126.com")]),t._v(" "),s("p",[t._v("搜狐邮箱：sohu.com")]),t._v(" "),s("p",[t._v("139手机邮箱：139.com")]),t._v(" "),s("p",[t._v("189邮箱：189.cn,189.com")]),t._v(" "),s("p",[t._v("新浪邮箱：sina.com")]),t._v(" "),s("p",[t._v("outlook邮箱：outlook.com")]),t._v(" "),s("p",[t._v("阿里云邮箱：aliyun.com")]),t._v(" "),s("p",[t._v("hotmail邮箱：hotmail.com")]),t._v(" "),s("p",[t._v("TOM邮箱：tom.com")]),t._v(" "),s("p",[t._v("搜狗邮箱： sogou.com")]),t._v(" "),s("p",[t._v("2980邮箱：2980.com")]),t._v(" "),s("p",[t._v("21CN邮箱：21cn.com")]),t._v(" "),s("p",[t._v("188财富邮箱：188.com")]),t._v(" "),s("p",[t._v("网易yeah邮箱：yeah.net")])]),t._v(" "),s("el-button",{staticClass:"refuse-email-btn",attrs:{slot:"reference",type:"text",icon:"el-icon-question"},on:{click:t.judgeEmail},slot:"reference"},[t._v("查看不可用邮箱类型\n          ")])],1)],1),t._v(" "),s("div",{staticClass:"letter-btn-box"},[t.haveSend?s("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("确定")]):s("el-button",{attrs:{type:"primary",disabled:""},on:{click:t.confirm}},[t._v("确定")])],1)])])],1)},staticRenderFns:[]};var r={name:"identification",components:{AuthorSearchResult:s("VU/8")(n,c,!1,function(t){s("2ZRI")},"data-v-408ca55c",null).exports,Nav_with_searchBox:i.a},data:function(){return{user_id:"",step:1,success:!1,info:{name:"",institution:"",email:""},rules:{name:[{required:!0,message:"请输入真实姓名",trigger:"blur"}],institution:[{required:!0,message:"请输入所属机构",trigger:"blur"}]},authorList:[]}},mounted:function(){this.user_id=localStorage.getItem("user_id")},methods:{checkInput:function(){0===this.step&&""!==this.info.name&&""!==this.info.institution&&""!==this.info.email?this.step=1:1===this.step&&(this.step=0)},search:function(){var t=this;""===this.info.name?this.$message({type:"warning",message:"姓名不能为空"}):""===this.info.institution?this.$message({type:"warning",message:"机构不能为空"}):(a.a.getAuthor(this.info.name,this.info.institution).then(function(e){t.authorList=e.data.hits.hits}),this.success=!0,this.step=2)}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"background"},[s("nav_with_search-box"),t._v(" "),s("div",{staticClass:"main"},[s("h2",{staticClass:"title-box"},[t._v("认证学者申请")]),t._v(" "),s("div",{staticClass:"description-box"},[t._v("\n      请按照要求如实填写以下信息，信息的真实性将提高搜索结果的准确度。\n    ")]),t._v(" "),s("div",{staticClass:"form-box"},[s("el-form",{ref:"form",attrs:{model:t.info,rules:t.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"姓名",prop:"name"}},[s("el-input",{attrs:{placeholder:"请输入真实姓名（必填）"},on:{change:t.checkInput},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"机构",prop:"institution"}},[s("el-input",{attrs:{placeholder:"填写请尽量细化，比如xx大学xx学院xx系，xx医院xx科等"},on:{change:t.checkInput},model:{value:t.info.institution,callback:function(e){t.$set(t.info,"institution",e)},expression:"info.institution"}})],1),t._v(" "),s("el-form-item",{staticStyle:{"text-align":"center"}},[s("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")])],1)],1)],1),t._v(" "),t.success?s("div",[s("div",{staticClass:"search-result-text"},[t._v("\n        为您检索到以下结果：\n      ")]),t._v(" "),s("div",{staticClass:"search-result"},[0===t.authorList.length?s("div",[s("el-empty",{attrs:{description:"对不起，没有找到相关学者"}})],1):t._l(t.authorList,function(e){return s("div",{key:e.id},[s("author-search-result",{attrs:{author:e,user_id:t.user_id}})],1)})],2)]):t._e(),t._v(" "),s("div",{staticClass:"step-box"},[s("el-steps",{attrs:{active:t.step,"finish-status":"success"}},[s("el-step",{attrs:{title:"第一步 用户填写信息",description:"请按照实际情况填写信息"}}),t._v(" "),s("el-step",{attrs:{title:"第二步 搜索门户",description:"点击搜索按钮查找是否有您的门户"}}),t._v(" "),s("el-step",{attrs:{title:"第三步 邮箱验证",description:"通过邮箱验证码对您的身份进行确认"}}),t._v(" "),s("el-step",{attrs:{title:"认证完成",description:"学者门户将与您的账号绑定"}})],1)],1),t._v(" "),s("div",{staticClass:"bottom-box"},[3===t.step?s("div",{staticClass:"result-box"},[s("el-result",{attrs:{icon:"warning",title:"验证中"}})],1):4===t.step?s("div",{staticClass:"result-box"},[s("el-result",{attrs:{icon:"success",title:"认证完成"}})],1):s("div",{staticClass:"result-box"},[s("el-result",{attrs:{icon:"info",title:"未认证"}})],1)])])],1)},staticRenderFns:[]};var u=s("VU/8")(r,l,!1,function(t){s("W62H")},"data-v-58b31b2e",null);e.default=u.exports},W62H:function(t,e){}});
//# sourceMappingURL=9.40786d732f03b0b2662e.js.map