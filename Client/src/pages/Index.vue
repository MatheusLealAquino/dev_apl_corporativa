<template>
  <q-page class="container">
    <div class="row window-height">
      <ButtonCard :title="$t('question.plural')" url="/question"      color="deep-orange-6"/>
      <ButtonCard :title="$t('list.plural')"     url="/find/list"     color="deep-orange-7"/>
      <ButtonCard :title="$t('proof.plural')"    url="/find/proof"    color="deep-orange-8"/>
    </div>
  </q-page>
</template>

<style>
.window-height {
  height: 93vh !important
}
</style>

<script>
import ButtonCard from '../components/ButtonCard.vue'

export default {
  name: 'PageIndex',
  components: {
    ButtonCard: ButtonCard
  }
}
</script>
