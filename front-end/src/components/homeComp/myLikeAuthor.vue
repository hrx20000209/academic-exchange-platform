<template>
<div id="myLikeAuthor">
      <div id="topHead">
      <div id="leftCharacter">我的关注</div>
    </div>
</div>
</template>

<script>
export default {
  name: "myLikeAuthor",
  props:['user']
}
</script>

<style scoped>
#myLikeAuthor{
  margin-top: 10px;
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 2px;
  width: 900px;
}
#leftCharacter {
  width: 250px;
  padding: 10px;
  margin-left: 10px;
  justify-content: flex-start;
  font-family: "Microsoft YaHe";
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e8e8e;
}

#topHead {
  display: flex;
  justify-content: flex-start;
}
</style>
