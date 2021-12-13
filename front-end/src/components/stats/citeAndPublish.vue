<template>
  <div id="citeAndPublish">
    <div id="topHead">
      <div id="leftCharacter">年度数据</div>
    </div>
    <div id="mainPane">
      <div style="width:450px;height:300px" ref="chart"></div>
    </div>

  </div>
</template>

<script>

import ESApi from "../../api/elastic search";

export default {
  name: "citeAndPublish",
  data() {
    return {
      x_data: [],
      pubData: [],
      citeData: [],
      user: [],
    }
  },
  methods: {
    getAuthorInfo() {
      let id = this.$route.query.id
      ESApi.getAuthorInfo(id).then(response => {
        console.log(response);
        this.user = response.data.hits.hits[0]._source;
        console.log(this.user)
        // this.research = this.ELres.pubs;
        this.prepareJson();
        this.initCharts();
      })
    },
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
          left: 'center',
          bottom: 'bottom',
        },
        xAxis: {
          data: this.x_data
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
          data: this.pubData
        }, {
          name: '被引',
          type: 'bar',
          data: this.citeData
        }]
      });
    },
    prepareJson() {
      for (var i = 0; i < this.user.year_pubs.length; i++) {
        if (!this.x_data.includes(this.user.year_pubs[i].year)) {
          this.x_data.push(this.user.year_pubs[i].year);
        }
      }
      for (var i = 0; i < this.user.year_citation.length; i++) {
        if (!this.x_data.includes(this.user.year_citation[i].year)) {
          this.x_data.push(this.user.year_citation[i].year);
        }
      }
      this.x_data.sort();
      console.log(this.x_data);
      this.pubData = new Array(this.x_data.length).fill(0);
      this.citeData = new Array(this.x_data.length).fill(0);
      for (var i = 0; i < this.user.year_pubs.length; i++) {
        var pos = this.x_data.indexOf(this.user.year_pubs[i].year);
        this.pubData[pos] = this.user.year_pubs[i].cnt;
      }
      console.log(this.pubData)
      for (var i = 0; i < this.user.year_citation.length; i++) {
        var pos = this.x_data.indexOf(this.user.year_citation[i].year);
        this.citeData[pos] = this.user.year_citation[i].cnt;
      }
      console.log(this.citeData)
    }
  },
  //一加载页面就调用
  mounted() {
    this.getAuthorInfo()

  }
}
</script>

<style scoped>
#citeAndPublish {
  background-color: white;
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  border-radius: 2px;
  margin-top: 20px;
}

#leftCharacter {
  width: 400px;
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
  margin-left: 20px;
  font-weight: bold;
  font-size: 16px;
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
