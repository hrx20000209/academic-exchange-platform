<template>
  <div id="statsOverivew">
    <div id="topHead">
      <div id="leftCharacter" style="display: flex">
                <div style="margin-top: 1px">
        <svg style="margin-right: 5px" t="1639837302976" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12447" width="20" height="20"><path d="M709.1 728.2H154.4V197.7h554.7v530.5z m-513.8-40.9h473V238.6h-473v448.7z" fill="#515151" p-id="12448"></path><path d="M507.7 483.6H355.8v-40.9l20.4-0.4h131.5z" fill="#515151" p-id="12449"></path><path d="M818.9 852H405.3v-40.8l20.4-0.4h413.7v40.9z" fill="#F74F4F" p-id="12450"></path><path d="M839.4 852h-40.9l-0.4-20.4V417.9H839l0.4 20.5z" fill="#F74F4F" p-id="12451"></path></svg></div>
        数据概览</div>
<!--      <div id="rightButton">-->
<!--        <div>查看详细</div>-->
<!--        <i class="el-icon-s-order"></i>-->
<!--      </div>-->
    </div>
    <div id="mainPane">
      <div class="twoNumber">
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">{{user.n_pubs}}</div>
            <div class="NumberInfo">发表量</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-edit-outline"></i>
          </div>
        </div>
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">{{user.n_citation}}</div>
            <div class="NumberInfo">被引量</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">{{view}}</div>
            <div class="NumberInfo">浏览量</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-view"></i>
          </div>
        </div>
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">{{ user.h_index }}</div>
            <div class="NumberInfo">影响力</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-s-marketing"></i>
          </div>
        </div>
      </div>
      <div class="twoNumber">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "statsOverview",
  props: ['user','view']
}
</script>

<style scoped>
#statsOverivew {
  background-color: white;
box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  border-radius: 2px;
  margin-top: 30px;
  width: auto;
}

#leftCharacter {
  width: 250px;
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #525252;
}

#rightButton {
  display: flex;
  width: 250px;
  justify-content: flex-end;
  margin-top: 10px;
  color: #8e8e8e;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
}

#rightButton:hover {
  cursor: pointer;
  color: #343434;
}

/deep/ [class*=" el-icon-"], [class^=el-icon-] {
  font-family: element-icons !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  margin-top: 2px;
  margin-left: 5px;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#topHead {
  display: flex;
}

#mainPane {
  border-top: 1px solid #dedede;
  padding: 10px 20px 15px 20px;
}
.twoNumber{
  display: flex;
}
.oneNumber {
  margin: 8px;
  border: 1px solid #dedede;
  width: 100%;
  border-radius: 3px;
  padding: 15px;
  display: flex;
}
.leftPart{
  /*width: 100px;*/
}
.rightPart{
  height: fit-content;
  margin-left: auto;
  color: #589ba7;
  /*width: 100px;*/
  font-size: 20px;
}
.Number{
  font-family: "Roboto", Arial, sans-serif;
  font-weight: bolder;
  font-size: 18px;
}
.NumberInfo{
  font-family: "Roboto", Arial, sans-serif;
  color: #343434;
  margin-top: 5px;
  font-size: 15px;
}
</style>
