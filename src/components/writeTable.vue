<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            사용내역
          </th>
          <th class="text-left">
            카드
          </th>
          <th class="text-left">
            종류
          </th>
          <th class="text-left">
            금액
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in tableList"
          :key="i"
        >
          <td>{{ item.bigCategory }}</td>
          <td>{{ item.cardName }}</td>
          <td>{{ item.sort }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  computed: {
    tableList () {
      return this.$store.state.addAccountList
    }
  }
}
</script>

<style>

</style>
