webpackJsonp([18],{LOCz:function(s,t){},de8W:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a("1IRg"),n=a("2CGT"),i={name:"LoginAdmin",components:{Nav_with_searchBox:e.a},data:function(){return{account:"",password:""}},methods:{login:function(){var s=this;Object(n.a)({name:this.account,password:this.password}).then(function(t){"用户名或密码错误"===t.message?s.$message({type:"warning",message:"用户名或密码错误"}):"admin not exist"===t.message?s.$message({type:"warning",message:"用户名或密码错误"}):(localStorage.setItem("admin_id",t.admin_id),s.$message({type:"success",message:"登陆成功！"}),s.$router.push("/admin"))})}}},o={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"background"},[a("nav_with_search-box"),s._v(" "),a("div",{staticClass:"body"},[a("div",{staticClass:"middle-box"},[a("h1",{staticClass:"title-box"},[s._v("管理员登陆")]),s._v(" "),a("el-divider",[s._v("学术交流平台")]),s._v(" "),a("div",{staticClass:"account-box"},[a("h3",{staticClass:"text-box"},[s._v("账号")]),s._v(" "),a("el-input",{attrs:{placeholder:"请输入账号"},model:{value:s.account,callback:function(t){s.account=t},expression:"account"}})],1),s._v(" "),a("div",{staticClass:"account-box"},[a("h3",{staticClass:"text-box"},[s._v("密码")]),s._v(" "),a("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:s.password,callback:function(t){s.password=t},expression:"password"}})],1),s._v(" "),a("div",{staticClass:"btn-box"},[a("el-button",{staticStyle:{"font-size":"large"},attrs:{type:"primary"},on:{click:s.login}},[s._v("登陆")])],1)],1)])],1)},staticRenderFns:[]};var c=a("VU/8")(i,o,!1,function(s){a("LOCz")},"data-v-57469530",null);t.default=c.exports}});
//# sourceMappingURL=18.b237f92bb6276276a14c.js.map