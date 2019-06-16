<template>
    <q-page>
      <div class="row q-col-gutter-sm q-pt-md q-pl-md q-pr-md">
        <div class="col-12 col-md-6">
          <ButtonCard :title="$t('subject.plural')" url="/question/subject" color="blue-5"/>
        </div>
        <div class="col-12 col-md-6">
          <ButtonCard :title="$t('tender.plural')" url="/question/tender" color="blue-5"/>
        </div>
      </div>
    </q-page>
</template>

<style>
.window-height {
  height: 93vh !important
}
</style>

<script>
import ButtonCard from '../../components/ButtonCard.vue'

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
