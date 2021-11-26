<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <div id="pie_chart"></div>
    </el-col>
  </el-row>
</template>

<script>
  const echarts = require('echarts/lib/echarts')
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.buildPie()
    },
    methods: {
      buildPie() {
        let pie = echarts.init(document.getElementById('pie_chart'))
        let data = this.buildData()
        let option = {
          backgroundColor: '#ddd',
          title: {
            text: '销售量统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}  {c} ({d}%)"
          },
          xAxis:{
            data:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis:{},
          series: [{
            name: '星期',
            type: 'bar',
            radius: '55%',
            center: ['40%', '50%'],
            data: data.values,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

        pie.setOption(option)
        pie.on('click', function(params) {
          console.log(params.name, params.value, params.percent, params.seriesName, params.seriesType)
        })
      },
      buildData() {
        let labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        let values = []
        for (let i = 0; i < labels.length; i++) {
          values.push({
            value: parseInt(Math.random() * 10000),
            name: labels[i],
            color: this.randomColor()
          })
        }

        return {
          labels,
          values
        }
      },
      randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        return color;
      }
    }
  }
</script>

<style scoped>
  #pie_chart {
    width: 800px;
    height: 800px;
  }
</style>
