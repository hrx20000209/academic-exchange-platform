<template>
    <div class="main"
         @mouseover="changeActive($event)"
         @mouseleave="removeActive($event)"
         @click="read">
      <div>
        <el-avatar shape="circle" :size="size" :src="head"></el-avatar>
      </div>
      <div class="name-box">
        {{ name }}
      </div>
      <div v-if="unread" class="new-box">
        <img :src="require('../assets/new.png')" width="50%" />
      </div>
    </div>
</template>

<script>
export default {
  name: "message",
  props: ['head', 'name', 'unread', "user_id"],
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
    },
    read() {
      let data = {
        isRead: true
      }
      this.$emit('read', data)
    },
  }
}
</script>

<style scoped>
.message-item-box {
  margin-bottom: 10px;
  display: flex;
  padding: 5%;
  margin-right: 1%;
  box-shadow: 0 0 15px 8px rgba(232, 232, 231, 0.98);
}

.move-main {
  background-color: #00ccbb;
  margin-bottom: 10px;
  display: flex;
  padding: 5%;
  margin-right: 1%;
  color: whitesmoke;
  box-shadow: 0 0 8px 8px rgba(232, 232, 231, 0.98);
}

.name-box {
  width: 120%;
  margin-left: 5%;
  font-size: medium;
}

.new-box {
  margin-right: 0;
  padding-right: 0;
  width: 50%;
}
</style>
