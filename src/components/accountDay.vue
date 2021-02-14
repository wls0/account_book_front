<template>
  <div id="blank">
    <span id="day">{{this.date}}</span>
    <Table/>
  </div>
</template>

<script>
import Table from './costTotalTable'
export default {
  data: () => ({
    date: ''
  }),
  components: {
    Table
  },
  created () {
    this.date = this.$route.params.day
  },
  methods: {
    created () {
      this.$store.dispatch('DAY', this.$route.params.day)
    }
  }
}
</script>

<style scoped>
  #blank{
    margin: 10px;
  }
  #day{
    font-weight: bold;
    font-size: 18px;
  }
</style>
