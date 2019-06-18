<template>
  <q-page>
    <div class="row q-pa-md justify-center">
      <div class="col-12 col-sm-12 text-center">
        <h4>Cadastrar Questão</h4>
      </div>
      <div class="col-sm-12 col-12">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            v-model="question.title"
            type="text"
            :label="$t('createQuestion.labelTitle')"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || $t('auth.typeSomething')
            ]"
          />

          <q-input
            v-model="question.subTitle"
            type="text"
            autogrow
            :label="$t('createQuestion.labelSubtitle')"
          />

          <q-input
            :label="$t('createQuestion.labelOption')"
            v-model="question.option"
            v-if="question.options.length < 4"
            :disable="question.options.length === 4">
              <template v-slot:append>
                <q-btn round dense flat icon="add" @click="addOption"/>
              </template>
          </q-input>

          <q-select
            v-model="question.options"
            v-if="question.options.length >= 1"
            multiple
            :options="question.options"
            use-chips
            stack-label
          />

          <q-option-group class="bg-grey-4 text-black"
            v-model="question.correctOption"
            :options="question.options"
            color="green"
          />

          <q-select
            v-model="question.subjects"
            v-if="subjectsAll.length >= 1"
            multiple
            :options="subjectsAll"
            use-chips
            stack-label
            :label="$t('subject.plural')"
          />
          <div>
            <q-btn :label="$t('reset')" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn :label="$t('submit')" :disable="question.options.length < 4 && question.subjects.length < 1" type="submit" color="primary" class="float-right"/>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style>

</style>

<script>
import { QuestionsService, SubjectsService } from '../../resource'

export default {
  name: 'CreateQuestion',
  data () {
    return {
      id: null,
      question: {
        title: null,
        subTitle: null,
        correctOption: null,
        options: [],
        subjects: []
      },
      subjectsAll: [],
      option: null
    }
  },
  computed: {
    alreadyLogged: {
      get () {
        return this.$store.getters['user/isLogged']
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.question.correctOption) {
        const dismiss = this.$q.notify({
          color: 'info',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: this.$t('loading')
        })
        try {
          delete this.question.option
          // Create the question
          let response = await QuestionsService.create('', {
            fullQuestion: this.question
          })
          this.id = response.data.id
          this.question.subjects.forEach(async subject => {
            await QuestionsService.update(`${this.id}/subjects/rel/${subject.value}`)
          })
          dismiss()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: this.$t('createQuestion.messageSuccessCreate')
          })
          this.onReset()
        } catch (err) {
          dismiss()
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: `${this.$t('createQuestion.messageFailCreate')}`
          })
        }
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `Seleciona uma opção como a correta!`
        })
      }
    },
    async getSubject () {
      let response = await SubjectsService.fetch('')
      let finalArr = []
      response.data.forEach(obj => {
        finalArr.push({ label: obj.name, value: obj.id })
      })
      this.subjectsAll = finalArr
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    onReset () {
      this.question.title = null
      this.question.subTitle = null
      this.question.correctOption = null
      this.question.options = []
      this.question.subjects = []
    },
    addOption () {
      if (!this.question.option) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `Digite o texto da opção!`
        })
        return
      }
      this.question.options.push({ label: this.capitalizeFirstLetter(this.question.option), value: `${this.question.options.length + 1}` })
      this.question.option = null
    }
  },
  mounted () {
    this.getSubject()
  }
}
</script>
