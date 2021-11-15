<template>
  <div id="app">
    <mycloud></mycloud>
  </div>
</template>

<script>
import Vue from "vue";
import VueScrollTo from "vue-scrollto";

Vue.use(VueScrollTo, options);

//https://github.com/rigor789/vue-scrollto

let options = {
  container: "body", //滚动的容器
  duration: 500, //滚动时间
  easing: "ease", //缓动类型
  offset: 0, //滚动时应应用的偏移量。此选项接受回调函数
  force: true, //是否应执行滚动
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
};

export default {
  name: "app",
  data() {
      return{
          test:['a','b','c']
      }
  }
};
</script>

<style>
.menu {
  position: fixed;
  width: 200px;
  background-color: #eee;
}
.content {
  width: 500px;
  height: 500px;
  margin-left: 300px;
  margin-bottom: 50px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}
</style>