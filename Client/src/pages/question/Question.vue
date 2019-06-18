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
            <h5 class="caption">{{title}}</h5>
            <p class="caption">{{subTitle}}</p>
          </div>
          <div class="q-pb-md text-center">
            <q-list link v-for="option in options" v-bind:key="option.value">
              <q-item tag="label">
                <q-item-section avatar>
                  <q-radio :disable="answered" :color="option.color" v-model="answerSelected" :val="option.value" />
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
import { AnswersService, QuestionsService, FullQuestionsService } from '../../resource'

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

      // Question info
      id: null,
      title: null,
      subTitle: null,
      correctOption: null,
      // When is associated to predeterminated list and have year
      options: []
    }
  },
  methods: {
    seeAnswer () {
      if (this.answerSelected) {
        this.options.forEach(option => {
          if (parseInt(option.value) === parseInt(this.correctOption)) {
            option.color = 'green'
            if (parseInt(option.value) === parseInt(this.answerSelected)) this.questionsCorrect++
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
        this.timeForQuestion = this.initialTime
        this.getNext()
      } else {
        this.timeForQuestion--
      }
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
      this.getQuestion()
    },
    async getQuestion () {
      try {
        let types = `[`
        let totalTypes = this.types.length
        this.types.forEach((type, index) => {
          if (index === totalTypes - 1) types += `${type}`
          else types += `${type},`
        })
        types += ']'
        let response = await QuestionsService.fetch('query', {
          subjects: types,
          professor: this.professors,
          year: this.year,
          userId: parseInt(this.$store.state.user.id),
          limit: 1
        })
        this.answerSelected = ''
        this.answered = false

        this.id = response.data[0].id
        let alreadyAnswer = false
        this.questionsAnswered.forEach(question => {
          if (parseInt(question.questionId) === parseInt(this.id)) {
            alreadyAnswer = true
          }
        })
        if (alreadyAnswer || response.data.length === 0) {
          this.finishProof()
          return
        }
        response = await FullQuestionsService.fetch(`${response.data[0].externalId}`)
        this.title = response.data.title
        this.subTitle = response.data.subTitle
        this.correctOption = response.data.correctOption
        // this.options = response.data.options
        this.options = []
        response.data.options.forEach(option => {
          this.options.push({
            label: option.label,
            value: option.value,
            color: ''
          })
        })
      } catch (err) {
        // show notify message when can't get next question
        this.$q.notify({ type: 'info', message: this.$t('alert.cantGetQuestion'), position: 'center', closeBtn: this.$t('close') })
        this.finishProof()
      }
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
        try {
          AnswersService.create('', {
            optionExternalId: this.answerSelected,
            customUserId: this.$store.state.user.id,
            questionId: this.id
          })
        } catch (err) {
          console.err(err)
        }
        this.getQuestion()
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
