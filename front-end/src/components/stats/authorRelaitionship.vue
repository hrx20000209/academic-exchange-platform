<template>
  <div id="citeAndPublish">
    <div id="topHead">
      <div id="leftCharacter">专家关系网络</div>
    </div>
    <div id="mainPane">
      <div style="width:700px;height:500px" ref="chart"></div>
    </div>

  </div>
</template>

<script>
import {getdata} from "../../request/api";

export default {
  name: "authorRelationship",
  data() {
    return {
      datas: [{
        name: "jitendra malik",
        draggable: true,
        category: 0,
        symbolSize: 50,
        label:{
          show:true
        },
        state:0
      },
        {
          name: 'automatic symbolic traffic scene analysis using belief networks',
          category: 1,
          num: "5EF39403",
          symbolSize: 20,
          state:1,
          // itemStyle: {
          //         normal: {
          //           color: '#000000'
          //         }
          // }
        },
        {
          name: '潘海霞',
          category: 1,

        },
        {
          name: '梁灏然',
          category: 1,

        },
        {
          name: '黄润希',
          category: 1,

        },
        {
          name: '另一篇论文',
          category: 2,
          symbolSize: 20

        },
        {
          name: '张洁',
          category: 2,

        },
        {
          name: '黄文浩',
          category: 2,

        },
        {
          name: '想名字好难',
          category: 2,

        },
        {
          name: 'AAAA',
          category: 2,

        }
      ],
      linkmes: [
        {
          source: "jitendra malik",
          target: "automatic symbolic traffic scene analysis using belief networks",
          state:4

        },
        {
          source: '谭火彬',
          target: '另一篇论文',
          state:4
        },
        {
          source: '一篇论文',
          target: '潘海霞',
          state:4
        },
        {
          source: '一篇论文',
          target: '梁灏然',
          state:4
        },
        {
          source: '一篇论文',
          target: '黄润希',
          state:4
        },
        {
          source: '谭火彬',
          target: '另一篇论文',
          state:4
        },
        {
          source: '另一篇论文',
          target: 'AAAA',
          state:4
        },
        {
          source: '另一篇论文',
          target: '张洁',
          state:4
        },
        {
          source: '另一篇论文',
          target: '黄文浩',
          value: 'DNA',
          state:4
        }, {
          source: '另一篇论文',
          target: '想名字好难',
          state:4

        }, {
          source: '另一篇论文',
    target:'黄润希',
          state:4
  }
      ]
    }
  },
  methods: {
    getdataSource() {
      getdata({
        author_id: this.$route.query.id
      }).then(res => {
        console.log(res)
        this.datas = res.datas
        this.linkmes = res.linkmes
        this.initCharts();
      })
    },
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let relaChart = this.$echarts.init(this.$refs.chart);
      // console.log(this.$props.data)
      // console.log(this.$props.linkm)
      // 绘制图表
      relaChart.setOption({
        backgroundColor: 'transparent',
        tooltip: {},
        animationDurationUpdate: 15000,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            symbolSize:20,
            type: 'graph',
            layout: 'force',
            force: {
                // gravity: 0  //引力
                edgeLength: 100, //默认距离
                repulsion: 200 //斥力
            },
            focusNodeAdjacency: true,
            roam: true,
            label: {
              show: false
            },
            data: this.datas,
            links: this.linkmes,
            // data:this.$props.data,
            // links: this.$props.linkm,
            lineStyle: {
              color: "source",
                width: 1,
            },
            categories: [
              // {name: '0'},
              // {name: '1'},
              // {name: '2'}
            ],
            itemStyle: {
              borderColor: 'black',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(1,1,1,0.5)',
              color: 'rgb(37,86,165)'
              //               borderColor: "#fff",
              // borderWidth: 1,
              // shadowBlur: 10,
              // shadowColor: "rgba(0, 0, 0, 0.3)",
            },
            emphasis: {
              lineStyle:{
                width: 10,
              }
            }
          }
        ]
      })

      relaChart.on('click', (param) => {
        console.log(param)
        let state = param.data.state
        let id = param.data.num
        if(state == 2){
          this.$router.push({
            path: '/authorPage',
            query: {
             id: id
            }
          }
        )
        this.$router.go(0)
        }
        // this.$router.push({
        //     path: '/wyhTest',
        //     query: {
        //       name: param.name
        //     }
        //   }
        // )
      })

    },
  },
  //一加载页面就调用
  mounted() {
    this.getdataSource()

  }
}
</script>

<style scoped>
#citeAndPublish {
  background-color: white;
box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  border-radius: 2px;
  margin-top: 30px;
}

#leftCharacter {
  width: 400px;
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
  margin-left: 20px;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #525252;
}

#topHead {
  display: flex;
  justify-content: flex-start;
}

#mainPane {
  border-top: 1px solid #dedede;
  padding: 10px 20px 15px 20px;
  display: flex;
  justify-content: center;
}
</style>
