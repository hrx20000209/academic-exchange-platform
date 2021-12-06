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
  margin-bottom: 10px;
  display: flex;
  padding: 5%;
  margin-right: 1%;
  box-shadow: 0px 0px 15px 8px rgba(232, 232, 231, 0.98);
}

.move-main {
  background-color: #00ccbb;
  margin-bottom: 10px;
  display: flex;
  padding: 5%;
  margin-right: 1%;
  color: whitesmoke;
  box-shadow: 0px 0px 8px 8px rgba(232, 232, 231, 0.98);
}

.name-box {
  margin-left: 5%;
  font-size: medium;
}
</style>
