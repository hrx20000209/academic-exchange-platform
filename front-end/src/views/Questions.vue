<template>
  <div>
    <h1>Questions</h1>
    <div v-for="item in items" :key="item.id">
      <question
        :title="item.title"
        :author="item.author"
        :head="item.head"
        :description="item.description"
        :time="item.time"
        :text="item.text"
      />
    </div>
  </div>
</template>

<script>
import question from '@/components/Question'
export default {
  name: "Questions",
  components: { question },
  data() {
    return {
      items: [
        {
          author: '作者1',
          description: 'BUAA软件学院在读',
          time: '1小时前',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          title: '一个问题',
          date: '2021年11月12日',
          answerCnt: '2',
          text: '这里显示的是问题的内容'
        },
        {
          author: '作者2',
          description: '一个野鸡大学的研究生',
          time: '1天前',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          title: '这也是一个问题',
          date: '2021年11月12日',
          answerCnt: '2',
          text: '这里显示的是问题的内容'
        },
        {
          author: '作者3',
          description: '无业游民',
          time: '1年前',
          head: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          title: '这还是一个问题',
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
