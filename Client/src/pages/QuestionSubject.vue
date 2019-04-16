<template>
  <q-page class="padding q-pt-xl">
    <div class="row justify-center">
      <div class="col-md-2 col-sm-5 q-mr-md">
        <q-btn
          outline
          :label="$t('back')"
          icon="navigate_before"
          class="full-width"
          color="primary"
        />
      </div>

      <div class="col-md-2 col-sm-5">
        <q-btn
          outline
          :label="$t('next')"
          icon-right="navigate_next"
          class="full-width"
          color="primary"
        />
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-sm-12 col-md-6">
        <QuestionCard title="Pergunta 1" :options="options"/>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import QuestionCard from '../components/QuestionCard.vue'

export default {
  name: 'QuestionSubject',
  components: {
    QuestionCard: QuestionCard
  },
  data () {
    return {
      options: [
        { label: 'a) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .', value: 'a', color: '', correct: true },
        { label: 'b) Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum a.', value: 'b', color: '', correct: false },
        { label: 'c) Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .', value: 'c', color: '', correct: false }
      ]
    }
  },
  mounted () {

  }
}
</script>
