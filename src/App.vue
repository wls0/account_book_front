<template>
  <v-app id="inspire">
    <div>
      <v-app-bar
        color="#673ab7"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true" />
        <v-toolbar-title>가계부</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item
              router-link
              to="/login"
            >
              <v-list-item-icon>
                <i class="fas fa-user-alt" />
              </v-list-item-icon>

              <v-list-item-title v-if="login === false">
                로그인
              </v-list-item-title>
              <v-list-item-title
                v-else
                @click="logout()"
              >
                로그아웃
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-show="login"
              router-link
              :to="{ name:'month', params:{ month : month }}"
            >
              <v-list-item-icon>
                <i class="fas fa-home" />
              </v-list-item-icon>
              <v-list-item-title>월 화면</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-show="login"
              router-link
              :to="{ name:'year', params:{ year : year }}"
            >
              <v-list-item-icon>
                <i class="far fa-file-alt" />
              </v-list-item-icon>
              <v-list-item-title>년 가계부</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-show="login"
              router-link
              :to="{ name:'write'}"
            >
              <v-list-item-icon>
                <i
                  id="fix_plus"
                  class="fas fa-file-signature"
                />
              </v-list-item-icon>
              <v-list-item-title>가계부 작성</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data: () => ({
    drawer: false,
    group: null,
    month: '',
    year: ''
  }),
  computed: {
    login () {
      return this.$store.getters.isLogin
    }
  },
  created () {
    this.month = dayjs(new Date()).format('YYYY-MM')
    this.year = dayjs(new Date()).format('YYYY')
  },
  methods: {
    logout () {
      console.log('hi?')
      this.$store.dispatch('LOGOUT')
    }
  }
}
</script>
<style scoped>
.far {
  margin-top: 3px;
  margin-left: 5px;
}
.fa, .fas {
    font-family: "Font Awesome 5 Pro";
    font-weight: 900;
    margin-top: 3px;
    margin-left: 2px;
}
#fix_plus{
  font-weight: 400;
  margin-left: 5px;
}
</style>
