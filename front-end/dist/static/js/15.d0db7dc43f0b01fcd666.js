webpackJsonp([15],{WSXd:function(e,t){},ZJ3P:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"citeAndPublish"}},[this._m(0),this._v(" "),t("div",{attrs:{id:"mainPane"}},[t("div",{ref:"chart",staticStyle:{width:"600px",height:"500px"}})])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"topHead"}},[t("div",{attrs:{id:"leftCharacter"}},[this._v("专家关系网络")])])}]};var o=a("VU/8")({name:"authorRelationship",data:function(){return{datas:[{name:"谭火彬",draggable:!0,category:0,symbolSize:50,label:{show:!0}},{name:"一篇论文",category:1,symbolSize:20},{name:"潘海霞",category:1},{name:"梁灏然",category:1},{name:"黄润希",category:1},{name:"另一篇论文",category:2,symbolSize:20},{name:"张洁",category:2},{name:"黄文浩",category:2},{name:"想名字好难",category:2},{name:"AAAA",category:2}],linkmes:[{source:"谭火彬",target:"一篇论文"},{source:"谭火彬",target:"另一篇论文"},{source:"一篇论文",target:"潘海霞"},{source:"一篇论文",target:"梁灏然"},{source:"一篇论文",target:"黄润希"},{source:"谭火彬",target:"另一篇论文"},{source:"另一篇论文",target:"AAAA"},{source:"另一篇论文",target:"张洁"},{source:"另一篇论文",target:"黄文浩",value:"DNA"},{source:"另一篇论文",target:"想名字好难"},{source:"另一篇论文",target:"黄润希"}]}},methods:{initCharts:function(){var e=this,t=this.$echarts.init(this.$refs.chart);t.setOption({backgroundColor:"transparent",tooltip:{},animationDurationUpdate:1500,animationEasingUpdate:"quinticInOut",series:[{symbolSize:10,type:"graph",layout:"force",force:{repulsion:1e3,edgeLength:100},focusNodeAdjacency:!0,roam:!0,label:{show:!1},data:this.datas,links:this.linkmes,lineStyle:{color:"source",width:1,curveness:.3},categories:[{name:"0"},{name:"1"},{name:"2"}],itemStyle:{borderColor:"black",borderWidth:1,shadowBlur:10,shadowColor:"rgba(1,1,1,0.5)",color:"rgb(37,86,165)"},emphasis:{lineStyle:{width:10}}}]}),t.on("click",function(t){e.$router.push({path:"/wyhTest",query:{name:t.name}})})}},mounted:function(){this.initCharts()}},r,!1,function(e){a("WSXd")},"data-v-be0444f2",null);t.default=o.exports}});
//# sourceMappingURL=15.d0db7dc43f0b01fcd666.js.map