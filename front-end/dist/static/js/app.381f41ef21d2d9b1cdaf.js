webpackJsonp([23],{"2CGT":function(t,n,e){"use strict";var r=e("//Fk"),i=e.n(r),o=e("mtWM"),u=e.n(o);function a(t,n){return new i.a(function(e,r){u.a.get(t,{params:n}).then(function(t){e(t.data)}).catch(function(t){r(t.data)})})}function c(t,n){return new i.a(function(e,r){u.a.post(t,n).then(function(t){e(t.data)}).catch(function(t){r(t.data)})})}u.a.defaults.baseURL="http://139.9.132.83:8000/",u.a.defaults.timeout=1e4,u.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data",e.d(n,"r",function(){return s}),e.d(n,"B",function(){return l}),e.d(n,"y",function(){return h}),e.d(n,"F",function(){return f}),e.d(n,"o",function(){return d}),e.d(n,"x",function(){return p}),e.d(n,"z",function(){return m}),e.d(n,"n",function(){return v}),e.d(n,"b",function(){return b}),e.d(n,"D",function(){return y}),e.d(n,"E",function(){return w}),e.d(n,"t",function(){return g}),e.d(n,"p",function(){return _}),e.d(n,"c",function(){return A}),e.d(n,"m",function(){return I}),e.d(n,"a",function(){return x}),e.d(n,"v",function(){return P}),e.d(n,"g",function(){return E}),e.d(n,"h",function(){return M}),e.d(n,"w",function(){return C}),e.d(n,"k",function(){return S}),e.d(n,"f",function(){return R}),e.d(n,"A",function(){return D}),e.d(n,"e",function(){return F}),e.d(n,"q",function(){return L}),e.d(n,"C",function(){return z}),e.d(n,"j",function(){return U}),e.d(n,"i",function(){return N}),e.d(n,"l",function(){return T}),e.d(n,"u",function(){return $}),e.d(n,"d",function(){return H}),e.d(n,"s",function(){return O});var s=function(t){return a("/user/GetUserInfo",t)},l=function(t){return c("/user/ChangeUserInfo",t)},h=function(t){return c("/register",t)},f=function(t){return a("/login",t)},d=function(t){return a("/communicate/GetSendList",t)},p=function(t){return c("/communicate/ReadLetter",t)},m=function(t){return c("/communicate/SendLetter",t)},v=function(t){return a("/user/getFollowList",t)},b=function(t){return c("/user/CancelFollow",t)},y=function(t){return c("/user/postImage",t)},w=function(t){return c("/user/AddFavorite",t)},g=function(t){return a("/relationshipMap",t)},_=function(t){return a("/cooperateAuthor",t)},A=function(t){return c("/changePassword",t)},I=function(t){return a("/user/get_all_favo",t)},x=function(t){return c("/AdminLogin",t)},P=function(t){return c("/Identify",t)},E=function(t){return c("/user/DeleteFavorite",t)},M=function(t){return c("/user/DeletePaper",t)},C=function(t){return c("/user/move_paper",t)},S=function(t){return c("/user/FollowAuthor",t)},R=function(t){return a("/user/CheckFollow",t)},D=function(t){return c("/user/CancelFollow",t)},F=function(t){return a("/authorGetUser",t)},L=function(t){return a("/authorGetUser",t)},z=function(t){return c("/user/submitAppeal",t)},U=function(t){return a("/portal/email_yzm",t)},N=function(t){return a("/portal/confirm",t)},T=function(t){return a("/user/getAppealList",t)},$=function(t){return c("/user/handleAppeal",t)},H=function(t){return c("/portal/visitportal",t)},O=function(t){return a("/portal/getvisit",t)}},"2DRA":function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("7+uW"),i={name:"App",watch:{$route:function(t,n){"/search"===t.path&&0===this.$store.state.searchInput.length&&localStorage.searchInput&&0===localStorage.searchInput.length&&(this.$store.commit("setAdvancedSearchInput",[]),localStorage.removeItem("advancedSearchInput")),window.scrollTo(0,0)}}},o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view",{key:this.$route.path})],1)},staticRenderFns:[]};var u=e("VU/8")(i,o,!1,function(t){e("2DRA")},null,null).exports,a=e("/ocq"),c=(e("j7e0"),e("2CGT"),a.a.prototype.push);a.a.prototype.push=function(t){return c.call(this,t).catch(function(t){return t})},r.default.use(a.a);var s=[{path:"/",name:"Home",component:function(){return Promise.all([e.e(0),e.e(1)]).then(e.bind(null,"a8Ox"))}},{path:"/homepage",name:"homepage",component:function(){return Promise.all([e.e(0),e.e(1)]).then(e.bind(null,"a8Ox"))}},{path:"/about",name:"About",component:function(){return e.e(21).then(e.bind(null,"vu9I"))}},{path:"/login",name:"Login",component:function(){return Promise.all([e.e(0),e.e(18)]).then(e.bind(null,"D8b1"))}},{path:"/loginAdmin",name:"LoginAdmin",component:function(){return Promise.all([e.e(0),e.e(14)]).then(e.bind(null,"de8W"))}},{path:"/admin",name:"Admin",component:function(){return e.e(8).then(e.bind(null,"ZwLw"))},children:[{path:"adminHome",name:"AdminHome",component:function(){return e.e(15).then(e.bind(null,"ZET8"))}},{path:"applications",name:"Applications",component:function(){return Promise.all([e.e(0),e.e(13)]).then(e.bind(null,"SHy6"))}}]},{path:"/register",name:"Register",component:function(){return Promise.all([e.e(0),e.e(20)]).then(e.bind(null,"A+xV"))}},{path:"/questions",name:"Questions",component:function(){return e.e(11).then(e.bind(null,"oPGX"))}},{path:"/search",name:"search",component:function(){return Promise.all([e.e(0),e.e(2)]).then(e.bind(null,"7biW"))}},{path:"/article/:paper_id",name:"Article",redirect:"/article/:paper_id/overviews",component:function(){return e.e(0).then(e.bind(null,"Us0+"))},children:[{path:"comments",name:"Comments",component:function(){return e.e(5).then(e.bind(null,"RFHy"))}},{path:"overviews",name:"Overviews",component:function(){return Promise.all([e.e(0),e.e(6)]).then(e.bind(null,"Gn4X"))}},{path:"citations",name:"Citations",component:function(){return e.e(19).then(e.bind(null,"NAT6"))}},{path:"references",name:"References",component:function(){return Promise.all([e.e(0),e.e(9)]).then(e.bind(null,"tIL3"))}},{path:"stats",name:"Stats",component:function(){return e.e(16).then(e.bind(null,"mUXi"))}}]},{path:"/userHome",name:"userHome",component:function(){return Promise.all([e.e(0),e.e(3)]).then(e.bind(null,"KDTI"))}},{path:"/Institution",name:"Institution",component:function(){return Promise.all([e.e(0),e.e(12)]).then(e.bind(null,"yE7a"))}},{path:"/test",name:"test",component:function(){return new Promise(function(t){t()}).then(e.bind(null,"j7e0"))}},{path:"/wyhTest",name:"wyhRelationshipMapClickEventTest",component:function(){return e.e(17).then(e.bind(null,"ZJ3P"))}},{path:"/letter",name:"Letter",component:function(){return Promise.all([e.e(0),e.e(7)]).then(e.bind(null,"XACS"))}},{path:"/authorPage",name:"authorPage",component:function(){return Promise.all([e.e(0),e.e(4)]).then(e.bind(null,"6Dje"))}},{path:"/identification",name:"identification",component:function(){return Promise.all([e.e(0),e.e(10)]).then(e.bind(null,"Nxxn"))}}],l=new a.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:s}),h=l;l.beforeEach(function(t,n,e){e()});var f=e("zL8q"),d=e.n(f),p=(e("tvR6"),{render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"myheader"},[n("el-row",{staticStyle:{"margin-top":"10px"}},[n("el-col",{attrs:{span:2}},[n("div",{staticStyle:{color:"#ff751a"}},[this._v("网站名字")])]),this._v(" "),n("el-col",{attrs:{span:2,offset:18}},[n("el-button",{staticClass:"login"},[this._v("登录")])],1),this._v(" "),n("el-col",{attrs:{span:2,offset:0}},[n("el-button",{staticClass:"register"},[this._v("注册")])],1)],1)],1)},staticRenderFns:[]});var m=e("VU/8")(null,p,!1,function(t){e("m2am")},null,null).exports,v=e("Dd8w"),b=e.n(v),y={name:"cloudWork",props:{width:{type:Number,default:300},height:{type:Number,default:300},data:{type:Array,default:function(){return["一类","二类","三类","四类","五类","一类","二类","三类","四类","五类","一类"]}}},data:function(){return{color:["#2D4DB6","#04B67C"],contentEle:[],direction:"-1",speed:400,animateID:null}},created:function(){this.contentEle=this.data.map(function(){return{x:0,y:0,z:0,style:{}}})},mounted:function(){this.innit()},methods:{innit:function(){var t=(this.width-50)/2,n=(this.height-50)/2;this.contentEle=[];for(var e=0;e<this.data.length;e+=1){var r=(2*(e+1)-1)/this.data.length-1,i=Math.acos(r),o=i*Math.sqrt(this.data.length*Math.PI),u={x:t*Math.sin(i)*Math.cos(o),y:n*Math.sin(i)*Math.sin(o),z:t*Math.cos(i),style:{}};this.contentEle.push(u)}this.animate()},animate:function(){this.rotateX(),this.rotateY(),this.move(),this.animateID=window.requestAnimationFrame(this.animate)},rotateX:function(){var t=["-1","1"].includes(this.direction)?Math.PI/(1/0):Math.PI/(Number(this.direction)/2*Number(this.speed)),n=Math.cos(t),e=Math.sin(t);this.contentEle=this.contentEle.map(function(t){var r=t.y*n-t.z*e,i=t.z*n+t.y*e;return b()({},t,{y:r,z:i})})},rotateY:function(){var t=["-2","2"].includes(this.direction)?Math.PI/(1/0):Math.PI/(Number(this.direction)*Number(this.speed)),n=Math.cos(t),e=Math.sin(t);this.contentEle=this.contentEle.map(function(t){var r=t.x*n-t.z*e,i=t.z*n+t.x*e;return b()({},t,{x:r,z:i})})},move:function(){var t=this,n=this.width/2,e=this.height/2;this.contentEle=this.contentEle.map(function(r){var i=r.x,o=r.y,u=r.z,a=(t.width-50)/2,c=500/(500-u),s=(u+a)/(2*a),l="translate("+(i+n-15+"px")+", "+(o+e-15+"px")+") scale("+c+")";return{x:i,y:o,z:u,style:b()({},r.style,{opacity:s+.5,zIndex:parseInt(100*c,10),transform:l})}})},stop:function(){window.cancelAnimationFrame(this.animateID)},start:function(){this.animate()}}},w={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"wordCloud__tagBall",style:{width:this.width+"px",height:this.height+"px"},on:{mouseenter:t.stop,mouseleave:t.start}},t._l(t.data,function(n,r){return e("el-link",{key:r,staticClass:"wordCloud__tag",style:Object.assign({},{color:t.color[r%t.color.length]},t.contentEle[r].style)},[t._v(t._s(n))])}),1)])},staticRenderFns:[]};var g=e("VU/8")(y,w,!1,function(t){e("yRcw")},"data-v-5b877d5c",null).exports,_=(e("plSE"),e("XLwt")),A=e("mtWM"),I=e.n(A),x=e("aLYK"),P=e("NYxO");r.default.use(P.a);var E=new P.a.Store({state:{title:"",abstract:"",references:[],citation_by_year:[],searchInput:"",advancedSearchInput:[]},mutations:{setTitle:function(t,n){this.state.title=n},setAbstract:function(t,n){this.state.abstract=n},setReferences:function(t,n){this.state.references.push(n)},setCitation:function(t,n){this.state.citation_by_year.push(n)},setSearchInput:function(t,n){this.state.searchInput=n},setAdvancedSearchInput:function(t,n){this.state.advancedSearchInput=n}},actions:{},modules:{}}),M=e("Al7X"),C=e.n(M),S=(e("MJLE"),e("DOD7")),R=e.n(S);r.default.use(R.a),r.default.component("mycloud",g),r.default.component("myHeader",m),r.default.prototype.$http=I.a,r.default.prototype.$echarts=_,r.default.use(x.a,I.a),r.default.use(d.a),r.default.use(_),r.default.use(C.a),r.default.config.productionTip=!1,e("hKoQ").polyfill(),e("MU8w"),new r.default({el:"#app",store:E,router:h,components:{App:u},template:"<App/>"})},j7e0:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"box"},[n("div",{staticClass:"search-box"},[n("input",{staticClass:"search-left",attrs:{type:"text",placeholder:"请输入要搜索的内容"}}),n("input",{staticClass:"search-right",attrs:{type:"button",value:"搜 索",icon:"el-icon-search"}})])])}]};var i=e("VU/8")({data:function(){return{}}},r,!1,function(t){e("n+Ml")},"data-v-9f5af92e",null);n.default=i.exports},m2am:function(t,n){},"n+Ml":function(t,n){},plSE:function(t,n){},tvR6:function(t,n){},yRcw:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.381f41ef21d2d9b1cdaf.js.map