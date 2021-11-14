<template>
<!--  总体-->
<div class="main">
<!--  包含下面那栏-->
  <div>
<!--    上下两块-->
<!--    白色-->
    <div class="white">
<!--      白内容-->
      <div class="whitePart">
        <!--      内容-->
        <div class="whiteContent">
          <div class="leftPart">
            <div class="articleType">Article</div>
            <div class="articleTitle">Big Data, Data Ownership and Data Economy</div>
            <div class="articleDate">September 2021</div>
            <div class="articleDOI">DOI: 10.52554/kjcl.2021.96.3</div>
            <div style="height: 20px"></div>
            <div class="articleActhor">SooJeong Kim</div>
          </div>
          <div class="rightPart">

          </div>
        </div>
        <!--      分界线-->
        <div class="dividingLine"></div>
        <!--      导航栏-->
        <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="gotoOverviews">Overviews</el-menu-item>
            <el-menu-item index="2" @click="gotoStats">Stats</el-menu-item>
            <el-menu-item index="3" @click="gotoComments">Comments</el-menu-item>
            <el-menu-item index="4" @click="gotoCitations">Citations</el-menu-item>
            <el-menu-item index="5" @click="gotoReferences">References</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
<!--      线-->
    <div style="height: 1px;background: lightgrey">
    </div>
<!--    灰色 overviews-->
    <div class="grey" v-if="flag === 1 || flag === 0">
      <div style="height: 20px"></div>
      <div class="bigFrame">
        <div class="upFrame">
<!--          <div style="height: 15px"></div>-->
          <div class="upFrameContent">摘要</div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            The primary scope of application of the General Data Protection Regulation—Regulation (UE) 2016/679 (GDPR)—is ‘personal data’; ‘data’ that is not personal data can be freely processed within the legal framework of the Regulation (UE) 2018/1807. Although the European data protection framework recognises these two categories of data—‘personal data’ and ‘non-personal data’—reality reveals ‘a lot in between’ the opposite endpoints. There are accordingly considerable complications in drawing the boundaries between personal and non-personal data. In this article, we will review some of the main issues related to the usual classification of data as personal, anonymous, pseudonymous, de-identified data, and suggest that the most realistic way to approach the different problems is to recognise the dynamic nature of the data.
          </div>
        </div>
      </div>
      <div style="height: 30px">
      </div>
      <div class="textFrame">
        <el-tabs type="border-card">
          <el-tab-pane label="全文">
            <div class="textFrameContent">
              <!--一部分信息-->
              <div class="textFrameContentMain">
                Content uploaded by Frederike Zufall<br>
                Author content<br>
                Content may be subject to copyright.<br>
              </div>
              <!--全文-->
              <div class="textFrameContentMessage">
                <div class="textBigFrame">
                  <div class="textUpFrameContent">
                    <!--          <div style="height: 15px"></div>-->
                    <div class="upFrameContent">PAGE1</div>
                  </div>
                  <div class="downFrame">
                    <div class="downFrameContent">
                      The primary scope of application of the General Data Protection Regulation—Regulation (UE) 2016/679 (GDPR)—is ‘personal data’; ‘data’ that is not personal data can be freely processed within the legal framework of the Regulation (UE) 2018/1807. Although the European data protection framework recognises these two categories of data—‘personal data’ and ‘non-personal data’—reality reveals ‘a lot in between’ the opposite endpoints. There are accordingly considerable complications in drawing the boundaries between personal and non-personal data. In this article, we will review some of the main issues related to the usual classification of data as personal, anonymous, pseudonymous, de-identified data, and suggest that the most realistic way to approach the different problems is to recognise the dynamic nature of the data.
                    </div>
                  </div>
                </div>
              </div>
              <!--按钮-->
              <div class="textFrameContentButton">
                <el-button type="primary">访问全文</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
<!--    灰色 stats-->
    <div class="grey" v-if="flag===2">
      <div style="height: 20px"></div>
      <div class="statsFrame">
        <div class="upFrame">
          <div class="upFrameContent">Stats overview</div>
        </div>
        <div class="downFrame">
          <div class="statsFrameContent">
            <div style="height: 100px;width: 100%;">
              <div class="statsContent">
                <div style="border: lightgrey solid 1px;padding: 10px">
                  <div style="font-size: 20px;margin-bottom: 5px">
                    0.7
                  </div>
                  <div style="font-size: 12px;margin-bottom: 10px">
                    Research Interest
                  </div>
                  <div style="color: darkgrey;font-size: 12px;">
                    More details
                  </div>
                </div>
              </div>
              <div class="statsContent">
                <div style="border: lightgrey solid 1px;padding: 10px">
                  <div style="font-size: 20px;margin-bottom: 5px">
                    0.7
                  </div>
                  <div style="font-size: 12px;margin-bottom: 10px">
                    Research Interest
                  </div>
                  <div style="color: darkgrey;font-size: 12px;">
                    More details
                  </div>
                </div>
              </div>
              <div class="statsContent">
                <div style="border: lightgrey solid 1px;padding: 10px">
                  <div style="font-size: 20px;margin-bottom: 5px">
                    0.7
                  </div>
                  <div style="font-size: 12px;margin-bottom: 10px">
                    Research Interest
                  </div>
                  <div style="color: darkgrey;font-size: 12px;">
                    More details
                  </div>
                </div>
              </div>
              <div class="statsContent">
                <div style="border: lightgrey solid 1px;padding: 10px">
                  <div style="font-size: 20px;margin-bottom: 5px">
                    0.7
                  </div>
                  <div style="font-size: 12px;margin-bottom: 10px">
                    Research Interest
                  </div>
                  <div style="color: darkgrey;font-size: 12px;">
                    More details
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>
<!--    灰色 stats-->
    <div class="grey" v-if="flag===3">
      <div style="height: 20px"></div>
    </div>
<!--    灰色 stats-->
    <div class="grey" v-if="flag===4">
      <div style="height: 20px"></div>
      <div class="bigFrame">
        <div class="upFrame">
          <!--          <div style="height: 15px"></div>-->
          <div class="upFrameContent">All Citations</div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            The primary scope of application of the General Data Protection Regulation—Regulation (UE) 2016/679 (GDPR)—is ‘personal data’; ‘data’ that is not personal data can be freely processed within the legal framework of the Regulation (UE) 2018/1807. Although the European data protection framework recognises these two categories of data—‘personal data’ and ‘non-personal data’—reality reveals ‘a lot in between’ the opposite endpoints. There are accordingly considerable complications in drawing the boundaries between personal and non-personal data. In this article, we will review some of the main issues related to the usual classification of data as personal, anonymous, pseudonymous, de-identified data, and suggest that the most realistic way to approach the different problems is to recognise the dynamic nature of the data.
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>
<!--    灰色 stats-->
    <div class="grey" v-if="flag===5">
      <div style="height: 20px"></div>
      <div class="bigFrame">
        <div class="upFrame">
          <!--          <div style="height: 15px"></div>-->
          <div class="upFrameContent">参考文献</div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            <div style="margin-bottom: 10px;font-size: 18px">
              They Who Must Not Be Identified - Distinguishing Personal from Non-Personal Data Under the GDPR
            </div>
            <div style="margin-bottom: 10px;font-size: 15px;color:darkgrey;">
              <a class="articleType">Article</a>February 2020·SSRN Electronic Journal
            </div>
            <div style="margin-bottom: 10px;font-size: 16.5px">
              Michèle FinckFrank Pallas
            </div>
            <div style="margin-bottom: 10px;font-size: 16px">
              In this article, we examine the concept of non-personal data from a law
              and computer science perspective. The delineation between personal data
              and non-personal data is of paramount importance to determine the GDPR’s
              scope of application. This exercise is, however, fraught with difficulty,
              also when it comes to depersonalized data—that is to say data that once
              was… Read more
            </div>
            <div style="color: darkgray;font-size: 15px;margin-bottom: 10px">49 Reads·26 Citations</div>
            <div style="height: 30px">
              <div style="float: left">
                <el-button plain>访问全文</el-button>
              </div>
              <div style="float: right;margin-top: 12px;text-align: right">
                Recommend&emsp;&emsp;
                Follow&emsp;&emsp;
                Share
              </div>
            </div>
          </div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            <div style="margin-bottom: 10px;font-size: 18px">
              They Who Must Not Be Identified - Distinguishing Personal from Non-Personal Data Under the GDPR
            </div>
            <div style="margin-bottom: 10px;font-size: 15px;color:darkgrey;">
              <a class="articleType">Article</a>February 2020·SSRN Electronic Journal
            </div>
            <div style="margin-bottom: 10px;font-size: 16.5px">
              Michèle FinckFrank Pallas
            </div>
            <div style="margin-bottom: 10px;font-size: 16px">
              In this article, we examine the concept of non-personal data from a law
              and computer science perspective. The delineation between personal data
              and non-personal data is of paramount importance to determine the GDPR’s
              scope of application. This exercise is, however, fraught with difficulty,
              also when it comes to depersonalized data—that is to say data that once
              was… Read more
            </div>
            <div style="color: darkgray;font-size: 15px;margin-bottom: 10px">49 Reads·26 Citations</div>
            <div style="height: 30px">
              <div style="float: left">
                <el-button plain>访问全文</el-button>
              </div>
              <div style="float: right;margin-top: 12px;text-align: right">
                Recommend&emsp;&emsp;
                Follow&emsp;&emsp;
                Share
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      <div style="width: 25%;float: right;margin-right: 10%">-->
<!--        <div class="upFrame">-->
<!--          <div class="upFrameContent">第一篇作者详情</div>-->
<!--        </div>-->
<!--        <div class="downFrame">-->
<!--          <div class="downFrameContent">-->
<!--            nal data’—reality reveals ‘a lot in between’ the opposite endpoints. There are accordingly considerable complications in drawing the boundaries between personal and non-personal data. In this article, we will review some of the main issues related to the usual classification of data as personal, anonymous, pseudonymous, de-identified data, and suggest that the most realistic way to approach the different problems is to recognise the dynamic nature of the data.-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div style="height: 20px"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Article",
  data(){
    return{
      flag: 0
    }
  },
  methods:{
    gotoOverviews(){
      this.flag = 1
    },
    gotoStats(){
      this.flag = 2
    },
    gotoComments(){
      this.flag = 3
    },
    gotoCitations(){
      this.flag = 4
    },
    gotoReferences(){
      this.flag = 5
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
}
.white{
  height: 212px;
}
.whitePart{
  width: 80%;
  margin: 0 auto;
  height: 130px;
}
.whiteContent{
  height: 150px;
}
.leftPart{
  width: 70%;
  float: left;
}
.articleType{
  width: 60px;
  background: lightblue;
  border-radius: 2px;
  text-align: center;
}
.articleTitle{
  font-size: 24px;
}
.articleDate{
  color: darkgray;
}
.articleDOI{
  color: darkgray;
}
.articleActhor{

}
.dividingLine{
  width: 100%;
  height: 1px;
  background: lightgrey;
}
.grey{
  background: rgba(221,221,221,0.3);
  /*height: 400px;*/
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
  /*margin-left: 5%;*/
  /*width: 90%;*/
  /*margin-top: 30px;*/
  /*margin-bottom: 30px;*/
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
</style>
