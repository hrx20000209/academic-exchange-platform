<template>
  <div id="followSame">
    <div id="topHead">
      <div id="leftCharacter">关注与您具有相同技能的研究人员</div>
    </div>
    <div id="mainPane">
      <div class="onePossible">
        <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <div class="idAndNumber">
          <div class="idName">黄润希</div>
          <div class="NumberInfor">6个相同技能</div>
        </div>
        <div class="rightButton">
          <button class="followButton">关注</button>
        </div>
      </div>
      <div class="onePossible">
        <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <div class="idAndNumber">
          <div class="idName">张洁</div>
          <div class="NumberInfor">5个相同技能</div>
        </div>
        <div class="rightButton">
          <button class="followButton">关注</button>
        </div>
      </div>
      <div class="onePossible">
        <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <div class="idAndNumber">
          <div class="idName">邵兵</div>
          <div class="NumberInfor">3个相同技能</div>
        </div>
        <div class="rightButton">
          <button class="followButton">关注</button>
        </div>
      </div>
    </div>
    <div id="footer">
      <div id="footerCharacter">查看更多研究人员</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "followSame"
}
</script>

<style scoped>
#followSame {
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  margin-top: 20px;
}

#topHead {
  display: flex;
  justify-content: flex-start;
}

#leftCharacter {
  padding: 10px;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e8e8e;
}
#mainPane{
    border-top: 1px solid #dedede;
  padding: 10px 20px 15px 20px;
}
.onePossible{
  display: flex;
  margin-top: 10px;
}
.idAndNumber{
  width: 200px;
  margin-left: 10px;
}
.idName{
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 15px;
  color: #343434;
}
.NumberInfor{
  font-family: "Microsoft YaHei";
  font-size: 13px;
  color: #8e8e8e;
}
.followButton{
  font-family: "Microsoft YaHei UI";
  display: inline;
  background-color: transparent;
  border: #0080ff 1px solid;
  color: #0080ff;
  font-family: "Roboto", Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  padding: 5px 10px 5px 10px;
}
.followButton:hover{
  background-color: #0080ff;
  color: white;
}
#footer{
    border-top: 1px solid #dedede;
  padding: 15px;
  display: flex;
  justify-content: center;
}
#footerCharacter{
  font-family: "Microsoft YaHei";
  font-size: 15px;
}
#footerCharacter:hover{
  cursor: pointer;
}
</style>
