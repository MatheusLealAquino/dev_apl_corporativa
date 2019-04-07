<template>
    <q-page class="container"></q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageFind',
  data () {
    return {
      type: ''
    }
  },
  methods: {

  },
  created () {
    this.type = this.$route.params.type
  }
}
</script>
