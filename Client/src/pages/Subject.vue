<template>
    <q-page class="container padding q-pt-md">
        <div class="row q-pl-md q-pr-md">
            <div class="col-12 q-mb-md">
              <q-select
                multiple
                filter
                use-chips
                color="amber-9"
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
          <div class="col-6">
            <q-btn
              outline
              :label="$t('back')"
              icon="navigate_before"
              class="justify-center full-width"
              color="primary"
            />
          </div>
          <div class="col-6">
            <q-btn
              outline
              :label="$t('next')"
              icon-right="navigate_next"
              class="justify-center full-width"
              color="primary"
            />
          </div>
        </div>
    </q-page>
</template>

<style>

</style>

<script>
import AdvancedSetting from '../components/AdvancedSetting.vue'

export default {
  name: 'PageSubject',
  components: {
    AdvancedSetting: AdvancedSetting
  },
  data () {
    return {
      begin: false,
      subjectSelect: [],
      listOptionsSubjects: [
        {
          label: 'Desenvolvimento de Aplicações Corporativas',
          value: '1'
        },
        {
          label: 'Matemática',
          value: '2'
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
        this.$router.push({ path: `/question/begin?${this.mountQuery(this.subjectSelect)}` })
        this.begin = true
      }
    },
    mountQuery (arr) {
      let response = ``
      this.subjectSelect.forEach(obj => {
        response += `type=${obj.value}&`
      })
      return response
    }
  },
  watch: {
    subjectSelect (newVal) {
      if (newVal.length === 0) this.begin = false
    }
  }
}
</script>
