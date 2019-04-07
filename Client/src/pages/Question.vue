<template>
    <q-page class="container">
      <div class="row window-height">
        <ButtonCard :title="$t('subject.plural')" url="/question/subject" color="deep-orange-6"/>
        <ButtonCard :title="$t('tender.plural')" url="/question/tender" color="deep-orange-7"/>
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
  name: 'PageFind',
  components: {
    ButtonCard: ButtonCard
  },
  data () {
    return {
      subject: {
        selected: []
      }
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
