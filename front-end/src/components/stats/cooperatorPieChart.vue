<template>
  <div id="cooperatorPieChart">
    <div id="topHead">
      <div id="leftCharacter" style="display: flex">
                <div style="margin-top: 1px">
        <svg style="margin-right: 5px" t="1639838013587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15509" width="20" height="20"><path d="M624.2 337.9c-23.6-18.3-52.1-28.6-82.3-29.6l-20.4-192.4c5.2-0.2 10.3-0.4 15.4-0.4 46 0 90.6 9.1 132.5 27.2 34.4 14.8 65.6 35 93.2 60.1L624.2 337.9z" fill="#FFBD5C" p-id="15510"></path><path d="M543.7 135.6c40.9 0.8 80.5 9.4 117.8 25.5 25.8 11.1 49.7 25.4 71.5 42.7L622 312.2c-6.6-4.1-13.5-7.6-20.7-10.7-13.2-5.7-27-9.6-41.2-11.6l-16.4-154.3m-6.8-40.1c-12.7 0-25.2 0.7-37.5 2L524 328.9c4.3-0.4 8.6-0.7 13-0.7 34.5 0 65.6 14.2 87.9 37l166.5-162.5C726.8 136.6 636.6 95.5 536.9 95.5z" fill="#4C6070" p-id="15511"></path><path d="M535.9 873.5c-27 0-53.7-3.2-79.7-9.5l57.1-185c7.4 1.2 15 1.8 22.6 1.8 31.1 0 60.7-9.8 85.5-28.4 18.6-13.9 33.7-32.5 43.6-53.4l184.9 57.4c-10.1 26.8-23.6 52.1-40.3 75.6-20.3 28.6-44.8 53.7-72.9 74.7-58.3 43.7-127.7 66.8-200.8 66.8z" fill="#FFBD5C" p-id="15512"></path><path d="M674.8 623L823 669c-8.2 18-18.1 35.2-29.7 51.4-19.1 26.9-42.2 50.5-68.6 70.3-26.7 20-56.2 35.5-87.6 46.1-32.5 11-66.6 16.6-101.3 16.6-18.2 0-36.3-1.5-54.1-4.6l45.8-148.3c2.8 0.1 5.5 0.2 8.3 0.2 35.5 0 69.2-11.2 97.5-32.4 13.6-10.2 25.5-22.4 35.3-36.2 2.2-2.9 4.3-6 6.2-9.1m-21.6-48.6c-15.5 50-62.2 86.4-117.3 86.4-12.6 0-24.8-1.9-36.2-5.4l-68.6 222.4c33.1 10.2 68.4 15.7 104.9 15.7 159.6 0 294.7-105.2 339.6-250l-222.4-69.1z" fill="#4C6070" p-id="15513"></path><path d="M771.9 308c41.2 54.5 63.6 120.6 63.6 190 0 18.4-1.6 36.7-4.7 54.6l-148.2-46c0.1-2.9 0.2-5.7 0.2-8.6 0-29.1-7.6-57.1-21.9-81.6l111-108.4m2.5-58.3L607.9 412.2c21.6 22.1 34.9 52.4 34.9 85.8 0 12.7-1.9 24.9-5.5 36.4l222.3 69c10.3-33.3 15.9-68.7 15.9-105.5 0-96.5-38.5-184.1-101.1-248.2z" fill="#4C6070" p-id="15514"></path><path d="M439.2 190.9l16.4 154.3c-24.4 9-46.5 23.8-64.2 43.5-27.2 30-42.1 68.8-42.1 109.3 0 35.5 11.2 69.3 32.5 97.6 10.2 13.6 22.4 25.5 36.3 35.3 3 2.1 6.1 4.2 9.3 6.1l-45.8 148.3c-18-8.2-35.3-18.1-51.6-29.7-26.9-19.1-50.7-42.2-70.5-68.6-20-26.7-35.6-56.2-46.3-87.7-11-32.5-16.6-66.7-16.6-101.4 0-78.5 29-153.7 81.6-211.8 43.1-47.6 99.3-80.6 161-95.2m35.3-46.4c-178.7 18.7-318 169.9-318 353.5 0 159.8 105.5 295 250.6 339.8l68.6-222.4c-50.1-15.5-86.6-62.2-86.6-117.4 0-63.4 48.1-115.7 109.8-122.1l-24.4-231.4z" fill="#4C6070" p-id="15515"></path></svg>
                </div>

        主要合作学者</div>
    </div>
    <div id="mainPane">
      <div style="width:450px;height:300px" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import {changeViewTime, getPieData} from "../../request/api";
import ESApi from "../../api/elastic search";

export default {
  name: "cooperatorPieChart",
  data() {
    return {
      data: [{value: 16, name: '潘海霞'},
        {value: 12, name: '宋友'},
        {value: 3, name: '黄坚'},
        {value: 10, name: '杨云晴'},
        {value: 4, name: '邵兵'}],
      author: [],
    }
  },
  methods: {
    getAuthorInfo() {
      let id= this.$route.query.id
      ESApi.getAuthorInfo(id).then(response => {
        console.log(response);
        this.author = response.data.hits.hits[0]._source;
        console.log(this.user)
        this.getData()
      })
    },
    getData() {
      getPieData({
        author_id: this.author.id
      }).then(res => {
        console.log(res)
        this.data = res.data
        this.initCharts();
      })
    },
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>合作次数 : {c}",
        },
        // title: {text: '在Vue中使用echarts'},
        series: [
          {
            name: '合作学者',
            type: 'pie',
            radius: '55%',
            data: this.data,
            roseType: 'angle',
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(219,219,219,0.5)'
              }
            }
          }
        ]
      });
      myChart.on('click', (param) => {
        console.log(param)
         ESApi.getAuthorInfo(param.data.id).then(response => {
            console.log(response);
            if (response.data.hits.hits.length > 0) {
                    changeViewTime({
        author_id: param.data.id
      }).then(res => {
        console.log(res)
      })
              this.$router.push({
                path: '/authorPage',
                query: {
                  id: param.data.id
                }
              })
              this.$router.go(0)
            }

          })
      })
    }
  },
  //一加载页面就调用
  mounted() {
    this.getAuthorInfo()
  }
}
</script>

<style scoped>
#cooperatorPieChart {
  background-color: white;
  box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  border-radius: 2px;
  margin-top: 20px;
  margin-left: 55px;
}

#leftCharacter {
  width: 400px;
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
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
