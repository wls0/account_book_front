<template>
  <div id="blank">
    <v-layout>
      <a
        class="lest_day"
        @click="lestDay"
      ><i class="fas fa-arrow-left" /></a>
      <span id="day">{{ date }}</span>
      <a
        class="next_day"
        @click="nextDay"
      ><i class="fas fa-arrow-right" /></a>
    </v-layout>
    <ListTable />
    <Table />
  </div>
</template>

<script>
import ListTable from './accountDetailDay'
import Table from './costTotalTable'
import dayjs from 'dayjs'
export default {
  components: {
    Table,
    ListTable
  },
  data: () => ({
    date: ''
  }),
  created () {
    this.date = this.$route.params.day
    this.$store.dispatch('DAY', this.$route.params.day)
  },
  methods: {
    nextDay () {
      const beforYear = new Date(this.$route.params.day).getFullYear()
      const beforMonth = new Date(this.$route.params.day).getMonth()
      const beforDay = new Date(this.$route.params.day).getDate() + 1
      let year
      let month
      if (beforMonth >= 12) {
        year = beforYear + 1
        month = '01'
      } else {
        month = beforMonth + 1
        year = beforYear
      }
      const date = dayjs(year + '-' + month + '-' + beforDay).format('YYYY-MM-DD')
      this.date = date
      this.$store.dispatch('MOVE_DAY', date)
    },

    lestDay () {
      const beforYear = new Date(this.$route.params.day).getFullYear()
      const beforMonth = new Date(this.$route.params.day).getMonth()
      const beforDay = new Date(this.$route.params.day).getDate() - 1
      let year
      let month
      let day
      if (beforMonth < 1) {
        year = beforYear - 1
        month = 12
        day = beforDay
      } else if (beforMonth === 1) {
        year = beforYear
        const test = dayjs(new Date(beforYear, beforMonth, beforDay)).format('YYYY, MM, DD')
        const twoMonth = new Date(test).getMonth()
        const twoDay = new Date(test).getDate()
        month = twoMonth
        day = twoDay
      } else {
        year = beforYear
        month = beforMonth
        day = beforDay
      }
      const date = dayjs(new Date(year, month, day)).format('YYYY-MM-DD')
      this.date = date
      this.$store.dispatch('MOVE_DAY', date)
    }
  }
}
</script>

<style scoped>
#blank {
  margin: 10px;
}
#day {
  font-weight: bold;
  font-size: 18px;
}
.lest_day {
  margin-right: 10px;
}
.v-application a {
  color: #673ab7;
}
.next_day {
  margin-left: 10px;
}
</style>
