webpackJsonp([8],{"T+nX":function(t,i,e){t.exports=e.p+"static/img/admin.d0f9580.png"},ZwLw:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={name:"Admin",data:function(){return{size:100,admin_id:""}},mounted:function(){this.admin_id=localStorage.getItem("admin_id")},methods:{logOut:function(){localStorage.setItem("admin_id","")}}},a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"background"},[0===t.admin_id.length?s("div",{staticClass:"body-error"},[s("h1",[t._v("对不起，您无权访问改页面")])]):s("el-row",{staticClass:"body"},[s("el-col",{staticClass:"side-bar"},[s("div",{staticClass:"id"},[s("div",{staticClass:"head-box"},[s("el-avatar",{attrs:{shape:"circle",size:t.size,src:e("T+nX")}})],1),t._v(" "),s("div",{staticClass:"name-box"},[t._v("\n          管理员\n        ")])]),t._v(" "),s("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"1","text-color":"black","active-text-color":"blue",router:""}},[s("el-divider"),t._v(" "),s("el-menu-item",{staticClass:"list-item",attrs:{index:"/admin/applications"}},[s("i",{staticClass:"el-icon-menu"}),t._v(" "),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("诉求列表")])]),t._v(" "),s("el-menu-item",{staticClass:"list-item",attrs:{index:"/admin"}},[s("i",{staticClass:"el-icon-document"}),t._v(" "),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("个人信息")])]),t._v(" "),s("el-menu-item",{staticClass:"list-item",attrs:{index:"/"},on:{click:t.logOut}},[s("i",{staticClass:"el-icon-setting"}),t._v(" "),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("退出")])])],1)],1),t._v(" "),s("div",{staticClass:"main"},[s("router-view")],1)],1)],1)},staticRenderFns:[]};var l=e("VU/8")(s,a,!1,function(t){e("dhzZ")},"data-v-57bdf4ca",null);i.default=l.exports},dhzZ:function(t,i){}});
//# sourceMappingURL=8.756cf57d309f9ae7536d.js.map