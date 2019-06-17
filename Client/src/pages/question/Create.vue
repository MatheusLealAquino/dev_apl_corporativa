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
              v-model="title"
              type="text"
              :label="$t('createQuestion.labelTitle')"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || $t('auth.typeSomething')
              ]"
            />

            <q-input
              v-model="subTitle"
              type="text"
              :label="$t('createQuestion.labelSubtitle')"
            />

          <div>
            <q-btn :label="$t('reset')" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn :label="$t('submit')" type="submit" color="primary" class="float-right"/>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style>

</style>

<script>
import { QuestionsService } from '../../resource'

export default {
  name: 'CreateQuestion',
  data () {
    return {
      title: null,
      subTitle: null,
      correctOption: null,
      options: []
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
      const dismiss = this.$q.notify({
        color: 'info',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: this.$t('loading')
      })
      try {
        // Create the question
        await QuestionsService.create('', {
          fullQuestion: {

          }
        })
        dismiss()
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: this.$t('auth.messageSuccessSignIn')
        })
      } catch (err) {
        dismiss()
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `${this.$t('auth.messageFailSignIn')}`
        })
      }
    },
    onReset () {
      this.title = null
      this.subTitle = null
      this.correctOption = null
      this.options = []
    }
  }
}
</script>
