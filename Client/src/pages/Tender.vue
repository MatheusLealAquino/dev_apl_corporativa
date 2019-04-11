<template>
    <q-page class="container padding q-pt-md">
        <div class="row q-pl-md q-pr-md">
            <div class="col-12 q-mb-md">
                <q-select
                    multiple
                    chips
                    filter
                    color="deep-orange"
                    :float-label="`${$t('search')} ${$t('tender.plural')}`"
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
          <div class="col-12">
            <q-pagination v-model="page" input class="justify-center" :max="17" />
          </div>
          <QuestionCard :title="question.title" :options="question.options"/>
        </div>
    </q-page>
</template>

<style>

</style>

<script>
import AdvancedSetting from '../components/AdvancedSetting.vue'
import QuestionCard from '../components/QuestionCard.vue'

export default {
  name: 'PageTender',
  components: {
    AdvancedSetting: AdvancedSetting,
    QuestionCard: QuestionCard
  },
  data () {
    return {
      page: 1,
      begin: false,
      subjectSelect: [],
      listOptionsSubjects: [
        {
          label: 'ENEM',
          value: 'ENEM'
        },
        {
          label: 'Concurso UFF',
          value: 'Concurso_UFF'
        }
      ],
      question: {
        title: 'Pergunta 1',
        options: [
          { label: 'a) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .', value: 'a', color: '', correct: true },
          { label: 'b) Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum a.', value: 'b', color: '', correct: false },
          { label: 'c) Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .', value: 'c', color: '', correct: false }
        ]
      },
      questions: []
    }
  },
  methods: {
    getQuestions () {
      if (this.subjectSelect.length === 0) {
        this.$q.notify({ type: 'negative', message: 'Selecione ao menos uma matéria!', position: 'center' })
      } else {
        this.begin = true
      }
    }
  },
  watch: {
    subjectSelect (newVal) {
      if (newVal.length === 0) this.begin = false
    },
    page (newVal) {
      this.question = {
        title: `Pergunta ${newVal}`,
        options: [
          { label: 'a) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .', value: 'a', color: '', correct: true },
          { label: 'b) Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum a.', value: 'b', color: '', correct: false },
          { label: 'c) Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .', value: 'c', color: '', correct: false }
        ]
      }
    }
  }
}
</script>
