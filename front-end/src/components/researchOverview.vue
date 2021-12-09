<template>
  <div id="researchOverview">
    <div id="topHead">
      <div id="leftCharacter">研究项目概览</div>
      <div id="rightButton">
        <div>查看详细</div>
        <i class="el-icon-s-order"></i>
      </div>
    </div>
    <div id="mainPane">
      <div class="reOverPane">
        <div class="number">0</div>
        <div class="numberInfo">工作项目</div>
      </div>
      <div class="reOverPane">
        <div class="number">3</div>
        <div class="numberInfo">研究项目</div>
      </div>
      <div class="reOverPane">
        <div class="number">5</div>
        <div class="numberInfo">提问</div>
      </div>
      <div class="reOverPane">
        <div class="number">3</div>
        <div class="numberInfo">回答</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "researchOverview"
}
</script>

<style scoped>
#researchOverview {
  background-color: white;
box-shadow: 0 3px 7px rgb(0 0 0 / 19%), 0 0 12px rgb(0 0 0 / 6%);
  border-radius: 2px;
  margin-top: 15px;
}

#leftCharacter {
  width: 250px;
  padding: 10px;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 18px;
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
  justify-content: center;
}

#mainPane {
  border-top: 1px solid #dedede;
  padding: 10px 20px 15px 20px;
  display: flex;
}
.reOverPane{
  border: 1px solid #dedede;
  width: 100%;
  margin: 5px;
  padding: 10px 20px 10px 20px;
}
.number{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 16px;
  color: black;
}
.numberInfo{
  font-family: "Microsoft YaHei";
  font-size: 18px;
  margin-top: 10px;
  color: #343434;
}
</style>
