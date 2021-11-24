<template>
  <div id="citeAndPublish">
    <div id="topHead">
      <div id="leftCharacter">年度数据</div>
    </div>
    <div id="mainPane">
      <div style="width:600px;height:300px" ref="chart"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "citeAndPublish",
  methods: {
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        // title: {text: '在Vue中使用echarts'},
        tooltip: {},
        legend: {
          data: ["发表", "被引"],
          orient: 'vertical',
          x:'right',
          y:'center',
        },
        xAxis: {
          data: ["2016", "2017", "2018", "2019", "2020", "2021"]
        },
        yAxis: [{
          type: "value",
          name: "发表",
        },
          {
            type: "value",
          name: "被引",
          }],
        series: [{
          name: '发表',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },{
          name: '被引',
          type: 'bar',
          data: [13, 2, 6, 10, 15, 33]
        }]
      });
    }
  },
  //一加载页面就调用
  mounted() {
    this.initCharts();
  }
}
</script>

<style scoped>
#citeAndPublish{
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
#mainPane{
  border-top: 1px solid #dedede;
  padding: 10px 20px 15px 20px;
  display: flex;
  justify-content: center;
}
</style>
