<template>
  <div id="citeAndPublish">
    <div id="topHead">
      <div id="leftCharacter">专家关系网络</div>
    </div>
    <div id="mainPane">
      <div style="width:600px;height:500px" ref="chart"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "authorRelationship",
  data() {
    return {
      datas: [{
        name: '谭火彬',
        draggable: true,
        category: 0,
        symbolSize: 50,
        label: {
          show: true
        }
      },
        {
          name: '一篇论文',
          category: 1,
          symbolSize: 20
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
          source: '谭火彬',
          target: '一篇论文'

        },
        {
          source: '谭火彬',
          target: '另一篇论文',
        },
        {
          source: '一篇论文',
          target: '潘海霞',
        },
        {
          source: '一篇论文',
          target: '梁灏然',
        },
        {
          source: '一篇论文',
          target: '黄润希',
        },
        {
          source: '谭火彬',
          target: '另一篇论文',
        },
        {
          source: '另一篇论文',
          target: 'AAAA',
        },
        {
          source: '另一篇论文',
          target: '张洁',
        },
        {
          source: '另一篇论文',
          target: '黄文浩',
          value: 'DNA',
        }, {
          source: '另一篇论文',
          target: '想名字好难'

        }, {
          source: '另一篇论文',
          target: '黄润希',
        }
      ]
    }
  },
  methods: {
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let relaChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      relaChart.setOption({
        backgroundColor: 'transparent',
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            symbolSize: 10,
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 1000,
              edgeLength: 100
            },
            animationDuration: 2800,
            focusNodeAdjacency: true,
            roam: true,
            label: {
              show: false
            },
            data: this.datas,
            links: this.linkmes,
            lineStyle: {
              color: "source",
              width: 1,
              curveness: 0.3
            },
            categories: [
              {name: '0'},
              {name: '1'},
              {name: '2'}
            ],
            itemStyle: {
              borderColor: 'black',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(1,1,1,0.5)',
              color: 'rgb(37,86,165)'
            },
            emphasis: {
              lineStyle: {
                width: 10,
              }
            }
          }
        ]
      })

      relaChart.on('click', (param) => {
        this.$router.push({
            path: '/wyhTest',
            query: {
              name: param.name
            }
          }
        )
      })

    },
  },
  //一加载页面就调用
  mounted() {
    this.initCharts();
  }
}
</script>

<style scoped>
#citeAndPublish {
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-top: 10px;
}

#leftCharacter {
  width: 400px;
  padding: 10px;
  font-family: "Microsoft YaHe";
  margin-left: 20px;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e8e8e;
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
