webpackJsonp([17],{"4QFC":function(s,e){},"A+xV":function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("1IRg"),r=t("2CGT"),i={name:"Register",components:{nav_with_searchBox:a.a},data:function(){var s=this;return{user:{name:"",password:"",checkPass:"",email:""},rules:{password:[{validator:function(e,t,a){""===t?a(new Error("请输入密码")):(""!==s.user.checkPass&&s.$refs.ruleForm.validateField("checkPass"),a())},trigger:"blur"}],checkPass:[{validator:function(e,t,a){""===t?a(new Error("请再次输入密码")):t!==s.user.password?a(new Error("两次输入密码不一致!")):a()},trigger:"blur"}]}}},methods:{register:function(){var s=this;""===this.user.name?this.$message({type:"warning",message:"用户名不能为空"}):""===this.user.email?this.$message({type:"warning",message:"邮箱不能为空"}):""===this.user.password?this.$message({type:"warning",message:"密码不能为空"}):this.user.password===this.user.checkPass?Object(r.w)({name:this.user.name,password:this.user.password,mailbox:this.user.email}).then(function(e){"注册成功"===e.message?(s.$message({type:"success",message:"注册成功"}),s.$router.push("/login")):"用户名已存在"===e.message?s.$message({type:"warning",message:"用户名已存在"}):s.$message({type:"warning",message:"邮箱已被注册"})}):this.$message({type:"warning",message:"两次输入的密码不一致"})}}},o={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"background"},[t("nav_with_search-box"),s._v(" "),t("div",{staticClass:"body"},[t("div",{staticClass:"middle-box"},[t("h1",{staticClass:"title-box"},[s._v("新用户注册")]),s._v(" "),t("el-divider",[s._v("学术成果分享平台")]),s._v(" "),t("el-form",{ref:"user",staticClass:"demo-ruleForm",attrs:{model:s.user,"status-icon":"",rules:s.rules}},[t("el-form-item",{staticClass:"account-box"},[t("h3",{staticClass:"text-box"},[s._v("用户名")]),s._v(" "),t("el-input",{model:{value:s.user.name,callback:function(e){s.$set(s.user,"name",e)},expression:"user.name"}})],1),s._v(" "),t("el-form-item",{staticClass:"account-box"},[t("h3",{staticClass:"text-box"},[s._v("邮箱")]),s._v(" "),t("el-input",{model:{value:s.user.email,callback:function(e){s.$set(s.user,"email",e)},expression:"user.email"}})],1),s._v(" "),t("el-form-item",{staticClass:"account-box",attrs:{prop:"password"}},[t("h3",{staticClass:"text-box"},[s._v("密码")]),s._v(" "),t("el-input",{attrs:{autocomplete:"off",type:"password"},model:{value:s.user.password,callback:function(e){s.$set(s.user,"password",e)},expression:"user.password"}})],1),s._v(" "),t("el-form-item",{staticClass:"account-box",attrs:{prop:"checkPass"}},[t("h3",{staticClass:"text-box"},[s._v("确认密码")]),s._v(" "),t("el-input",{attrs:{autocomplete:"off",type:"password"},model:{value:s.user.checkPass,callback:function(e){s.$set(s.user,"checkPass",e)},expression:"user.checkPass"}})],1)],1),s._v(" "),t("div",{staticClass:"btn-box"},[t("el-button",{staticStyle:{"font-size":"large"},attrs:{type:"primary"},on:{click:s.register}},[s._v("确定")])],1)],1)])],1)},staticRenderFns:[]};var n=t("VU/8")(i,o,!1,function(s){t("4QFC")},"data-v-6df931aa",null);e.default=n.exports}});
//# sourceMappingURL=17.7949a3a718ebe6cca5ab.js.map