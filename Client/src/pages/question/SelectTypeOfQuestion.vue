<template>
    <q-page>
      <div class="row">
        <div class="col-12 col-sm-12">
          <q-banner inline-actions class="bg-secondary text-white">
            Ajude uma pessoa, crie uma questão!
            <template v-slot:action>
              <q-btn outiline color="positive" to="/question/create" :label="$t('question.create')" />
            </template>
          </q-banner>
        </div>
      </div>
      <div class="row q-col-gutter-sm q-pt-sm q-pl-md q-pr-md">
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
