<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12">
        <div class="center">
          <p class="login_title">
            login
          </p>
        </div>
        <form @submit.prevent="loginSubmit">
          <v-text-field
            v-model="id"
            label="아이디"
            :rules="[rules.required]"
            outlined
            dense
          />
          <v-text-field
            v-model="password"
            label="비밀번호"
            outlined
            dense
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
          />
          <div class="right">
            <a
              class="black_a"
              @click="signUp"
            >회원가입</a>
          </div>
          <v-btn
            block
            class="login_btn"
            color="#673ab7"
            sm="12"
            @click="loginSubmit"
          >
            로그인
          </v-btn>
        </form>
      </v-col>
    </v-row>
    <v-col cols="auto">
      <error />
    </v-col>
  </v-container>
</template>

<script>
import error from './error'
export default {
  components: {
    error
  },
  data: () => ({
    id: '',
    password: '',
    show1: false,
    rules: {
      required: value => !!value || '값을 입력해주세요.'
    }
  }),
  computed: {},
  methods: {
    loginSubmit () {
      if (this.id !== '' && this.password !== '') {
        this.$store.dispatch('LOGIN', { id: this.id, password: this.password })
        this.clearForm()
      } else {
        this.$store.state.msg = '값을 채워주세요.'
        this.$store.state.msgModal = true
      }
    },
    clearForm () {
      setTimeout(() => {
        this.id = ''
        this.password = ''
      }, 2000)
    },
    signUp () {
      this.$store.dispatch('MOVE_SIGNUP_PAGE')
    }
  }
}
</script>
<style scoped>
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.black_a{
  color:#808080;
}
.login_title {
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: 900;
  color: #673ab7;
}
.login_btn {
  color: white;
}
</style>
