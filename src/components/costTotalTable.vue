<template>
  <div class="blank">
  <h4>
    총 지출 내역
  </h4>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              종류
            </th>
            <th class="text-left">
              금액
            </th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{'account_none':cash === 0}">
            <td>
              현금
            </td>
            <td>
              {{cash}}
            </td>
          </tr>
          <tr :class="{'account_none':hyundai === 0}">
            <td >
              현대
            </td>
            <td>
              {{hyundai}}
            </td>
          </tr>
          <tr :class="{'account_none':kb === 0}">
            <td>
              KB
            </td>
            <td>
              {{kb}}
            </td>
          </tr>
          <tr :class="{'account_none':lotte === 0}">
            <td>
              롯데
            </td>
            <td>
              {{lotte}}
            </td>
          </tr>
          <tr :class="{'account_none':samsung === 0}">
            <td>
              삼성
            </td>
            <td>
              {{samsung}}
            </td>
          </tr>
          <tr :class="{'account_none':shinhan === 0}">
            <td>
              신한
            </td>
            <td>
              {{shinhan}}
            </td>
          </tr>
          <tr :class="{'account_none':woori === 0}">
            <td>
              우리
            </td>
            <td>
              {{woori}}
            </td>
          </tr>
          <tr>
            <td>
              총 지출
            </td>
            <td>
              {{total}}
            </td>
          </tr>
          <tr>
            <td>
              총 수익
            </td>
            <td>
              {{revenue}}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  computed: {
    hyundai () {
      return this.$store.state.hyundai
    },
    kb () {
      return this.$store.state.kb
    },
    lotte () {
      return this.$store.state.lotte
    },
    samsung () {
      return this.$store.state.samsung
    },
    shinhan () {
      return this.$store.state.shinhan
    },
    woori () {
      return this.$store.state.woori
    },
    cash () {
      return this.$store.state.cash
    },
    total () {
      return this.$store.state.total
    },
    revenue () {
      return this.$store.state.revenue
    }
  }
}
</script>

<style scoped>
.blank{
  margin-top: 10px;
}
.account_none{
  display: none;
}
</style>
