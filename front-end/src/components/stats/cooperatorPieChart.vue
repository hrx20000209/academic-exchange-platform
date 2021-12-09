<template>
  <div id="cooperatorPieChart">
    <div id="topHead">
      <div id="leftCharacter">主要合作学者</div>
    </div>
    <div id="mainPane">
       <div style="width:600px;height:300px" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import {getPieData} from "../../request/api";

export default {
  name: "cooperatorPieChart",
  props:['author'],
  data(){
    return{
      data:[{value:16, name:'潘海霞'},
                {value:12, name:'宋友'},
                {value:3, name:'黄坚'},
                {value:10, name:'杨云晴'},
                {value:4, name:'邵兵'}]
    }
  },
  methods: {
    getData(){
      getPieData({
        author_id:this.$props.author.id
      }).then(res=>{
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
        tooltip:{
          trigger: "item",
          formatter: "{b} <br/>合作次数 : {c}",
        },
        // title: {text: '在Vue中使用echarts'},
        series : [
        {
            name: '合作学者',
            type: 'pie',
            radius: '55%',
            data:this.data,
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
        this.$router.push({
            path: '/authorPage',
            query: {
             id: param.data.id
            }
          }
        )
        this.$router.go(0)
      })
    }
  },
  //一加载页面就调用
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>
#cooperatorPieChart{
  background-color: white;
box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  border-radius: 2px;
  margin-top: 20px;
}
#leftCharacter{
  width: 400px;
  padding: 10px;
  font-family: "Microsoft YaHe";
  margin-left: 20px;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
  color: #8e8e8e;
}
#topHead{
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
