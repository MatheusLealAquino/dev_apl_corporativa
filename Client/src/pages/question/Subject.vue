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
import AdvancedSetting from '../../components/AdvancedSetting.vue'
import { SubjectsService } from '../../resource'

export default {
  name: 'PageSubject',
  components: {
    AdvancedSetting: AdvancedSetting
  },
  data () {
    return {
      begin: false,
      subjectSelect: [],
      listOptionsSubjects: []
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
    async getSubject () {
      let response = await SubjectsService.fetch('')
      let finalArr = []
      response.data.forEach(obj => {
        finalArr.push({ label: obj.name, value: obj.id })
      })
      this.listOptionsSubjects = finalArr
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
  },
  mounted () {
    this.getSubject()
  }
}
</script>
