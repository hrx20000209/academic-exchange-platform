<template>
  <div id="statsOverivew">
    <div id="topHead">
      <div id="leftCharacter">数据概览</div>
      <div id="rightButton">
        <div>查看详细</div>
        <i class="el-icon-s-order"></i>
      </div>
    </div>
    <div id="mainPane">
      <div class="twoNumber">
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">13</div>
            <div class="NumberInfo">浏览量</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-view"></i>
          </div>
        </div>
        <div class="oneNumber">
          <div class="leftPart">
            <div class="Number">19</div>
            <div class="NumberInfo">被引</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
      </div>
      <div class="twoNumber">
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
            <div class="Number">12.7</div>
            <div class="NumberInfo">学术影响力</div>
          </div>
          <div class="rightPart">
            <i class="el-icon-s-marketing"></i>
          </div>
        </div>
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
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-top: 10px;
}

#leftCharacter {
  width: 250px;
  padding: 10px;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

#rightButton {
  display: flex;
  width: 250px;
  justify-content: flex-end;
  margin-top: 10px;
  color: #8e8e8e;
  font-family: "Microsoft YaHe";
  font-size: 14px;
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
  justify-content: center;
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
  width: 100px;
}
.rightPart{
  display: flex;
  justify-content: flex-end;
  color: #52bbb5;
  width: 100px;
  font-size: 20px;
}
.Number{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 15px;
}
.NumberInfo{
  font-family: "Microsoft YaHei";
  color: #343434;
  margin-top: 5px;
  font-size: 13px;
}
</style>
