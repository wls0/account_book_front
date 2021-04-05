<template>
  <v-container>
    <v-row justify="center">
      <div class="center">
        <p class="sign_title">
          회원가입
        </p>
      </div>
    </v-row>
    <form @submit.prevent="signUp">
      <form @submit.prevent="checkId">
        <v-row>
          <v-col
            xs="11"
            sm="11"
            md="11"
            lg="11"
            xl="11"
          >
            <v-text-field
              v-if="this.$store.state.idCheck === true"
              v-model="id"
              label="아이디"
              :rules="[rules.required]"
              outlined
              dense
            />
            <v-text-field
              v-else
              v-model="id"
              disabled
              label="아이디"
              :rules="[rules.required]"
              outlined
              dense
            />
          </v-col>
          <v-col>
            <v-btn
              v-if="this.$store.state.idCheck === true"
              class="id_check_btn"
              color="#673ab7"
              @click="checkId"
            >
              아이디 확인
            </v-btn>
            <v-btn
              v-else
              disabled
              class="id_check_btn"
              color="#673ab7"
              @click="checkId"
            >
              아이디 확인
            </v-btn>
          </v-col>
        </v-row>
      </form>
      <v-row>
        <v-col
          xs="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"
        >
          <v-text-field
            v-model="password"
            label="비밀번호"
            outlined
            dense
            :rules="[rules.required]"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
          />
          <v-text-field
            v-model="passwordCheck"
            label="비밀번호 확인"
            outlined
            dense
            :rules="[rules.required]"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show2 = !show2"
          />
          <v-btn
            block
            class="sign_btn"
            color="#673ab7"
            sm="12"
            @click="signUp"
          >
            회원가입
          </v-btn>
        </v-col>
      </v-row>
    </form>
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
    passwordCheck: '',
    show1: false,
    show2: false,
    rules: {
      required: value => !!value || '값을 입력해주세요.'
    }
  }),
  methods: {
    signUp () {
      if (this.password === this.passwordCheck) {
        const box = {
          id: this.id,
          password: this.password
        }
        this.$store.dispatch('SIGN_UP', box)
      } else {
        this.$store.state.msg = '비밀번호값이 다릅니다'
        this.$store.state.msgModal = true
      }
    },
    checkId () {
      this.$store.dispatch('FIND_ID', this.id)
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
.sign_title {
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: 900;
  color: #673ab7;
}
.id_check_btn{
  color: white;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 39px;
  min-width: 64px;
  padding: 0 16px;
}
.sign_btn{
  color: white;
}
</style>
