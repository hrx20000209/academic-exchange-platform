<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div style="height: 100%;width: 100%;overflow: hidden;margin-bottom: 5px">
      <div style="float: left;margin-bottom: 10px" class="bigFrame">
        <div class="upFrame">
          <div class="upFrameContent">摘要</div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            <div v-if="this.$store.state.abstract === ''">
              <div class="notAbstract">
                <div style="height:30px"></div>
                <div style="text-align:center">
                  <img src="@/assets/无摘要.png">
                </div>
                <div style="text-align:center">
                  无摘要
                </div>
              </div>
            </div>
            <div v-else>
              {{ this.$store.state.abstract }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20px">
    </div>
    <div class="textFrame">
      <div style="height: 20px"></div>
      <div class="stats">
        <div class="statsFrame">
          <div class="upFrame">
            <div class="upFrameContent">引 用 量</div>
          </div>
          <div class="downFrame">
            <div class="statsFrameContent">
              <!-- 这里放表格 -->
              <div id="chart1"></div>
            </div>
          </div>
        </div>
        <div style="width:4%;float:left;height:10px"></div>
        <div class="statsFrame">
          <div class="upFrame">
            <div class="upFrameContent">相 关 文 献</div>
          </div>
          <div class="downFrame">
            <div class="statsFrameContent">
              <!-- 这里放表格 -->
              <div id="chart2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tree" style="height: 600px;width: 90%">
        <div class="upFrame">
          <div class="upFrameContent">引用文献</div>
        </div>
        <div class="downFrame">
          <div class="statsFrameContent">
            <!-- 这里放表格 -->
            <div v-if="this.f === 1">
              <div id="chart4" style="height: 500px"></div>
            </div>
            <div v-else>
              <div class="notAb">
                <div style="height:200px"></div>
                <div style="text-align:center">
                  <img src="@/assets/无参考文献.png">
                </div>
                <div style="text-align:center">
                  无引用文献
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>
  </div>
</template>

<script>
import ESApi from '../../api/elastic search'
import AC from '../article/Article.vue'

const echarts = require('echarts/lib/echarts')
export default {
  name: "Overviews",
  data() {
    return {
      id: this.$route.params.paper_id,
      title: "",
      authors: [],
      abstract: "",
      reference: [],
      venue: {},
      url: "",
      citation_by_year: [],
      flag: 1,
      relatedArticle: [],
      references:[],
      year:'',
      Ydata:[],
      oneData: {
        "children": [

        ],
        "name": "高压总表计102",
        "id":'1'
      },
      da:{},
      f:1
    }
  },
  mounted() {
    console.log('333')
    this.getRe(this.id)
    this.search(this.id)
    console.log(this.title)
    // this.buildPie2()
    // this.a()
  },
  methods: {
    search(paper_id) {
      console.log('111')
      ESApi.getMsg(paper_id).then(response => {
        console.log(response.data)
        this.length = response.data.hits.total.value
        console.log(this.length)
        this.$store.state.abstract = ''
        this.$store.state.references = []
        this.reference = []
        this.citation_by_year = []
        for (var i = 0; i < this.length; i++) {
          // if (response.data.hits.hits[i]._source.id === paper_id) {
          let article = response.data.hits.hits[0]
          this.title = article._source.title
          console.log(this.title)
          // this.abstracts = article._source.abstract
          this.$store.commit('setTitle', article._source.title)
          console.log(this.$store.state.title)

          this.year = article._source.year
          if (article._source.url === undefined) {
            this.flagLoad = false
            console.log('aaaa')
          } else {
            this.urlArticle = article._source.url
            console.log(this.urlArticle)
          }
          if (article._source.abstract === undefined) {
            this.flag = 0
            console.log('flag')
          } else {
            this.$store.commit('setAbstract', article._source.abstract)
            console.log(this.$store.state.abstract)
          }
          for (var k = 0; k < article._source.citation_by_year.length; k++) {
            // console.log(article._source.citation_by_year[k])
            // this.$store.commit('setCitation', article._source.citation_by_year[k])
            this.citation_by_year.push(article._source.citation_by_year[k])
            // console.log(this.$store.state.citation_by_year[k])
          }
          console.log('333333333333333333333333333333333333333333333333333333333')
          console.log(this.citation_by_year)
          console.log(this.$store.state.citation_by_year)
          for (var l = 0; l < article._source.reference.length; l++) {
            console.log(article._source.reference[l])
            this.reference.push(article._source.reference[l])
            this.$store.commit('setReferences', article._source.reference[l])
            console.log(this.$store.state.references[l])
          }
          for (var j = 0; j < article._source.authors.length; j++) {
            // this.authors[j] = article._source.authors[j]
            this.authors.push(article._source.authors[j])
          }
          console.log(this.authors)
          this.searchRelated();
          // this.buildPie();
          this.searchRe();
          this.citation();
          // this.letRe()
          // }
        }
        // }
      })
    },
    searchRe(){
      this.$store.state.refer = []
      console.log('进入')
      for(var j = 0; j < this.reference.length;j++){
        console.log('1.1')
        console.log(this.reference[j])
        ESApi.getRe(this.reference[j]).then(response =>{
          console.log('进入es搜索')
          console.log(response.data.hits.hits[0])
          console.log(response.data.hits.total.value)
          console.log('1.2')
          let article = response.data.hits.hits[0]
          this.references.push(article._source)
          this.$store.commit('setRefer',article._source)
          da.push({children:[]},{name:this.title})
          console.log(this.$store.state.refer)
          console.log(this.$store.state.refer.length)
        })
      }
    },
    searchRelated() {
      console.log('related');
      ESApi.getTitle(this.$store.state.title).then(response => {
        console.log(response.data)
        this.length = response.data.hits.total.value
        // Vue.set(this.relatedArticle, 1, response.data.hits.hits[1].)//给列表对象新增属性
        for (var i = 0; i < this.length - 1; i++) {
          let re = response.data.hits.hits[i + 1]
          this.relatedArticle[i] = re
          console.log(this.relatedArticle[i])
          console.log(this.relatedArticle[i]._source.title)
          console.log(this.relatedArticle[i]._score)
        }
        // this.buildPie();
      })
      setTimeout(() => {
        this.buildPie()//娃娃消失
      }, 400);
    },
    a(){
      if(this.oneData.children.length === 0){
        console.log('324324444444442333333333333132')
      }
    },
    getRe(id){
      this.axios({
        method:"get",
        // url:"http://139.9.132.83:8000/user/IsFavoritePaper",
        url:"http://139.9.132.83:8000/getReferences?paper_id=" + id,
        data:{
          paper_id: id
        }
      })
        .then(response=>{
          console.log(response.data)
          this.da = response.data.data
          console.log(this.da)
          console.log(this.oneData)
          if(this.da.children.length === 0){
            this.f = 0
          }else {
            this.buildPie2();
          }
        })
      // if(this.f === 1){
      //   setTimeout(() => {
      //     this.buildPie2()//娃娃消失
      //   }, 2000);
      // }

    },
    buildPie2(){
      const that = this;
      let pie = echarts.init(document.getElementById('chart4'))
      let option={
        tooltip: {    //提示框组件
          trigger: 'item',    //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
          triggerOn: 'mousemove'    //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
        },
        series: [    //系列列表
          {
            type: 'tree',    //树形结构
            data: [this.da],    //上面从flare.json中得到的数据
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
      pie.on('click', function(params) {
        console.log(params.data.id)
        that.jumpPaperRe(params.data.id)
      })
    },
    citation(){
      console.log('111111111')
      if(this.citation_by_year.length === 0){
        this.Ydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        console.log('等于0')
      }
      else{
        this.Ydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var j = 0; j < this.citation_by_year.length; j++) {
          console.log('sjia')
          for (var k = 1992; k < 2016; k++) {
            // console.log(this.$store.state.citation_by_year[0].year)
            // console.log('awe')
            // console.log(this.$store.state.citation_by_year[j].year)
            if (this.citation_by_year[j].year === k + '') {
              // console.log(this.$store.state.citation_by_year[j].year)
              // console.log(k+1992)
              this.Ydata[k - 1992] = this.citation_by_year[j].cnt
              console.log(this.citation_by_year[j].year+','+this.citation_by_year[j].cnt)
              console.log(this.Ydata[k-1992])
              console.log('right')
            }
          }
        }
      }
    },
    buildPie() {
      const that = this
      console.log('build')
      console.log(this.relatedArticle)
      let pie1 = echarts.init(document.getElementById('chart1'))
      let pie2 = echarts.init(document.getElementById('chart2'))
      var pieData = [];
      // var Ydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      console.log('re')
      console.log(this.citation_by_year.length)
      for (var i = 0; i < this.relatedArticle.length - 1; i++) {
        console.log(this.relatedArticle[i]._source.title)
        console.log(this.relatedArticle[i]._score)
        pieData.push({value: this.relatedArticle[i]._score, name: this.relatedArticle[i]._source.title,id: this.relatedArticle[i]._source.id})
      }
      // console.log('jixu')
      // console.log(this.$store.state.citation_by_year.length)
      // console.log(this.$store.state.citation_by_year[0].year)


      console.log('这里是ydata')
      console.log(this.Ydata)
      const color1 = this.randomColor()
      let option1 = {
        // backgroundColor: '#FFF',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}  {c} ({d}%)"
        },
        legend: {
          data: [
            {
              name: 'Citation'
            },
          ]
        },
        xAxis: {
          data: [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
        },
        yAxis: [
          {
            name: 'Citation',
            axisLine: {
              lineStyle: {
                color: color1,
                width: 1,
              }
            }
          },
        ],
        series: [
          {
            name: 'Citation',
            type: 'bar',
            data: this.Ydata,
            itemStyle: {
              color: color1,
            }
          },
        ]
      }
      let option2 = {
        title: {
          text: '相关文献',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}  {c} ({d}%)"
        },
        series: [
          {
            name: '成员被引用量',
            type: 'pie',
            radius: ['30%', '70%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: this.addColor(pieData)
          }
        ]
      }
      pie1.setOption(option1)
      pie2.setOption(option2)

      pie2.on('click', function(params) {
        console.log(params.data.id)
        that.jumpPaperRe(params.data.id)
      })
    },
    jumpPaperRe(id){
      let router = '/article/'+ id + '/overviews'
      this.$router.push(router)
      this.$router.go(0);
    },
    addColor(list) {
      // console.log(list)
      let res = list
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        // console.log(item)
        item['itemStyle'] = {color: this.randomColor()}
      }
      return res;
    },
    randomColor() {
      let r = Math.floor(Math.random() * 120);
      let g = Math.floor(Math.random() * 120);
      let b = Math.floor(Math.random() * 256);
      let color = `rgb(${r},${g},${b})`
      // let color= '#' + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
  }
}
</script>

<style scoped>
#chart1 {
  /*width: 80%;*/
  height: 500px;

}

#chart2 {
  /*width: 80%;*/
  height: 500px;

}
.tree{
  margin-top: 20px;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.articleType {
  width: 60px;
  background: lightblue;
  border-radius: 2px;
  text-align: center;
}

.grey {
  background: rgba(221, 221, 221, 0.3);
  /*height: 400px;*/
  /*height: 1000px;*/
  /*width: 100%;*/
}

.bigFrame {
  /*height: 300px;*/
  width: 66%;
  background: white;
  border-radius: 2px;
  /*margin: auto;*/
  margin-left: 10%;
  /*margin-bottom: 30px;*/
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
}

.upFrame {
  height: 50px;
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
}

.upFrameContent {
  padding: 12px;
  margin-left: 15px;
  font-size: 18px;
}

.downFrame {
  border-bottom: lightgrey solid 1px;
}

.downFrameContent {
  padding: 30px;
}

.textFrame {
  width: 80%;
  margin-left: 10%;
}

.textFrameContent {
  padding: 20px;
  margin: auto;
  width: 90%;

}

.textFrameContentButton {
  margin: auto;
  text-align: center;
}

.textFrameContentMain {
  text-align: right;
  color: darkgray;
  margin-bottom: 20px;
}

.textBigFrame {
  width: 100%;
  background: white;
  border-radius: 2px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.textUpFrameContent {
  /*padding: 15px;*/
  /*margin-left: 15px;*/
  background: rgba(221, 221, 221, 0.3);
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
  height: 50px;
}

/*.statsFrame{*/
/*  width: 80%;*/
/*  margin: auto;*/
/*  background: white;*/
/*  !*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);*!*/
/*  margin-bottom: 10px;*/
/*}*/
.statsContent {
  float: left;
  width: 21.5%;
  /*border: lightgrey solid 1px;*/
  height: 80px;
  padding: 10px;
}

.statsFrameContent {
  padding: 25px;
}

.rightFrame {
  width: 25%;
  float: right;
  margin-right: 10%;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.rightPartContent {
  font-size: 13px;
  margin-bottom: 2px;
}

.notAbstract {
  width: 100%;
  height: 200px;
  border: lightgray solid 1px;
}
.notAb {
  width: 100%;
  height: 500px;
  border: lightgray solid 1px;
}

.stats {
  /*width: 80%;*/
  /*margin-left: 10%;*/
  overflow: hidden;
}

.statsContent {
  float: left;
  width: 21.5%;
  /*border: lightgrey solid 1px;*/
  height: 80px;
  padding: 10px;
}

.statsFrameContent {
  padding: 25px;
}

.statsFrame {
  width: 46%;
  margin: 10px auto;
  margin-left: 10px;
  float: left;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  /*margin-bottom: 10px;*/
}
</style>
