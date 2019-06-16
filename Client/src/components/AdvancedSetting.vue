<template>
  <q-list>
    <q-expansion-item :label="$t('settings.advancedSetting')">
      <div class="row">
        <div class="col-12 q-mb-md">
          <q-checkbox v-model="useTimeForQuestion" color="yellow-7" :label="$t('settings.timeForQuestion')"/>
          <br/>
          <q-btn-toggle
            class="q-mt-md"
            v-model="timeForQuestion"
            toggle-color="yellow-7"
            v-if="useTimeForQuestion"
            :options="[
                {label: '1 min.', value: '1'},
                {label: '2 min.', value: '2'},
                {label: '3 min.', value: '3'},
                {label: '4 min.', value: '4'}
            ]"
          />
        </div>
        <div class="col-12 q-mb-md">
          <q-checkbox v-model="useTimeForProof" color="yellow-7" :label="$t('settings.timeForProof')"/>
          <br/>
          <q-btn-toggle
            class="q-mt-md"
            v-model="timeForProof"
            toggle-color="yellow-7"
            v-if="useTimeForProof"
            :options="[
              {label: '30 min', value: '30'},
              {label: '1 hr', value: '1'},
              {label: '2 hr', value: '2'},
              {label: '3 hr', value: '3'}
            ]"
          />
        </div>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<style>
</style>

<script>
export default {
  name: 'AdvancedSetting',
  data () {
    return {
      useTimeForQuestion: false,
      timeForQuestion: '',
      useTimeForProof: false,
      timeForProof: ''
    }
  },
  watch: {
    useTimeForQuestion (newValue) {
      let key = 'useTimeForQuestion'
      this.$q.localStorage.set(key, newValue)
    },
    timeForQuestion (newValue) {
      let key = 'timeForQuestion'
      this.$q.localStorage.set(key, newValue)
    },
    useTimeForProof (newValue) {
      let key = 'useTimeForProof'
      this.$q.localStorage.set(key, newValue)
    },
    timeForProof (newValue) {
      let key = 'timeForProof'
      this.$q.localStorage.set(key, newValue)
    }
  },
  mounted () {
    this.useTimeForQuestion = this.$q.localStorage.getItem('useTimeForQuestion')
    this.useTimeForProof = this.$q.localStorage.getItem('useTimeForProof')
    this.timeForQuestion = this.$q.localStorage.getItem('timeForQuestion')
    this.timeForProof = this.$q.localStorage.getItem('timeForProof')
  }
}
</script>
