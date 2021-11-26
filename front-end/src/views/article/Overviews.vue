<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div style="height: 100%;width: 100%;overflow: hidden">
      <div style="float: left" class="bigFrame">
        <div class="upFrame">
          <div class="upFrameContent">摘要</div>
        </div>
        <div class="downFrame" @click="buildPie">
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
              {{this.$store.state.abstract}}
            </div>
          </div>
        </div>
      </div>
<!--      <div class="rightFrame">-->
<!--        <div class="upFrame">-->
<!--          <div class="upFrameContent">Related research</div>-->
<!--        </div>-->
<!--        <div class="downFrame">-->
<!--          <div class="downFrameContent">-->
<!--            <div style="font-size: 18px;margin-bottom: 5px">Big Data Big Data and the Attention Economy</div>-->
<!--            <div style="margin-bottom: 5px">-->
<!--              <a class="articleType">Article</a>-->
<!--              Full-text available-->
<!--              <div style="color: darkgrey">-->
<!--                December 2017-->
<!--              </div>-->
<!--            </div>-->
<!--            <div style="font-size: 16px;color: blue">-->
<!--              Download-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="upFrame" style="background: rgba(221,221,221,0.2);">-->
<!--          <div style="text-align: center;line-height:50px">-->
<!--            view more-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div style="height: 30px">
    </div>
    <div class="textFrame">
        <div style="height: 20px"></div>
        <div class="stats">
          <div class="statsFrame">
            <div class="upFrame">
              <div class="upFrameContent">Stats overview</div>
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
              <div class="upFrameContent">Stats overview</div>
            </div>
            <div class="downFrame">
              <div class="statsFrameContent">
                <!-- 这里放表格 -->
                <div id="chart2"></div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: 20px"></div>
<!--      <el-tabs type="border-card">-->
<!--        <el-tab-pane label="全文">-->
<!--          <div class="textFrameContent">-->
<!--            &lt;!&ndash;一部分信息&ndash;&gt;-->
<!--            <div class="textFrameContentMain">-->
<!--              Content uploaded by Frederike Zufall<br>-->
<!--              Author content<br>-->
<!--              Content may be subject to copyright.<br>-->
<!--            </div>-->
<!--            &lt;!&ndash;全文&ndash;&gt;-->
<!--            <div class="textFrameContentMessage">-->
<!--              <div class="textBigFrame">-->
<!--                <div class="textUpFrameContent">-->
<!--                  &lt;!&ndash;          <div style="height: 15px"></div>&ndash;&gt;-->
<!--                  <div class="upFrameContent">PAGE1</div>-->
<!--                </div>-->
<!--                <div class="downFrame">-->
<!--                  <div class="downFrameContent">-->
<!--                    The primary scope of application of the General Data Protection Regulation—Regulation (UE) 2016/679 (GDPR)—is ‘personal data’; ‘data’ that is not personal data can be freely processed within the legal framework of the Regulation (UE) 2018/1807. Although the European data protection framework recognises these two categories of data—‘personal data’ and ‘non-personal data’—reality reveals ‘a lot in between’ the opposite endpoints. There are accordingly considerable complications in drawing the boundaries between personal and non-personal data. In this article, we will review some of the main issues related to the usual classification of data as personal, anonymous, pseudonymous, de-identified data, and suggest that the most realistic way to approach the different problems is to recognise the dynamic nature of the data.-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            &lt;!&ndash;按钮&ndash;&gt;-->
<!--            <div class="textFrameContentButton">-->
<!--              <el-button type="primary">访问全文</el-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
<!--      </el-tabs>-->
    </div>
  </div>
</template>

<script>
import ESApi from '../../api/elastic search'
import ESTitle from '../../api/es title'
import AC from '../article/Article.vue'
const echarts = require('echarts/lib/echarts')
export default {
  name: "Overviews",
  data(){
    return{
        id: "",
        title: "",
        authors: [],
        abstract: "",
        reference:[],
        venue: {},
        url: "",
        citation_by_year:{},
        flag: 1,
      relatedArticle:[],
      AuthorCitation:[
        {
          name:'a1',
          value:'100'
        },
        {
          name:'a2',
          value:'160'
        },
        {
          name:'a3',
          value:'123'
        },
        {
          name:'a4',
          value:'100'
        },
        {
          name:'a5',
          value:'160'
        },
        {
          name:'a6',
          value:'123'
        },
        {
          name:'a7',
          value:'100'
        },
        {
          name:'a8',
          value:'160'
        },
        {
          name:'a9',
          value:'123'
        },
      ],
    }
  },
  mounted() {
    // this.searchAb();
    console.log('333')
    this.searchRelated();
    // this.buildPie();
  },
  methods: {
    // searchAb() {
    //   console.log('111')
    //   ESApi.getMsg('808411C2').then(response =>{
    //     console.log(response.data)
    //     this.length = response.data.hits.total.value
    //     console.log(this.length)
    //     for(var i = 0; i < this.length; i++){
    //       let article = response.data.hits.hits[i]
    //       console.log(this.abstract)
    //       if(article._source.abstract === undefined){
    //         this.flag = 0
    //         console.log('flag')
    //       }else{
    //         this.abstract = article._source.abstract
    //       }
    //     }
    //   })
    // },
    searchRelated(){
      console.log('related');
      ESTitle.getTitle(this.$store.state.title).then(response =>{
        console.log(response.data)
        this.length = response.data.hits.total.value
        // Vue.set(this.relatedArticle, 1, response.data.hits.hits[1].)//给列表对象新增属性
        for(var i = 0; i < this.length - 1; i++){
          let re = response.data.hits.hits[i+1]
          // this.relatedArticle[i-1].name = re._source.title
          // this.relatedArticle[i-1].value = re._score
          // console.log(this.relatedArticle[i-1].name)
          // console.log(this.relatedArticle[i-1].value)
          this.relatedArticle[i] = re
          console.log(this.relatedArticle[i])
          console.log(this.relatedArticle[i]._source.title)
          console.log(this.relatedArticle[i]._score)
        }
      })
    },
    buildPie(){
      console.log('build')
      console.log(this.relatedArticle)
      let pie1 = echarts.init(document.getElementById('chart1'))
      let pie2 = echarts.init(document.getElementById('chart2'))
      var pieData=[];
      var Ydata = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      console.log('re')
      for(var i=0;i<this.relatedArticle.length-1;i++){
        console.log(this.relatedArticle[i]._source.title)
        console.log(this.relatedArticle[i]._score)
        pieData.push({value:this.relatedArticle[i]._score,name:this.relatedArticle[i]._source.title})
      }
      console.log('jixu')
      console.log(this.$store.state.citation_by_year.length)
      console.log(this.$store.state.citation_by_year[0].year)
      for(var j = 0; j < this.$store.state.citation_by_year.length; j++){
        console.log('sjia')
        for(var k = 1992; k < 2016; k++){
          // console.log(this.$store.state.citation_by_year[0].year)
          console.log('awe')
          console.log(this.$store.state.citation_by_year[j].year)
          if(this.$store.state.citation_by_year[j].year === k+''){
            console.log(this.$store.state.citation_by_year[j].year)
            // console.log(k+1992)
            Ydata[k-1992] = this.$store.state.citation_by_year[j].cnt
            console.log('right')
          }
          else{
            Ydata[k-1992] = 0;
          }
        }
      }
      console.log(Ydata)
      const color1 = this.randomColor()
      let option1={
        // backgroundColor: '#FFF',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}  {c} ({d}%)"
        },
        legend:{
          data:[
            {
              name:'Citation'
            },
          ]
        },
        xAxis:{
          data:[1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
        },
        yAxis: [
          {
            name: 'Citation',
            axisLine:{
              lineStyle:{
                color:color1,
                width:1,
              }
            }
          },
        ],
        series: [
          {
            name:'Citation',
            type: 'bar',
            data: Ydata,
            itemStyle:{
              color:color1,
            }
          },
        ]
      }
      let option2={
        title: {
          text: '相关文献',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}  {c} ({d}%)"
        },
        series:[
          {
            name:'成员被引用量',
            type: 'pie',
            radius: ['30%', '70%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data:this.addColor(pieData)
          }
        ]
      }
      pie1.setOption(option1)
      pie2.setOption(option2)
    },
    addColor(list) {
      // console.log(list)
      let res = list
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        // console.log(item)
        item['itemStyle']={color:this.randomColor()}
      }
      return res;
    },
    randomColor() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = `rgb(${r},${g},${b})`
      // let color= '#' + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
  }
}
</script>

<style scoped>
#chart1{
  /*width: 80%;*/
  height: 500px;
}
#chart2{
  /*width: 80%;*/
  height: 500px;
}
.articleType{
  width: 60px;
  background: lightblue;
  border-radius: 2px;
  text-align: center;
}
.grey{
  background: rgba(221,221,221,0.3);
  /*height: 400px;*/
  /*height: 1000px;*/
  /*width: 100%;*/
}
.bigFrame{
  /*height: 300px;*/
  width: 50%;
  background: white;
  border-radius: 2px;
  /*margin: auto;*/
  margin-left: 10%;
  /*margin-bottom: 30px;*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.upFrame{
  height: 50px;
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
}
.upFrameContent{
  padding: 15px;
  margin-left: 15px;
}
.downFrame{
  border-bottom: lightgrey solid 1px;
}
.downFrameContent{
  padding: 30px;
}
.textFrame{
  width: 80%;
  margin-left: 10%;
}
.textFrameContent{
  padding: 20px;
  margin: auto;
  width: 90%;

}
.textFrameContentButton{
  margin: auto;
  text-align: center;
}
.textFrameContentMain{
  text-align: right;
  color: darkgray;
  margin-bottom: 20px;
}
.textBigFrame{
  width: 100%;
  background: white;
  border-radius: 2px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.textUpFrameContent{
  /*padding: 15px;*/
  /*margin-left: 15px;*/
  background: rgba(221,221,221,0.3);
  border-bottom: rgba(0, 0, 0, .12) solid 1px;
  height: 50px;
}
.statsFrame{
  width: 80%;
  margin: auto;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.statsContent{
  float: left;
  width: 21.5%;
  /*border: lightgrey solid 1px;*/
  height: 80px;
  padding: 10px;
}
.statsFrameContent{
  padding: 25px;
}
.rightFrame{
  width: 25%;
  float: right;
  margin-right: 10%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.rightPartContent{
  font-size: 13px;
  margin-bottom: 2px;
}
.notAbstract{
  width: 100%;
  height: 200px;
  border: lightgray solid 1px;
}
.stats{
  /*width: 80%;*/
  /*margin-left: 10%;*/
  overflow: hidden;
}
.statsContent{
  float: left;
  width: 21.5%;
  /*border: lightgrey solid 1px;*/
  height: 80px;
  padding: 10px;
}
.statsFrameContent{
  padding: 25px;
}
.statsFrame{
  width: 48%;
  margin: auto;
  float: left;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
