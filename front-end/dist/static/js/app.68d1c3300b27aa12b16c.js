webpackJsonp([23],{"0TZj":function(t,e){},"6OnH":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),a={name:"App",watch:{$route:function(t,e){window.scrollTo(0,0)}}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")(a,o,!1,function(t){n("rUS2")},null,null).exports,s=n("/ocq");n("j7e0");i.default.use(s.a);var l=[{path:"/",name:"Home",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"a8Ox"))}},{path:"/homepage",name:"homepage",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"a8Ox"))}},{path:"/about",name:"About",component:function(){return n.e(21).then(n.bind(null,"vu9I"))}},{path:"/login",name:"Login",component:function(){return Promise.all([n.e(0),n.e(13)]).then(n.bind(null,"D8b1"))}},{path:"/loginAdmin",name:"LoginAdmin",component:function(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,"de8W"))}},{path:"/admin",name:"Admin",component:function(){return n.e(9).then(n.bind(null,"ZwLw"))},children:[{path:"adminHome",name:"AdminHome",component:function(){return n.e(20).then(n.bind(null,"ZET8"))}},{path:"applications",name:"Applications",component:function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,"SHy6"))}}]},{path:"/register",name:"Register",component:function(){return Promise.all([n.e(0),n.e(18)]).then(n.bind(null,"A+xV"))}},{path:"/questions",name:"Questions",component:function(){return n.e(11).then(n.bind(null,"oPGX"))}},{path:"/search",name:"search",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"7biW"))}},{path:"/article/:paper_id",name:"Article",redirect:"/article/:paper_id/overviews",component:function(){return n.e(0).then(n.bind(null,"Us0+"))},children:[{path:"comments",name:"Comments",component:function(){return n.e(5).then(n.bind(null,"RFHy"))}},{path:"overviews",name:"Overviews",component:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"Gn4X"))}},{path:"citations",name:"Citations",component:function(){return n.e(19).then(n.bind(null,"NAT6"))}},{path:"references",name:"References",component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"tIL3"))}},{path:"stats",name:"Stats",component:function(){return n.e(17).then(n.bind(null,"mUXi"))}}]},{path:"/userHome",name:"userHome",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"KDTI"))}},{path:"/Institution",name:"Institution",component:function(){return Promise.all([n.e(0),n.e(12)]).then(n.bind(null,"yE7a"))}},{path:"/test",name:"test",component:function(){return new Promise(function(t){t()}).then(n.bind(null,"j7e0"))}},{path:"/wyhTest",name:"wyhRelationshipMapClickEventTest",component:function(){return n.e(15).then(n.bind(null,"ZJ3P"))}},{path:"/letter",name:"Letter",component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"XACS"))}},{path:"/authorPage",name:"authorPage",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"6Dje"))}},{path:"/identification",name:"identification",component:function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"Nxxn"))}}],u=new s.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:l}),c=u;u.beforeEach(function(t,e,n){n()});var h=n("zL8q"),m=n.n(h),p=(n("tvR6"),{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"myheader"},[e("el-row",{staticStyle:{"margin-top":"10px"}},[e("el-col",{attrs:{span:2}},[e("div",{staticStyle:{color:"#ff751a"}},[this._v("网站名字")])]),this._v(" "),e("el-col",{attrs:{span:2,offset:18}},[e("el-button",{staticClass:"login"},[this._v("登录")])],1),this._v(" "),e("el-col",{attrs:{span:2,offset:0}},[e("el-button",{staticClass:"register"},[this._v("注册")])],1)],1)],1)},staticRenderFns:[]});var d=n("VU/8")(null,p,!1,function(t){n("0TZj")},null,null).exports,f=n("Dd8w"),v=n.n(f),b={name:"cloudWork",props:{width:{type:Number,default:300},height:{type:Number,default:300},data:{type:Array,default:function(){return["一类","二类","三类","四类","五类","一类","二类","三类","四类","五类","一类"]}}},data:function(){return{color:["#2D4DB6","#04B67C"],contentEle:[],direction:"-1",speed:400,animateID:null}},created:function(){this.contentEle=this.data.map(function(){return{x:0,y:0,z:0,style:{}}})},mounted:function(){this.innit()},methods:{innit:function(){var t=(this.width-50)/2,e=(this.height-50)/2;this.contentEle=[];for(var n=0;n<this.data.length;n+=1){var i=(2*(n+1)-1)/this.data.length-1,a=Math.acos(i),o=a*Math.sqrt(this.data.length*Math.PI),r={x:t*Math.sin(a)*Math.cos(o),y:e*Math.sin(a)*Math.sin(o),z:t*Math.cos(a),style:{}};this.contentEle.push(r)}this.animate()},animate:function(){this.rotateX(),this.rotateY(),this.move(),this.animateID=window.requestAnimationFrame(this.animate)},rotateX:function(){var t=["-1","1"].includes(this.direction)?Math.PI/(1/0):Math.PI/(Number(this.direction)/2*Number(this.speed)),e=Math.cos(t),n=Math.sin(t);this.contentEle=this.contentEle.map(function(t){var i=t.y*e-t.z*n,a=t.z*e+t.y*n;return v()({},t,{y:i,z:a})})},rotateY:function(){var t=["-2","2"].includes(this.direction)?Math.PI/(1/0):Math.PI/(Number(this.direction)*Number(this.speed)),e=Math.cos(t),n=Math.sin(t);this.contentEle=this.contentEle.map(function(t){var i=t.x*e-t.z*n,a=t.z*e+t.x*n;return v()({},t,{x:i,z:a})})},move:function(){var t=this,e=this.width/2,n=this.height/2;this.contentEle=this.contentEle.map(function(i){var a=i.x,o=i.y,r=i.z,s=(t.width-50)/2,l=500/(500-r),u=(r+s)/(2*s),c="translate("+(a+e-15+"px")+", "+(o+n-15+"px")+") scale("+l+")";return{x:a,y:o,z:r,style:v()({},i.style,{opacity:u+.5,zIndex:parseInt(100*l,10),transform:c})}})},stop:function(){window.cancelAnimationFrame(this.animateID)},start:function(){this.animate()}}},y={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"wordCloud__tagBall",style:{width:this.width+"px",height:this.height+"px"},on:{mouseenter:t.stop,mouseleave:t.start}},t._l(t.data,function(e,i){return n("el-link",{key:i,staticClass:"wordCloud__tag",style:Object.assign({},{color:t.color[i%t.color.length]},t.contentEle[i].style)},[t._v(t._s(e))])}),1)])},staticRenderFns:[]};var _=n("VU/8")(b,y,!1,function(t){n("6OnH")},"data-v-0993b431",null).exports,w=(n("plSE"),n("XLwt")),E=n("mtWM"),g=n.n(E),x=n("aLYK"),P=n("NYxO");i.default.use(P.a);var M=new P.a.Store({state:{title:"",abstract:"",references:[],citation_by_year:[],searchInput:""},mutations:{setTitle:function(t,e){this.state.title=e},setAbstract:function(t,e){this.state.abstract=e},setReferences:function(t,e){this.state.references.push(e)},setCitation:function(t,e){this.state.citation_by_year.push(e)},setSearchInput:function(t,e){this.state.searchInput=e}},actions:{},modules:{}}),A=n("Al7X"),I=n.n(A),C=(n("MJLE"),n("DOD7")),N=n.n(C);i.default.use(N.a),i.default.component("mycloud",_),i.default.component("myHeader",d),i.default.prototype.$http=g.a,i.default.prototype.$echarts=w,i.default.use(x.a,g.a),i.default.use(m.a),i.default.use(w),i.default.use(I.a),i.default.config.productionTip=!1,n("hKoQ").polyfill(),n("MU8w"),new i.default({el:"#app",store:M,router:c,components:{App:r},template:"<App/>"})},j7e0:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"box"},[e("div",{staticClass:"search-box"},[e("input",{staticClass:"search-left",attrs:{type:"text",placeholder:"请输入要搜索的内容"}}),e("input",{staticClass:"search-right",attrs:{type:"button",value:"搜 索",icon:"el-icon-search"}})])])}]};var a=n("VU/8")({data:function(){return{}}},i,!1,function(t){n("v6aE")},"data-v-22125e49",null);e.default=a.exports},plSE:function(t,e){},rUS2:function(t,e){},tvR6:function(t,e){},v6aE:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.68d1c3300b27aa12b16c.js.map