<template>
    <q-list>
        <q-collapsible :label="$t('settings.advancedSetting')">
            <div class="row">
                <div class="col-12 q-mb-md">
                    <q-checkbox v-model="useTimeForQuestion" :label="$t('settings.timeForQuestion')"/>
                    <br/>
                    <q-btn-toggle
                        class="q-mt-md"
                        v-model="timeForQuestion"
                        toggle-color="primary"
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
                    <q-checkbox v-model="useTimeForProof" :label="$t('settings.timeForProof')"/>
                    <br/>
                    <q-btn-toggle
                        class="q-mt-md"
                        v-model="timeForProof"
                        toggle-color="primary"
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
        </q-collapsible>
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
  }
}
</script>
