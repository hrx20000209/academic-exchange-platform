webpackJsonp([13],{D8b1:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("1IRg"),o=e("2CGT"),i={name:"Login",components:{Nav_with_searchBox:a.a},data:function(){return{account:"",password:""}},methods:{login:function(){var t=this;""===this.account?this.$message({type:"warning",message:"请输入用户名"}):""===this.password?this.$message({type:"warning",message:"请输入密码"}):Object(o.D)({name:this.account,password:this.password}).then(function(s){"用户名或密码错误"===s.message?t.$message({type:"warning",message:"用户名或密码错误"}):(localStorage.setItem("user_id",s.user_id),localStorage.setItem("user_name",t.account),localStorage.setItem("ifLogin",1),t.$message({type:"success",message:"登陆成功！"}),t.$router.push("/homepage"))})},register:function(){this.$router.push("/register")}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"background"},[e("nav_with_search-box"),t._v(" "),e("div",{staticClass:"body"},[e("div",{staticClass:"middle-box"},[e("h1",{staticClass:"title-box"},[t._v("用户登陆")]),t._v(" "),e("el-divider",[t._v("学术交流平台")]),t._v(" "),e("div",{staticClass:"account-box"},[e("h3",{staticClass:"text-box"},[t._v("账号")]),t._v(" "),e("el-input",{attrs:{placeholder:"请输入账号"},model:{value:t.account,callback:function(s){t.account=s},expression:"account"}})],1),t._v(" "),e("div",{staticClass:"account-box"},[e("h3",{staticClass:"text-box"},[t._v("密码")]),t._v(" "),e("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}})],1),t._v(" "),e("div",{staticClass:"btn-box"},[e("el-button",{staticStyle:{"font-size":"large"},attrs:{type:"primary"},on:{click:t.login}},[t._v("登陆")])],1),t._v(" "),e("div",{staticClass:"register-box"},[t._v("\n          没有账号？点击此处"),e("el-button",{staticClass:"register-text",attrs:{type:"text"},on:{click:t.register}},[t._v("注册")])],1)],1)])],1)},staticRenderFns:[]};var n=e("VU/8")(i,c,!1,function(t){e("VhYH")},"data-v-d589aadc",null);s.default=n.exports},VhYH:function(t,s){}});
//# sourceMappingURL=13.dad81a00dc882a3d23db.js.map