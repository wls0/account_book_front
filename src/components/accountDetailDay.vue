<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              사용내역
            </th>
            <th class="text-left">
              종류
            </th>
            <th class="text-left">
              금액
            </th>
            <th class="text-left">
              확인
            </th>
            <th class="text-left">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in list"
            :key="i"
          >
            <td>{{ item.bigCategory }}</td>
            <td>{{ item.card }}</td>
            <td>{{ item.cost }}</td>
            <td>
              <i
                class="fas fa-edit"
                @click="detail(item.bigCategory, item.smallCategory, item.cost, item.card, item.id)"
              />
            </td>
            <td>
              <i
                class="fas fa-trash"
                @click="deleteModal = true, deleteReady(item.id)"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog
      v-model="modal"
      transition="dialog-top-transition"
      max-width="600"
      height="300"
    >
      <v-card>
        <v-toolbar
          color="#673ab7"
          dark
        >
          {{ bigCategory }}
        </v-toolbar>
        <v-card-text v-if="edit === false">
          <div class="error_msg">
            상세내역: {{ smallCategory }}
          </div>
          <div class="error_msg">
            가격: {{ cost }}
          </div>
        </v-card-text>
        <v-card-text v-else>
          <form @submit.prevent="writeAccount">
            <div class="blank" />
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
            <v-select
              v-if="revenue === true"
              v-model="card"
              :items="items"
              label="카드"
            />
            <v-select
              v-else
              v-model="card"
              disabled
              :items="items"
              label="카드"
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
              수정
            </v-btn>
          </form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            v-show="btn"
            text
            @click="edit = true, btn =false"
          >
            수정
          </v-btn>
          <v-btn
            text
            @click="modal = false, edit = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteModal"
      transition="dialog-top-transition"
      max-width="600"
      height="300"
    >
      <v-card>
        <v-toolbar
          color="#673ab7"
          dark
        >
          삭제!!
        </v-toolbar>
        <v-card-text>
          <div class="error_msg">
            삭제 하시겠습니까?
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="deleteAccount()"
          >
            삭제
          </v-btn>
          <v-btn
            text
            @click="modal = false, edit = false, deleteModal = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
export default {
  data: () => ({
    modal: false,
    deleteModal: false,
    id: '',
    edit: false,
    revenue: true,
    btn: true,
    smallCategory: '',
    bigCategory: '',
    cost: '',
    items: [
      '현금',
      '현대',
      'KB',
      '롯데',
      '삼성',
      '신한',
      '우리'
    ],
    card: ''
  }),
  computed: {
    list () {
      return this.$store.state.accountList
    }
  },
  methods: {
    detail (bigCategory, smallCategory, cost, card, id) {
      this.modal = true
      this.bigCategory = bigCategory
      this.smallCategory = smallCategory
      this.cost = cost
      console.log(card)
      if (card === '수익') {
        this.revenue = false
      } else {
        this.revenue = true
      }
      this.card = card
      this.id = id
    },
    writeAccount () {
      let card
      this.card === '현금' ? card = 'cash'
        : this.card === '현대' ? card = 'hyundai'
          : this.card === 'KB' ? card = 'kb'
            : this.card === '롯데' ? card = 'lotte'
              : this.card === '삼성' ? card = 'samsung'
                : this.card === '신한' ? card = 'shinhan'
                  : this.card === '우리' ? card = 'woori'
                    : this.card === '수익' ? card = 'revenue' : console.log()
      // const month = dayjs(this.$route.params.day).format('YYYY-MM')
      const data = {
        id: this.id,
        bigCategory: this.bigCategory,
        smallCategory: this.smallCategory,
        date: this.$route.params.day,
        // month,
        card,
        cost: Number(this.cost)
      }
      this.$store.dispatch('EDIT', data)
    },
    deleteReady (id) {
      this.id = id
    },
    deleteAccount () {
      const data = {
        id: this.id,
        date: this.$route.params.day
      }
      this.$store.dispatch('DELETE', data)
    }
  }
}
</script>

<style scoped>
.error_msg{
  font-weight: bold;
  margin-top: 10px;
}
.blank{
  margin-bottom: 10px;
}
.login_btn{
    color: white;
  }
</style>
