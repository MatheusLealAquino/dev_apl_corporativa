<template>
  <q-page class="padding q-pt-md">
    <div v-if="canAnswer">
      <div class="row justify-center">
        <div class="col-sm-10 col-md-8">
          <div class="col-12 text-center q-mb-md">
            <q-btn color="primary" label="Finalizar" flat @click="canAnswer=false"/>

            <q-circular-progress
              v-if="time>0 || timeForQuestion>0"
              show-value
              class="text-light-blue q-ma-md"
              :value="time == 0 ? timeForQuestion : time"
              :max="initialTime"
              size="50px"
              color="light-blue"
            />
          </div>
          <div class="text-center">
            <h4 class="caption">{{title}}</h4>
          </div>
          <div class="q-pb-md text-center">
            <q-list link v-for="option in options" v-bind:key="option.id">
              <q-item tag="label">
                <q-item-section avatar>
                  <q-radio :disable="answered" :color="option.color" v-model="answerSelected" :val="option.id" />
                </q-item-section>
                <q-item-section>
                  <div class="row">
                    <div class="col-md-11">
                      <q-item-label :color="option.color" title>{{option.label}}</q-item-label>
                    </div>
                    <div class="col-md-1" v-if="option.explanation && answered">
                      <q-btn flat icon="info" @click="showModalInfo(option)"/>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="row justify-center q-pb-md">
        <div class="col-sm-1 col-md-2"></div>
        <div class="col-sm-3 col-md-4">
          <q-btn outline color="primary" :disable="answered" class="full-width" @click="seeAnswer()">
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
    </div>
    <div v-else>
      <div class="row justify-center q-pb-md">
        <div class="col-12 text-center">
          <h2>Prova Finalizada</h2>
        </div>
        <div class="col-10">
          <q-card class="my-card">
            <q-card-section>
              <ul>
                <li v-if="usingTimeForProof">Tempo de prova: <b>{{initialTime/60}}</b> minutos</li>
                <li v-if="usingTimeForQuestion">Tempo de cada questão: <b>{{initialTime/60}}</b> minuto(s)</li>
                <li>Questões corretas: {{questionsCorrect}}</li>
                <li>Questões respondidas: {{questionsAnswered.length}}</li>
              </ul>
            </q-card-section>
          </q-card>
          <div class="text-center q-mt-sm">
            <q-btn color="primary" :label="$t('back')" flat to="/question"/>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="showInfo" ref="modalRef">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{$t('explanation')}}</div>
        </q-card-section>

        <q-card-section style="padding: 50px">
          {{optionSelected.explanation}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('close')" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
import { AnswersService, QuestionsService } from '../resource'

export default {
  name: 'QuestionSubject',
  data () {
    return {
      // Flag to determine when finish proof
      canAnswer: true,
      // Variable to keep interval
      interval: '',
      // Time to show
      usingTimeForProof: false,
      time: 0,
      initialTime: 0,
      // Time for question
      usingTimeForQuestion: false,
      timeForQuestion: 0,
      // Type of question to load
      types: [],
      // Professor who have created the question to load
      professors: [],
      // List of questions answered
      questionsAnswered: [],
      questionsCorrect: 0,
      // Index of question in array
      questionIndex: { last: 0, new: 1 },
      // Flag to determine when show or don't show dialog(modal)
      showInfo: false,
      // Determine when user has selected one option
      answered: false,
      // Aux variable to keep option to show dialog(modal)
      optionSelected: {},
      // Id of option selected
      answerSelected: '',
      numberQuestion: '1',

      // Question info
      id: '',
      title: 'Pergunta 1',
      // When is associated to predeterminated list and have year
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
          if (option.correct) {
            option.color = 'green'
            if (option.id === this.answerSelected) this.questionsCorrect++
          } else {
            option.color = 'negative'
          }
        })
        this.answered = true

        // set question to array to make list of questions
        this.questionsAnswered.push({
          questionId: this.id,
          optionSelected: this.answerSelected
        })
      } else {
        // show notify message when don't have any option selected
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
    decrementTimeProof () {
      if (this.time === 0) this.finishProof()
      else this.time--
    },
    decrementTimeQuestion () {
      if (this.timeForQuestion === 0) {
        // this.seeAnswer()
        this.timeForQuestion = this.initialTime
        this.getNext()
      } else this.timeForQuestion--
    },
    incrementTime () {
      this.initialTime++
    },
    finishProof () {
      clearInterval(this.interval)
      this.canAnswer = false
    },
    begin () {
      if (this.$q.localStorage.getItem('useTimeForProof')) {
        this.usingTimeForProof = true
        let timeSelected = parseInt(this.$q.localStorage.getItem('timeForProof'))
        if (timeSelected === '30') {
          this.time = timeSelected
          this.initialTime = 30
        } else {
          this.time = timeSelected * 60
          this.initialTime = timeSelected * 60
        }
        // chamar a cada 1 minuto (60000 ms)
        this.interval = setInterval(this.decrementTimeProof, 60000)
      } else if (this.$q.localStorage.getItem('useTimeForQuestion')) {
        this.usingTimeForQuestion = true
        let timeSelected = parseInt(this.$q.localStorage.getItem('timeForQuestion'))
        timeSelected = timeSelected * 60
        this.initialTime = timeSelected
        this.timeForQuestion = timeSelected
        // chamar a cada 1 segundo (10000 ms)
        this.interval = setInterval(this.decrementTimeQuestion, 1000)
      }
      this.id = '1'
    },
    showModalInfo (selected) {
      this.showInfo = !this.showInfo
      this.optionSelected = selected
    },
    async get (questionId) {
      let response = await QuestionsService.fetch(questionId)
      return response
    },
    async getNext () {
      if (this.answerSelected) {
        AnswersService.create('', {
          'optionExternalId': this.answerSelected,
          'customUserId': 0,
          'questionId': this.id
        })
      }
      this.numberQuestion++
      try {
        let response = await QuestionsService.fetch('query', {
          subject: this.types,
          professor: this.professors,
          year: this.year,
          repeated: false,
          limit: 1
        })

        this.answerSelected = ''
        this.answered = false
        this.questionIndex.new++

        this.id = response.data.id
        this.title = response.data.title
        this.options = response.data.options
      } catch (err) {
        console.error(err)
        // show notify message when can't get next question
        this.$q.notify({ type: 'info', message: this.$t('alert.cantGetQuestion'), position: 'center', closeBtn: this.$t('close') })
        this.finishProof()
      }
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.types = this.filterResponse(this.$route.query.type)
    this.professors = this.filterResponse(this.$route.query.professor)
    this.year = this.$route.query.year

    this.begin()
  }
}
</script>
