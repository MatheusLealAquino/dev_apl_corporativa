<template>
    <div class="col-12">
        <div class="col-12 text-center">
            <h4 class="caption">{{title}}</h4>
        </div>
        <div class="col-12 text-center">
            <q-list link v-for="option in options" v-bind:key="option.id">
                <q-item tag="label">
                    <q-item-side>
                        <q-radio :color="option.color" v-model="selected" :val="option.value" />
                    </q-item-side>
                    <q-item-main>
                        <q-item-tile :color="option.color" title>{{option.label}}</q-item-tile>
                    </q-item-main>
                </q-item>
            </q-list>
        </div>
        <div class="col-12 fixed-bottom q-mb-sm q-pl-md q-pr-md">
            <q-btn outline color="primary" class="full-width" @click="seeAnswer()">
                {{$t('seeAnswer')}}!
            </q-btn>
        </div>
    </div>
</template>

<style>
</style>

<script>
export default {
  name: 'QuestionCard',
  data () {
    return {
      selected: ''
    }
  },
  props: {
    title: String,
    options: Array
  },
  created () {
  },
  methods: {
    seeAnswer (newVal) {
      this.options.forEach(option => {
        if (option.correct) option.color = 'green'
        else option.color = 'negative'
      })
    }
  }
}
</script>
