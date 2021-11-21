<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div style="height: 100%;width: 100%;overflow: hidden">
      <div style="float: left" class="bigFrame">
        <div class="upFrame">
          <div class="upFrameContent">摘要</div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            1
          </div>
        </div>
      </div>
      <div class="rightFrame">
        <div class="upFrame">
          <div class="upFrameContent">Related research</div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            <div style="font-size: 18px;margin-bottom: 5px">Big Data Big Data and the Attention Economy</div>
            <div style="margin-bottom: 5px">
              <a class="articleType">Article</a>
              Full-text available
              <div style="color: darkgrey">
                December 2017
              </div>
            </div>
            <div style="font-size: 16px;color: blue">
              Download
            </div>
          </div>
        </div>
        <div class="upFrame" style="background: rgba(221,221,221,0.2);">
          <div style="text-align: center;line-height:50px">
            view more
          </div>
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
</template>

<script>
export default {
  name: "Overviews",
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style scoped>
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
</style>
