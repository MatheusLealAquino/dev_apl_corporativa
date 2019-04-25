<template>
  <q-page class="padding q-pt-md">
    <div class="row justify-center">
      <div class="col-sm-10 col-md-8">
        <div class="text-center">
          <h4 class="caption">{{title}}</h4>
        </div>
        <div class="q-pb-md text-center">
          <q-list link v-for="option in options" v-bind:key="option.id">
            <q-item tag="label">
              <q-item-side>
                <q-radio :disable="answered" :color="option.color" v-model="answerSelected" :val="option.id" />
              </q-item-side>
              <q-item-main>
                <div class="row">
                  <div class="col-md-11">
                    <q-item-tile :color="option.color" title>{{option.label}}</q-item-tile>
                  </div>
                  <div class="col-md-1" v-if="option.explanation && answered">
                    <q-btn flat icon="info" @click="showModalInfo(option)"/>
                  </div>
                </div>
              </q-item-main>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <div class="row justify-center q-pb-md">
      <!--- Back button -->
      <div class="col-sm-1 col-md-2 text-right">
        <!--<q-btn
          outline
          flat
          icon="navigate_before"
          color="primary"
        />-->
      </div>
      <div class="col-sm-3 col-md-4">
        <q-btn outline color="primary" class="full-width" @click="seeAnswer()">
          {{$t('seeAnswer')}}!
        </q-btn>
      </div>
      <!-- Next button -->
      <div class="col-sm-1 col-md-2">
        <q-btn
          flat
          outline
          @click="getNext()"
          icon="navigate_next"
          color="primary"
        />
      </div>
    </div>

    <q-modal v-model="showInfo" minimized ref="modalRef">
      <div style="padding: 50px">
        <p> {{optionSelected.explanation}} </p>
        <q-btn color="red" @click="showInfo = !showInfo" :label="$t('close')" />
      </div>
    </q-modal>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'QuestionSubject',
  data () {
    return {
      id: '',
      types: [],
      year: '',
      showInfo: false,
      answered: false,
      optionSelected: {},
      answerSelected: '',
      title: 'Pergunta 1',
      options: [
        { id: 1, label: 'a) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .', value: 'a', color: '', correct: true, explanation: 'Acertou mizeravi!' },
        { id: 2, label: 'b) Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum a.', value: 'b', color: '', correct: false, explanation: 'Tu é burro hein...' },
        { id: 3, label: 'c) Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .', value: 'c', color: '', correct: false, explanation: 'Passou longe dessa vez...' }
      ]
    }
  },
  methods: {
    seeAnswer () {
      if (this.answerSelected) {
        this.options.forEach(option => {
          if (option.correct) option.color = 'green'
          else option.color = 'negative'
        })
        this.answered = true
      } else {
        this.$q.notify({ type: 'info', message: this.$t('alert.chooseOption'), position: 'center', closeBtn: this.$t('close') })
      }
    },
    filterResponse (response) {
      if (response) {
        if (response.length > 1) return response
        return [response]
      }
      return []
    },
    begin () {
      if (this.id) return ''
    },
    showModalInfo (selected) {
      this.showInfo = !this.showInfo
      this.optionSelected = selected
    },
    async getNext () {
      let response = await this.$axios(`/question/`, { types: this.types, year: this.year, actualQuestion: this.id })
      console.log(response)
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.types = this.filterResponse(this.$route.query.type)
    this.year = this.$route.query.year

    this.begin()
  }
}
</script>
