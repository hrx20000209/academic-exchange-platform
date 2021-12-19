<template>
  <div id="citeAndPublish">
    <div id="topHead">
      <div id="leftCharacter" style="display: flex">
        <div style="margin-top: 1px">
        <svg style="margin-right: 5px" t="1639837894766" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14535" width="20" height="20"><path d="M169.1 519.1h95.2v266.5h-95.2z" fill="#FFF061" p-id="14536"></path><path d="M274.3 795.6H159.1V509.1h115.2v286.5z m-95.2-20h75.2V529.1h-75.2v246.5z" fill="#6D5346" p-id="14537"></path><path d="M359.5 309.7h95.2v475.9h-95.2z" fill="#FFF061" p-id="14538"></path><path d="M464.6 795.6H349.5V299.7h115.2v495.9z m-95.1-20h75.2V319.7h-75.2v455.9z" fill="#6D5346" p-id="14539"></path><path d="M549.8 404.9H645v380.7h-95.2z" fill="#FFF061" p-id="14540"></path><path d="M655 795.6H539.8V394.9H655v400.7z m-95.2-20H635V414.9h-75.2v360.7z" fill="#6D5346" p-id="14541"></path><path d="M740.2 195.5h76.1v590.1h-76.1z" fill="#FFF061" p-id="14542"></path><path d="M826.3 795.6h-96.1V185.5h96.1v610.1z m-76.1-20h56.1V205.5h-56.1v570.1z" fill="#6D5346" p-id="14543"></path><path d="M854.4 785.6H131.1" fill="#FFF061" p-id="14544"></path><path d="M131.1 775.6h723.3v20H131.1z" fill="#6D5346" p-id="14545"></path></svg></div>

        年度数据</div>
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
