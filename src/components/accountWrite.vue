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
            v-if="save === true"
            v-model="date"
            label="날짜"
            placeholder="ex)20210215"
            outlined
            dense
          />
          <v-text-field
            v-else
            v-model="date"
            label="날짜"
            disabled
            outlined
            dense
          />
          <v-text-field
            v-model="bigCategory"
            label="사용내역"
            outlined
            dense
          />
          <v-text-field
            v-model="smallCategory"
            label="상세내역"
            outlined
            dense
          />
          <v-row>
            <v-col
              sm="6"
            >
              <v-checkbox
                v-model="costCheck"
                label="지출"
                @click="checkBox('cost')"
              />
            </v-col>
            <v-col
              sm="6"
            >
              <v-checkbox
                v-model="revenueCheck"
                label="수익"
                @click="checkBox('revenue')"
              />
            </v-col>
          </v-row>
          <v-select
            v-if="revenueCheck ===false"
            v-model="card"
            :items="items"
            label="카드"
          />
          <v-select
            v-else
            v-model="card"
            :items="items"
            label="카드"
            disabled
          />
          <v-text-field
            v-model="cost"
            label="금액"
            placeholder="ex)50000"

            outlined
            dense
          />
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
        <div class="blank" />
        <Table v-show="list.length > 0" />
      </v-col>
    </v-row>
    <error />
  </v-container>
</template>

<script>
import Table from './writeTable'
import error from './error'
import dayjs from 'dayjs'
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
    revenueCheck: false,
    costCheck: true,
    cost: '',
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
    ]
    // rules: {
    //   required: value => !!value || '내용을 입력해주세요.'
    // }
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
        this.sort = '수익'
        this.card = 'revenue'
      } else if (data === 'cost') {
        this.revenueCheck = false
        this.costCheck = true
        this.sort = '지출'
      }
    },
    writeAccount () {
      const datePattern = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/
      if (
        this.bigCategory !== '' &&
      datePattern.test(this.date) &&
      this.date !== '' &&
      this.card !== '' &&
      this.cost !== '' &&
      Number(this.cost)
      ) {
        let sort
        if (this.revenueCheck === true) {
          this.card = '수익'
          sort = '수익'
        } else {
          sort = '지출'
        }
        let card
        this.card === '현금' ? card = 'cash'
          : this.card === '현대' ? card = 'hyundai'
            : this.card === 'KB' ? card = 'kb'
              : this.card === '롯데' ? card = 'lotte'
                : this.card === '삼성' ? card = 'samsung'
                  : this.card === '신한' ? card = 'shinhan'
                    : this.card === '우리' ? card = 'woori'
                      : this.card === '수익' ? card = 'revenue' : console.log()
        const data = {
          bigCategory: this.bigCategory,
          smallCategory: this.smallCategory,
          date: dayjs(this.date).format('YYYY-MM-DD'),
          cardName: this.card,
          card,
          cost: Number(this.cost),
          sort
        }
        this.$store.dispatch('WRITE', data)
        this.save = false
        this.bigCategory = ''
        this.smallCategory = ''
        this.card = ''
        this.cost = ''
      } else if (
        this.bigCategory === '' ||
      this.date === '' ||
      this.card === '' ||
      this.cost === '') {
        this.$store.state.msg = '값을 채워주세요.'
        this.$store.state.msgModal = true
      } else if (!datePattern.test(this.date) || !Number(this.cost)) {
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
