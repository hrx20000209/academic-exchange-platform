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
                   <i class="el-icon-user" style="color: #6E6E6E"> {{this.members}} 人</i>
                  </el-col>
                  <el-col :span="6">
                   <i class="el-icon-collection-tag" style="color: #6E6E6E"> {{this.citeTime}} 次</i>
                  </el-col>
                  <el-col :span="10">
                    <i class="el-icon-star-on" style="color: #6E6E6E"> Total RG Score: {{this.RG_score}}</i>
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
                        <el-tooltip  v-for="(item2, index2) in item1" :key="index2" :content="item2.name" placement="top" effect="light">
                          <div style="display: flex; flex-direction: column;">
                            <el-avatar>
                              {{item2.pic}}
                            </el-avatar>
                            <div style="font-family: Gabriola; font-size: 16px">
                              {{item2.name}}
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
                  ">
                  <el-row>
                  <el-col :span="1">
                    <div class="xuhao">{{index+1}}</div>
                  </el-col>
                  <el-col :span="18">
                    <el-row style="margin-top: 5px" class="paper_title">
                      {{item.title}}
                    </el-row>
                    <el-row class="paper_author">
                      {{item.author}}
                    </el-row>
                    <el-row class="paper_publication">
                      {{item.publication}}
                    </el-row>
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
  </div>
</template>

<script>
  const echarts = require('echarts/lib/echarts')

    export default {
        name: "Institution",
        data(){
          return {
            InstitutionName:'北京航空航天大学',
            members:101293,
            RG_score:52485.99,
            citeTime:12048,
            AuthorPapers:[
              {
              name:'a1',
              value:'100',
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
            paperCitation:[
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
            papers:[
              {
                title:'3D Printing in the Context of Cloud Manufacturing',
                author:'Jin Cui · Lei Ren · Jingeng Mai',
                publication:'Oct 2022 · Robotics and Computer-Integrated Manufacturing',
                cites:1000,
              },
              {
                title:'3D Printing in the Context of Cloud Manufacturing',
                author:'Jin Cui · Lei Ren · Jingeng Mai',
                publication:'Oct 2022 · Robotics and Computer-Integrated Manufacturing',
                cites:1000,
              },
              {
                title:'3D Printing in the Context of Cloud Manufacturing',
                author:'Jin Cui · Lei Ren · Jingeng Mai',
                publication:'Oct 2022 · Robotics and Computer-Integrated Manufacturing',
                cites:1000,
              },
              {
                title:'3D Printing in the Context of Cloud Manufacturing',
                author:'Jin Cui · Lei Ren · Jingeng Mai',
                publication:'Oct 2022 · Robotics and Computer-Integrated Manufacturing',
                cites:1000,
              },
              {
                title:'3D Printing in the Context of Cloud Manufacturing',
                author:'Jin Cui · Lei Ren · Jingeng Mai',
                publication:'Oct 2022 · Robotics and Computer-Integrated Manufacturing',
                cites:1000,
              },
              {
                title:'3D Printing in the Context of Cloud Manufacturing',
                author:'Jin Cui · Lei Ren · Jingeng Mai',
                publication:'Oct 2022 · Robotics and Computer-Integrated Manufacturing',
                cites:1000,
              },
            ],
            authors:[
              [
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
              ],
              [
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
              ],
              [
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
              ],
              [
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
                {
                  'name': 'XiaoMing',
                  'pic':'Ming',
                },
              ],
            ],
            currentPage: 1,
            pagesize: 7,
            currentPage_author: 1,
            pagesize_author: 3,
          }
        },
        mounted() {
          this.buildPie1()
        },
        methods:{
          buildPie1(){
            let pie1 = echarts.init(document.getElementById('chart1'))
            let pie2 = echarts.init(document.getElementById('chart2'))
            let pie3 = echarts.init(document.getElementById('chart3'))
            let pie4 = echarts.init(document.getElementById('chart4'))
            const color1 = this.randomColor()
            const color2 = this.randomColor()
            let option1={
              backgroundColor: '#FFF',
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}  {c} ({d}%)"
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
                data:[1972,1976,1980,1984,1984,1988,1992,1996,2000,2004,2008,2012,2016]
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
                    data: [23, 24, 18, 25, 27, 28, 25,23, 24, 18, 25, 27, 28, 25],
                    itemStyle:{
                      color:color1,
                    }
                  },
                  {
                    name:'Publication',
                    type: 'bar',
                    data: [26, 24, 18, 22, 23, 20, 27,23, 24, 18, 25, 27, 28, 25],
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
                formatter: "{a} <br/>{b}  {c} ({d}%)"
              },
              series: [
                {
                  name:'成员发表论文量',
                  type: 'pie',
                  data: this.addColor(this.AuthorPapers),
                  roseType: 'area'
                }

              ]
            }
            // let pieColors2 = this.getColorList(this.AuthorCitation)
            let option3={
              title: {
                text: '成员被引用量',
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
                  radius: ['40%', '70%'],
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  data:this.addColor(this.AuthorCitation)
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
                formatter: "{a} <br/>{b}  {c} ({d}%)"
              },
              series: [
                {
                  name:'论文被引用量',
                  type: 'pie',
                  data: this.addColor(this.paperCitation),
                }

              ]
            }
            pie1.setOption(option1)
            pie2.setOption(option2)
            pie3.setOption(option3)
            pie4.setOption(option4)
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
          test(item) {
            console.log(item)
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
  font-family: siyuan;
  color: #424242;
  font-size: 20px;
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
  width: 120px;
  color: #FFF;
}
</style>
