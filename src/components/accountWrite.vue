<template>
  <v-container>
    <v-row
    justify="center"
    >
      <v-col
      sm="12"
      >
        <form @submit.prevent="writeAccount">
          <v-text-field
            label="날짜"
            v-model="date"
            :rules="[rules.required]"
            placeholder="ex)2021-02-15"
            outlined
            dense
            v-if="this.save === true"
          ></v-text-field>
          <v-text-field
            label="날짜"
            v-model="date"
            disabled
            :rules="[rules.required]"
            outlined
            dense
            v-else
          ></v-text-field>
          <v-text-field
            label="사용내역"
            v-model="bigCategory"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="상세내역"
            v-model="smallCategory"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-select
            v-model="card"
            :items="items"
            label="카드"
          />
          <v-row>
            <v-col
            sm="6"
            >
            <v-checkbox
              v-model="costCheck"
              label="지출"
              @click="checkBox('cost')"
            ></v-checkbox>
            </v-col>
            <v-col
            sm="6"
            >
              <v-checkbox
              v-model="revenueCheck"
              label="수익"
              @click="checkBox('revenue')"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-text-field
            label="금액"
            v-model="price"
            placeholder="ex)50000"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-btn
          block
          class="login_btn"
          color="#673ab7"
          sm="12"
          @click="writeAccount"
          >
            저장
          </v-btn>
        </form>
        <div class="blank"></div>
        <Table v-show="list.length > 0" />
      </v-col>
    </v-row>
    <error></error>
  </v-container>
</template>

<script>
import Table from './writeTable'
import error from './error'
export default {
  components: {
    Table,
    error
  },
  data: () => ({
    save: true,
    bigCategory: '',
    smallCategory: '',
    date: '',
    price: '',
    revenueCheck: false,
    costCheck: true,
    revenue: 0,
    cost: 0,
    card: '',
    sort: '',
    items: [
      '현금',
      '현대',
      'KB',
      '롯데',
      '삼성',
      '신한',
      '우리'
    ],
    rules: {
      required: value => !!value || '내용을 입력해주세요.'
    }
  }),
  computed: {
    list () {
      return this.$store.state.addAccountList
    }
  },
  methods: {
    checkBox (data) {
      if (data === 'revenue') {
        this.revenueCheck = true
        this.costCheck = false
        this.revenue = this.price
        this.sort = '수익'
        this.cost = 0
      } else if (data === 'cost') {
        this.revenueCheck = false
        this.costCheck = true
        this.revenue = 0
        this.sort = '지출'
        this.cost = this.price
      }
    },
    writeAccount () {
      console.log(this.bigCategory,
        this.smallCategory,
        this.date,
        this.card,
        this.price)
      const datePattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/
      if (
        this.bigCategory !== '' &&
      this.smallCategory !== '' &&
      datePattern.test(this.date) &&
      this.date !== '' &&
      this.card !== '' &&
      this.price !== '' &&
      Number(this.price)
      ) {
        let revenue
        let sort
        let cost
        if (this.revenueCheck === true) {
          revenue = this.price
          sort = '수익'
          cost = 0
        } else {
          cost = this.price
          sort = '지출'
          revenue = 0
        }

        let card
        this.card === '현금' ? card = 'cash'
          : this.card === '현대' ? card = 'hyundai'
            : this.card === 'KB' ? card = 'kb'
              : this.card === '롯데' ? card = 'lotte'
                : this.card === '삼성' ? card = 'samsung'
                  : this.card === '신한' ? card = 'shinhan'
                    : this.card === '우리' ? card = 'woori' : console.log()
        const data = {
          bigCategory: this.bigCategory,
          smallCategory: this.smallCategory,
          date: this.date,
          cardName: this.card,
          card,
          price: Number(this.price),
          revenue,
          cost,
          sort
        }
        this.save = false
        this.bigCategory = ''
        this.smallCategory = ''
        this.card = ''
        this.price = ''
        this.$store.dispatch('WRITE', data)
      } else if (
        this.bigCategory === '' ||
      this.smallCategory === '' ||
      this.date === '' ||
      this.card === '' ||
      this.price === '') {
        this.$store.state.msg = '값을 채워주세요.'
        this.$store.state.msgModal = true
      } else if (!datePattern.test(this.date) || !Number(this.price)) {
        this.$store.state.msg = '형식에 맞게 입력해주세요.'
        this.$store.state.msgModal = true
      }
    }
  }
}
</script>

<style scoped>
.login_btn{
    color: white;
  }
.blank{
  margin-top: 10px;
}
</style>
