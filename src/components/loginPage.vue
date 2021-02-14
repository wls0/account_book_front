<template>
  <v-container>
    <v-row
    justify="center"
    >
      <v-col
      sm="12"
      >
        <div class="center">
          <p class="login_title">login</p>
        </div>
        <form @submit.prevent="loginSubmit">
        <v-text-field
            label="아이디"
            v-model="id"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="비밀번호"
            outlined
            dense
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
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

       <error></error>

    </v-col>
  </v-container>
</template>

<script>
import error from './error'
export default {
  components: {
    error
  },
  computed: {
  },
  data: () => ({
    id: '',
    password: '',
    show1: false,
    rules: {
      required: value => !!value || '값을 입력해주세요.'
    }
  }),
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
      }, 4000)
    }
  }
}
</script>
<style scoped>
  .center {
    text-align: center;
  }
  .login_title{
    margin-bottom: 16px;
    font-size: 40px;
    font-weight: 900;
    color: #673ab7;
  }
  .login_btn{
    color: white;
  }
</style>
