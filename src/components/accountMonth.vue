<template>
  <v-container>
    <div class="blank"/>
    <v-layout>
     <a class="lest_month" @click="lestMonth"><i class="fas fa-arrow-left"></i></a>
      <span id="month">{{this.month}}월</span>
      <a class="next_month" @click="nextMonth"><i class="fas fa-arrow-right"></i></a>
    </v-layout>
    <div class="blank"/>
    <v-layout>
      <v-flex>
        <v-sheet height="600">
          <v-calendar
            :now="today"
            :value="today"
            color="primary"
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu
                  :key="event.cost"
                  v-model="event.open"
                  full-width
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.cost"
                    ></div>
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event2"
                      v-on="on"
                      v-html="event.revenue"
                    ></div>
                  </template>
                  <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                  >
                    <v-toolbar
                      color="#039f33ba"
                      dark
                      @click="dayCost(event.date)"
                    >
                      <v-toolbar-title v-html="event.date"></v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                      <div class="blank"></div>
                      <p class="date_cost">총 지출: {{ event.cost }}</p>
                      <p class="date_cost">총 수익: {{ event.revenue }} </p>
                    <v-card-actions>
                      <v-btn color="secondary">
                        닫기
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
    </v-layout>
    <Table/>
  </v-container>
</template>

<script>
import Table from './costTotalTable'
import dayjs from 'dayjs'
export default {
  components: {
    Table
  },
  data: () => ({
    today: dayjs(new Date()).format('YYYY-MM-DD'),
    month: ''
  }),
  computed: {
    costList () {
      return this.$store.state.costList
    },
    eventsMap () {
      const map = {}
      this.costList.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  created () {
    this.$store.dispatch('MONTH', this.$route.params.month)
    this.month = new Date(this.$route.params.month).getMonth() + 1
  },
  methods: {
    open (event) {
      alert(event.title)
    },
    nextMonth () {
      const beforYear = new Date(this.$route.params.month).getFullYear()
      const beforMonth = new Date(this.$route.params.month).getMonth() + 1
      let year
      let month
      if (beforMonth >= 12) {
        year = beforYear + 1
        month = '01'
      } else {
        month = beforMonth + 1
        year = beforYear
      }
      const date = dayjs(year + '-' + month).format('YYYY-MM')
      const day = new Date().getDate()
      this.today = date + '-' + day
      this.month = month
      this.$store.dispatch('MOVE_MONTH', date)
    },
    lestMonth () {
      const beforYear = new Date(this.$route.params.month).getFullYear()
      const beforMonth = new Date(this.$route.params.month).getMonth()
      let year
      let month
      if (beforMonth < 1) {
        year = beforYear - 1
        month = 12
      } else {
        year = beforYear
        month = beforMonth
      }
      const date = dayjs(year + '-' + month).format('YYYY-MM')
      const day = new Date().getDate()
      this.today = date + '-' + day
      this.month = month
      this.$store.dispatch('MOVE_MONTH', date)
    },
    dayCost (date) {
      this.$store.dispatch('DAY', date)
    }
  }
}
</script>

<style scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #673ab7;
    color: #ffffff;
    border: 1px solid #673ab7;
    width: 100%;
    font-size: 8px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  .my-event2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #fac517;
    color: #ffffff;
    border: 1px solid #fac517;
    width: 100%;
    font-size: 8px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  #month{
    font-weight: bold;
    font-size: 16px;
  }
  .blank{
    margin-bottom: 10px;
  }
  .date_cost{
    margin-left: 6px;
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
