<template>
  <div id="statsOverivew">
    <div id="topHead">
      <div id="leftCharacter">数据概览</div>
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
            <i class="el-icon-view"></i>
          </div>
        </div>
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">{{user.n_citation}}</div>
            <div class="NumberInfo">被引</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">14</div>
            <div class="NumberInfo">推荐</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-caret-top"></i>
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
  props: ['user']
}
</script>

<style scoped>
#statsOverivew {
  background-color: white;
box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  border-radius: 2px;
  /*margin-top: 30px;*/
  width: auto;
}

#leftCharacter {
  width: 250px;
  padding: 10px;
  font-family: "Roboto", Arial, sans-serif;
  margin-left: 15px;
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
