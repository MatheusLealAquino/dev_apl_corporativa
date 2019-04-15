<template>
  <q-page>
    <div class="row gutter-sm q-pt-md q-pl-md q-pr-md">
      <div class="col-12 col-md-4">
        <ButtonCard :title="$t('question.plural')" url="/question"      color="deep-orange-6"/>
      </div>
      <div class="col-12 col-md-4">
        <ButtonCard :title="$t('list.plural')"     url="/find/list"     color="deep-orange-7"/>
      </div>
      <div class="col-12 col-md-4">
        <ButtonCard :title="$t('proof.plural')"    url="/find/proof"    color="deep-orange-8"/>
      </div>
    </div>
  </q-page>
</template>

<style>
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
