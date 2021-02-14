<template>
  <div id="blank">
    <a class="lest_month" @click="lestYear"><i class="fas fa-arrow-left"></i></a>
    <span id="year">{{this.year}}</span>
    <a class="next_month" @click="nextYear"><i class="fas fa-arrow-right"></i></a>
    <Table/>
  </div>
</template>

<script>
import Table from './costTotalTable'
export default {
  components: {
    Table
  },
  data: () => ({
    year: ''
  }),
  created () {
    this.$store.dispatch('YEAR', this.$route.params.year)
    this.year = this.$route.params.year
  },
  methods: {
    nextYear () {
      const year = Number(this.$route.params.year) + 1
      this.year = year
      this.$store.dispatch('MOVE_YEAR', year)
    },
    lestYear () {
      const year = Number(this.$route.params.year) - 1
      this.year = year
      this.$store.dispatch('MOVE_YEAR', year)
    }
  }
}
</script>

<style>
  #blank{
    margin: 10px;
  }
  #year{
    font-weight: bold;
    font-size: 18px;
  }
  .v-application a{
    color: #673ab7;
  }
  .lest_month{
    margin-right: 10px;
  }
  .next_month{
    margin-left: 10px;
  }
</style>
