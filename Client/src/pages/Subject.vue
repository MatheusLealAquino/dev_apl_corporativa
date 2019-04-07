<template>
    <q-page class="container padding q-pt-md">
        <div class="row q-pl-md q-pr-md" v-if="!begin">
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

            <div class="col-12">
                <AdvancedSetting />
            </div>

            <div class="col-12 fixed-bottom q-mb-sm q-pl-md q-pr-md">
                <q-btn outline color="primary" class="full-width" @click="getQuestions()">
                  {{$t('begin')}}!
                </q-btn>
            </div>
        </div>
        <div class="row" v-if="begin">

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
          value: 'Desenvolvimento de Aplicações Corporativas'
        },
        {
          label: 'Matemática',
          value: 'Matemática'
        }
      ],
      // advancedSettings
      advancedSettings: {
        useTimeForQuestion: false,
        timeForQuestion: '',
        useTimeForProof: false,
        timeForProof: ''
      }
    }
  },
  methods: {
  }
}
</script>
