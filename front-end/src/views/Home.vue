<template>
    <div>
      <div style="margin-left: 100px;width: 500px; height: 500px" id="chart4"></div>
    </div>
</template>

<script>
  const echarts = require('echarts/lib/echarts')
export default {

  data() {
    return {
      oneData: {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "name": "低压车间表计82"
                                }
                            ],
                            "name": "低压关口表计1"
                        }
                    ],
                    "name": "高压子表计122"
                },
                {
                    "children": [
                        {
                            "children": [],
                            "name": "低压关口表计101"
                        }
                    ],
                    "name": "高压子表计141"
                }
            ],
            "name": "高压总表计102"
        }
    }
  },
  mounted() {
    this.buildPie()
  },
  methods:{
    buildPie(){
      let pie = echarts.init(document.getElementById('chart4'))
      let option={
        tooltip: {    //提示框组件
            trigger: 'item',    //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
            triggerOn: 'mousemove'    //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
        },
        series: [    //系列列表
            {
                type: 'tree',    //树形结构

                data: [this.oneData],    //上面从flare.json中得到的数据

                top: '1%',       //距离上
                left: '7%',      //左
                bottom: '1%',    //下
                right: '20%',    //右的距离

                symbolSize: 7,   //标记的大小，就是那个小圆圈，默认7

                label: {         //每个节点所对应的标签的样式
                    normal: {
                        position: 'left',       //标签的位置
                        verticalAlign: 'middle',//文字垂直对齐方式，默认自动。可选：top，middle，bottom
                        align: 'right',         //文字水平对齐方式，默认自动。可选：top，center，bottom
                        fontSize: 9             //标签文字大小
                    }
                },

                leaves: {    //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },

                expandAndCollapse: true,    //子树折叠和展开的交互，默认打开
                animationDuration: 550,     //初始动画的时长，支持回调函数,默认1000
                animationDurationUpdate: 750//数据更新动画的时长，默认300
            }
        ]
      }
      pie.setOption(option)
    }

  }
}
</script>



<style  scoped>

 .box{
     text-align:center;
    //  font-size: 0;
 }
 .search-box{
     margin:0 auto;
     width: 750px;
 }
.search-left{
    text-indent: 20px;
     width:80%;
    height:50px;
    border:rgb(137, 233, 217) 1px solid;
    // float:left;
    margin-top:20px;
    border-bottom-left-radius:25px;
    border-top-left-radius:25px;
    outline:none;
    // text-align:20px ;
}
.search-right{
    width:19%;
    height:50px;
    background:rgb(137, 233, 217);
    color: #fff;
    border:none;
    margin-top:20px;
    border-bottom-right-radius:25px;
    border-top-right-radius:25px;
    outline:none;
}


</style>

