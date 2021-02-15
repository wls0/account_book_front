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
          <td @click="detail(item.bigCategory, item.smallCategory, item.cost, item.card, item.id)"><i class="fas fa-edit"></i></td>
          <td @click="deleteModal = true, deleteReady(item.id)"><i class="fas fa-trash"></i></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-dialog
    transition="dialog-top-transition"
    v-model="modal"
    max-width="600"
    height="300"
  >
    <v-card>
      <v-toolbar
        color="#673ab7"
        dark
      >{{bigCategory}}</v-toolbar>
      <v-card-text v-if="edit === false">
        <div class="error_msg" >상세내역: {{smallCategory}}</div>
        <div class="error_msg" >가격: {{cost}}</div>
      </v-card-text >
      <v-card-text v-else>
        <form @submit.prevent="writeAccount">
          <div class="blank"></div>
        <v-text-field
            label="사용내역"
            v-model="bigCategory"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="상세내역"
            v-model="smallCategory"
            outlined
            dense
          ></v-text-field>
          <v-select
            v-if="revenue === true"
            v-model="card"
            :items="items"
            label="카드"
          />
          <v-select
            v-else
            disabled
            v-model="card"
            :items="items"
            label="카드"
          />
          <v-text-field
            label="금액"
            v-model="cost"
            placeholder="ex)50000"
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
            수정
          </v-btn>
          </form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          text
          v-show="btn"
          @click="edit = true, btn =false"
        >수정</v-btn>
        <v-btn
          text
          @click="modal = false, edit = false"
        >닫기</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    transition="dialog-top-transition"
    v-model="deleteModal"
    max-width="600"
    height="300"
  >
    <v-card>
      <v-toolbar
        color="#673ab7"
        dark
      >삭제!!</v-toolbar>
      <v-card-text>
        <div class="error_msg" >삭제 하시겠습니까?</div>
      </v-card-text >
      <v-card-actions class="justify-end">
        <v-btn
          text
          @click="deleteAccount()"
        >삭제</v-btn>
        <v-btn
          text
          @click="modal = false, edit = false, deleteModal = false"
        >닫기</v-btn>

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
