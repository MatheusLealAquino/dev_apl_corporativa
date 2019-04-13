<template>
    <q-page class="container padding q-pt-md">
        <div class="row q-pl-md q-pr-md">
            <div class="col-12 q-mb-md">
              <q-select
                multiple
                chips
                filter
                color="deep-orange"
                :float-label="`${$t('search')} ${$t('subject.plural')}`"
                v-model="subjectSelect"
                :options="listOptionsSubjects"
              />
            </div>

            <div class="col-12" v-if="!begin">
              <AdvancedSetting />
            </div>

            <div class="col-12 fixed-bottom q-mb-sm q-pl-md q-pr-md">
              <q-btn outline color="primary" class="full-width" v-if="!begin" @click="getQuestions()">
                {{$t('begin')}}!
              </q-btn>
            </div>
        </div>

        <div class="row q-pl-md q-pr-md" v-if="begin">
          <QuestionCard title="Pergunta 1" :options="options"/>
        </div>
    </q-page>
</template>

<style>

</style>

<script>
import AdvancedSetting from '../components/AdvancedSetting.vue'
import QuestionCard from '../components/QuestionCard.vue'

export default {
  name: 'PageSubject',
  components: {
    AdvancedSetting: AdvancedSetting,
    QuestionCard: QuestionCard
  },
  data () {
    return {
      begin: false,
      subjectSelect: [],
      listOptionsSubjects: [
        {
          label: 'Desenvolvimento de Aplicações Corporativas',
          value: 'Desenvolvimento de Aplicações Corporativas'
        },
        {
          label: 'Matemática',
          value: 'Matemática'
        }
      ],
      options: [
        { label: 'a) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .', value: 'a', color: '', correct: true },
        { label: 'b) Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum a.', value: 'b', color: '', correct: false },
        { label: 'c) Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .', value: 'c', color: '', correct: false }
      ]
    }
  },
  methods: {
    getQuestions () {
      if (this.subjectSelect.length === 0) {
        this.$q.notify({ type: 'negative', message: 'Selecione ao menos uma matéria!', position: 'center', closeBtn: this.$t('close') })
      } else {
        this.$axios('question/', { subjects: this.subjectSelect })
        this.begin = true
      }
    }
  },
  watch: {
    subjectSelect (newVal) {
      if (newVal.length === 0) this.begin = false
    }
  }
}
</script>
