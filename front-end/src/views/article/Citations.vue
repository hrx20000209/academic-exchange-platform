<template>
  <div class="grey">
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
</template>

<script>
export default {
  name: "Citations"
}
</script>

<style scoped>
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
</style>
