<template>
  <v-container>
    <div id="app">
      <v-app id="inspire">
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-dialog
              v-model="error"
              persistent
              transition="dialog-top-transition"
              max-width="600"
              height="300"
            >
              <v-card>
                <v-toolbar
                  color="#673ab7"
                  dark
                >
                  오류!!
                </v-toolbar>
                <v-card-text>
                  <p class="error_msg">
                    {{ this.$store.state.msg }}
                  </p>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="close"
                  >
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-app>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    error () {
      return this.$store.state.msgModal
    }
  },
  methods: {
    close () {
      this.$store.state.msg = ''
      this.$store.state.msgModal = false
    }
  }
}
</script>
<style scoped>
.error_msg{
  font-weight: bold;
  margin-top: 10px;
}
</style>
