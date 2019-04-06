<template>
  <q-page class="container">
    <div class="row window-height">
      <Card :title="$t('proof.plural')" url="find/proof" color="deep-orange-5"/>
      <Card :title="$t('simulate.plural')" url="find/simulate" color="deep-orange-10"/>
      <Card :title="$t('list.plural')" url="find/list" color="deep-orange-14"/>
    </div>
  </q-page>
</template>

<style>
.window-height {
  height: 93vh !important
}
</style>

<script>
import Card from '../components/Card.vue'

export default {
  name: 'PageIndex',
  components: {
    Card: Card
  }
}
</script>
