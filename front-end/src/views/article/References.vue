<template>
  <div class="grey">
    <div style="height: 20px"></div>
    <div style="overflow: hidden">
      <div style="float:left;" class="bigFrame">
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

      <div class="rightFrame">
        <div class="upFrame">
          <!--          <div style="height: 15px"></div>-->
          <div class="upFrameContent">Top referenced researchers</div>
        </div>
        <div class="downFrame">
          <div class="downFrameContent">
            <div style="font-size: 18px;margin-bottom: 5px">作者名</div>
            <div style="margin-bottom: 5px">
              领域<br>
              bbb<br>
              bbb<br>
              bbb<br>
            </div>
            <div style="margin-bottom: 10px">
              介绍<br>
              bbb<br>
              bbb<br>
            </div>
            <div>
              <el-button plain>去查看</el-button> &emsp;
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>

<script>
export default {
  name: "References"
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
.rightFrame{
  width: 25%;
  float: right;
  margin-right: 10%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
