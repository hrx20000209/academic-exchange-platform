<template>
  <div class="main" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
    <div>
      <el-avatar shape="circle" :size="size" :src="head"></el-avatar>
    </div>
    <div class="name-box">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  props: ['head', 'name', 'text'],
  data() {
    return {
      size: 40,
    }
  },
  methods: {
    changeActive($event){
      $event.currentTarget.className="move-main";
    },
    removeActive($event){
      $event.currentTarget.className="main";
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  padding: 5%;
  margin-right: 1%;
  border-top: solid grey 1px;
  border-bottom: solid grey 1px;
}

.move-main {
  display: flex;
  padding: 5%;
  margin-right: 1%;
  border-top: solid grey 1px;
  border-bottom: solid grey 1px;
  background-color: #e4e2da;
}

.name-box {
  margin-left: 5%;
  font-size: medium;
}
</style>
