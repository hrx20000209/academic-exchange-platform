<template>
  <div>
    <el-container style="display: flex; justify-content: center">
      <!--<el-header>
      </el-header>-->
      <el-main>
        <el-col>
          <el-row class="IName">
            <el-col>
              <el-row class="Iname_font">
                {{this.InstitutionName}}
              </el-row>
              <el-row style="margin-top: 18px; margin-left: 20px;">
                <el-row>
                  <el-col :span="6">
                   <i class="el-icon-user" style="color: #6E6E6E">成员总数： <a style="color: #00BFFF"> {{this.members}}</a> 人</i>
                  </el-col>
                  <el-col :span="6">
                   <i class="el-icon-collection-tag" style="color: #6E6E6E">论文引用总次数： <a style="color: #00BFFF"> {{this.citeTime}}</a> 次</i>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <i class="el-icon-star-on" style="color: #6E6E6E"> 总发布论文数: <a style="color: #00BFFF">{{this.RG_score}}</a> 篇</i>
                  </el-col>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="statistics">
            <el-row>
              <div style="
              font-family: siyuan;
              font-weight: bold;
              font-size: 25px;
              text-align: center;
              margin-bottom: 40px;
              margin-top: 20px;
              ">
                数据统计
              </div>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="2">
                <div id="chart1"></div>
              </el-col>
              <el-col :span="10" :offset="1">
                <div id="chart2"></div>
              </el-col>
            </el-row>
            <el-row style="margin-top: 25px; margin-bottom: 40px">
              <el-col :span="10" :offset="2">
                <div id="chart3"></div>
              </el-col>
              <el-col :span="10" :offset="1">
                <div id="chart4"></div>
              </el-col>
            </el-row>
          </el-row>
          <el-row class="authors">
            <div style="display: flex; flex-direction: column">
              <div style="
              font-family: siyuan;
              font-weight: bold;
              font-size: 25px;
              text-align: center;
              margin-top: 20px;
              height: 50px;
              ">
                成员列表
              </div>
              <div style="display: flex; justify-content: center;margin-bottom: 10px">
                <a style="font-family: Georgia; font-size: 20px; color:#2E9AFE">{{this.members}}</a> <a style="font-family: siyuan; font-size: 13px; color:#848484;margin-left: 5px;">名成员</a>
              </div>
              <div style="display: flex; flex-direction: column">
                <div style="display: flex; justify-content: center">
                  <div style="display: flex; flex-direction: column; width: 800px;">
                    <div v-for="(item1, index1) in authors.slice((currentPage_author - 1) * pagesize_author, currentPage_author * pagesize_author)" :key="index1" style="margin-top: 10px">
                      <div style="display: flex; justify-content: space-around">
                        <el-tooltip  v-for="(item2, index2) in item1" :key="index2" placement="top" effect="light">
                          <div slot="content">姓名：{{item2.name}}<br/>被引次数：{{item2.cite}}<br/>发表文章数：{{item2.pubs}}</div>
                          <div style="display: flex; flex-direction: column;cursor: pointer" @click="jump2authors(item2.id)">
                            <div style="display: flex; justify-content: center">
                              <el-avatar>
                                {{item2.pic}}
                              </el-avatar>
                            </div>
                            <div style="display: flex; justify-content: center; flex-wrap:wrap">
                              <div style="font-family: Gabriola; font-size: 16px">
                                {{item2.name}}
                              </div>
                            </div>
                          </div>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: center">
                  <el-pagination
                  small
                  layout="prev, pager, next"
                  :total="authors.length"
                  @current-change="handleCurrentChange_author"
                  :current-page="currentPage_author"
                  :page-size="pagesize_author"
                  style="margin-top: 30px"
                  class="greyPage"
                />
                </div>
              </div>
            </div>
          </el-row>
          <el-row class="papers">
            <el-row>
              <div style="
              font-family: siyuan;
              font-weight: bold;
              font-size: 25px;
              text-align: center;
              margin-bottom: 10px;
              margin-top: 20px;
              ">
                论文概览
              </div>
            </el-row>
            <el-row class="paperFather">
              <div v-for="(item, index) in papers.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                   :key="index"
                    style="font-family: Georgia;margin-top: 25px; margin-left: 20px;"
              >
                <div style="background-color: #FFF;
                            box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
                            padding: 15px;
                  "
                @click="jump2papers(item.id)"
                >
                  <el-row>
                  <el-col :span="1">
                    <div class="xuhao">{{index+1}}</div>
                  </el-col>
                  <el-col :span="18">
                    <el-row style="margin-top: 5px" class="paper_title" >
                      {{item.title}}
                    </el-row>
                    <!--<el-row class="paper_author">
                      {{item.author}}
                    </el-row>
                    <el-row class="paper_publication">
                      {{item.publication}}
                    </el-row>-->
                  </el-col>
                  <el-col :span="4">
                    <div class="cites">被引次数：{{item.cites}}</div>
                  </el-col>
                  </el-row>
                </div>
              </div>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="papers.length"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                align="center"
                style="margin-top: 30px; margin-bottom: 20px"
              />
            </el-row>
          </el-row>
        </el-col>
      </el-main>
    </el-container>
    <el-button @click="test">test</el-button>
  </div>
</template>

<script>
  const echarts = require('echarts/lib/echarts')
  import ESApi from '../api/elastic search'
    export default {
        name: "Institution",
        data(){
          return {
            InstitutionName:'',
            members:0,
            RG_score:0,
            citeTime:0,
            AuthorPapers:[],
            AuthorCitation:[],
            paperCitation:[],
            papers:[],
            authors:[],
            currentPage: 1,
            pagesize: 7,
            currentPage_author: 1,
            pagesize_author: 3,
            years:[],
            y_cites:[],
            y_pub:[],
          }
        },
        mounted() {
          let id = this.$route.params.id
          this.test()
          // console.log('mounted:',this.years)
          // this.buildPie1()
        },
        methods:{
          buildPie1(that){
            let pie1 = echarts.init(document.getElementById('chart1'))
            let pie2 = echarts.init(document.getElementById('chart2'))
            let pie3 = echarts.init(document.getElementById('chart3'))
            let pie4 = echarts.init(document.getElementById('chart4'))
            const color1 = this.randomColor()
            const color2 = this.randomColor()
            // console.log(this.y_cites)
            // console.log(this.y_pub)
            let option1={
              backgroundColor: '#FFF',
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}年   {c}篇"
              },
              legend:{
                data:[
                  {
                    name:'Citation'
                  },
                  {
                    name:'Publication'
                  }
                ]
              },
              xAxis:{
                data:this.years,
                //axisLabel: {
						    //    interval:3
					      //},
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
                {
                  name: 'Publication',
                  axisLine:{
                    lineStyle: {
                      color: color2
                    }
                  }
                  // ...
                }
              ],
              series: [
                  {
                    name:'Citation',
                    type: 'bar',
                    data: this.y_cites,
                    itemStyle:{
                      color:color1,
                    }
                  },
                  {
                    name:'Publication',
                    type: 'bar',
                    data: this.y_pub,
                    itemStyle:{
                      color:color2,
                    }
                  }
                ]
            }
            // const pieColors1 = this.getColorList(this.AuthorPapers)
            let option2={
              // backgroundColor: '#FFF',
              title: {
                text: '成员发表论文量',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>姓名：{b}<br/>文章数量：{c} ({d}%)"
              },
              series: [
                {
                  name:'成员发表论文量',
                  radius: ['55%', '70'],
                  label: {
                    alignTo: 'labelLine',
                    textStyle:{
                      color: ''
                    }
                  },
                  labelLine:{
                      // length: 1,
                      // length2: 1,
                  },
                  minShowLabelAngle:4,
                  type: 'pie',
                  data: this.addColor(this.AuthorPapers),
                }
              ]
            }
            // let pieColors2 = this.getColorList(this.AuthorCitation)
            let option3={
              title: {
                text: '成员被引用次数',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>姓名：{b}<br/>被引用量：{c} ({d}%)"
              },
              series:[
                {
                  name:'成员被引次数',
                  radius: ['55%', '70'],
                  label: {
                    alignTo: 'labelLine',
                    textStyle:{
                      color: ''
                    }
                  },
                  labelLine:{
                      // length: 1,
                      // length2: 1,
                  },
                  minShowLabelAngle:4,
                  type: 'pie',
                  data: this.addColor(this.AuthorCitation),
                }
              ]
            }
            let option4={
              // backgroundColor: '#FFF',
              title: {
                text: '论文被引用量',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>题目：{b}<br/>引用量：{c} ({d}%)"
              },
              series: [
                {
                  name:'论文被引用量',
                  radius: ['55%', '70'],
                  label: {
                    alignTo: 'labelLine',
                    textStyle:{
                      color: ''
                    }
                  },
                  labelLine:{
                      // length: 1,
                      // length2: 1,
                  },
                  minShowLabelAngle:4,
                  type: 'pie',
                  data: this.addColor(this.paperCitation),
                }

              ]
            }
            pie1.setOption(option1)
            pie2.setOption(option2)
            pie3.setOption(option3)
            pie4.setOption(option4)
            pie2.on('click', function(params) {
              console.log(params.data.id, params.data.name)
              that.jump2authors(params.data.id)
            })
            pie3.on('click', function(params) {
              console.log(params.data.id, params.data.name)
              that.jump2authors(params.data.id)
            })
            pie4.on('click', function(params) {
              console.log(params.data.id, params.data.name)
            })
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
          handleCurrentChange(val) {
            this.currentPage = val;
          },
          handleCurrentChange_author(val) {
            this.currentPage_author = val;
          },
          test(id) {
            let that=this
            ESApi.getInstitutionMsg(id).then(
              res=>{
                let info = res.data.hits.hits[0]._source
                console.log('info is ', info)
                this.fillCites(info)
                this.fillPaperCites(info)
                this.fillAuthorCites(info)
                this.fillAuthorPubs(info)
                this.fillAuthors(info)
                this.fillPapers(info)
                this.fillAttribute(info)
                this.buildPie1(that)
              }
            )
          },
          jump2authors(id){
            console.log('author id is', id)
            this.$router.push({path: `/userHome/${id}`,})
          },
          jump2papers(id) {
            console.log('paper id is', id)
          },
          getPic(name, id) {
            //TODO: input id output pic or bool
            let lastname = name.split(' ')
            return lastname[lastname.length-1]
          },
          fillAttribute(info){
            this.members = info.authors.length
            this.citeTime = info.n_citation
            this.RG_score = info.n_pubs
            this.InstitutionName = info.name
          },
          fillPapers(info){
            for (let i=0; i<info.pubs.length; i++) {
              let item = info.pubs[i]
              let tmp = {}
              tmp['id'] =  item.id
              tmp['title'] = item.title
              tmp['cites'] = item.n_citation
              this.papers.push(tmp)
            }
          },
          fillAuthors(info){
            let row = []
            let j = 0
            for (let i=0; i<info.authors.length; i++){
              let item = info.authors[i]
              let tmp = {}
              tmp['name'] = item.name
              tmp['pic'] = this.getPic(item.name, item.id)
              tmp['id'] = item.id
              tmp['pubs'] = item.n_pubs
              tmp['cite'] = item.n_citation
              row.push(tmp)
              j++
              if (j === 8){
                this.authors.push(row)
                row = []
                j = 0
              }
            }
            if (j !== 0) {
              this.authors.push(row)
            }
          },
          fillAuthorCites(info){
            for (let i=0; i<info.authors.length; i++) {
              let items = info.authors[i]
              let tmp = {}
              tmp['name'] = items.name
              tmp['value'] = items.n_citation
              tmp['id'] = items.id
              this.AuthorCitation.push(tmp)
            }
          },
          fillAuthorPubs(info){
            for (let i=0; i<info.authors.length; i++) {
              let items = info.authors[i]
              let tmp = {}
              tmp['name'] = items.name
              tmp['value'] = items.n_pubs
              tmp['id'] = items.id
              this.AuthorPapers.push(tmp)
            }
          },
          fillPaperCites(info){
            // console.log('pubs', info.pubs)
            for (let i=0; i<info.pubs.length; i++) {
              let items = info.pubs[i]
              let tmp = {}
              tmp['name'] = items.title
              tmp['value'] = items.n_citation
              tmp['id'] = items.id
              this.paperCitation.push(tmp)
            }
          },
          fillCites(info){
            let max=0;
            let min=9999;
            let tmp;
            let cites = {}
            let pubs = {}
            // console.log('cites info', info.year_citation)
            for (let i = 0; i < info.year_citation.length; i++) {
              let items = info.year_citation[i]
              tmp = parseInt(items['year'])
              cites[items['year']]=items['cnt']
              if (tmp>max)
                max=tmp
              if (tmp<min)
                min=tmp
            }
            for (let i = 0; i < info.year_pubs.length; i++) {
              let items = info.year_pubs[i]
              tmp = parseInt(items['year'])
              pubs[items['year']]=items['cnt']
              if (tmp>max)
                max=tmp
              if (tmp<min)
                min=tmp
            }
            //console.log(max, min)
            for(let i=min, j=0; i<=max; i++, j++) {
              this.$data.years.push(i)
              let year = ''+i
              if (cites.hasOwnProperty(year))
                this.y_cites[j] = cites[year]
              else
                this.y_cites[j] = 0

              if (pubs.hasOwnProperty(year))
                this.y_pub[j] = pubs[year]
              else
                this.y_pub[j] = 0
            }
            // console.log(JSON.parse(JSON.stringify(this.years)))
            // console.log(this.y_cites)
            // console.log(this.y_pub)

          },
          authorClick() {
            console.log('author click!')
          }
      }
    }
</script>

<style scoped>
.IName {
  background-color: #FAFAFA;
  min-height: 100px;
  margin-top: -20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.Iname_font {
  background-image:  linear-gradient(#e66465,#9198e5,#A9F5BC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  margin-top: 25px;
  margin-left: 20px;
}
.statistics {
  background-color: #FAFAFA;
  min-height: 600px;
  margin-top: 30px;
  max-width: 1050px;
  margin-left: 20px;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04)

}
#chart1 {
  background-color: white;
  border:5px white;
  border-radius: 30px;
  padding: 15px;
  width: 350px;
  height: 350px;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}
#chart2 {
  background-color: white;
  border:5px white;
  border-radius: 30px;
  padding: 15px;
  width: 350px;
  height: 350px;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}
#chart3 {
  background-color: white;
  border:5px white;
  border-radius: 30px;
  padding: 15px;
  width: 350px;
  height: 350px;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}
#chart4 {
  background-color: white;
  border:5px white;
  border-radius: 30px;
  padding: 15px;
  width: 350px;
  height: 350px;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}
.papers {
  background-color: #FAFAFA;
  height: auto;
  max-width: 1050px;
  margin-left: 20px;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
  margin-top:35px;

}
.paperFather{
  width: 900px;
  margin-left: 80px;
  margin-bottom: 40px;
}
.paper_content {
  background-color: #FFFFFF;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
  width: 900px;
  display: flex;
}
.paper_title:hover{
  color: 	#d7df07;
  cursor: pointer;
}
.paper_author{
  color: #A4A4A4;
  font-size: 13px;
}
.paper_author:hover{
  color: #01DF74;
  cursor: pointer;
}
.paper_publication {
  color: #A4A4A4;
  font-size: 13px;
}
.paper_publication:hover{
  color: #01A9DB;
  cursor:pointer;
}
.authors {
  background-color: #FAFAFA;
  height: auto;
  max-width: 1050px;
  margin-left: 20px;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
  margin-top:35px;
}
.greyPage {
  margin-bottom: 20px;
}
.greyPage /deep/ button.btn-prev {
  background-color: #FAFAFA;
}
.greyPage /deep/ button.btn-next {
  background-color: #FAFAFA;
}
.greyPage /deep/ li.number {
  background-color: #FAFAFA;
}
.xuhao {
  background-color: cornflowerblue;
  text-align: center;
  border-radius: 30px;
  font-family: Gadugi;
  font-size: 13px;
  width: 25px;
  margin-top: 5px;
  color: #FFF;
}
.cites{
  background-color: #01DF74;
  text-align: center;
  border-radius: 30px;
  font-family: Gadugi;
  font-size: 13px;
  margin-top: 10px;
  margin-left: 40px;
  width: 120px;
  color: #FFF;
}
</style>
