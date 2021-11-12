<template>
  <div>
    <h1>Questions</h1>

    <div>
      <question
        v-for="item in items"
      />
    </div>
  </div>
</template>

<script>
import question from '../components/Question'
export default {
  name: "Questions",
  components: { question },
  data() {
    return {
      items: [
        {
          author: '作者1',
          head: '',
          title: '一个问题',
          date: '2021年11月12日',
          answerCnt: '2',
          text: '这里显示的是问题的内容'
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
