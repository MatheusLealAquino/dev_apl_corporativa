<template>
  <div>
    <q-btn :to="url" :color="color" class="full-height full-width text-center padding-inside">
      {{title}}
    </q-btn>
  </div>
</template>

<style>
.padding-inside {
  padding-top: 18%;
  padding-bottom: 18%;
  padding-left: 10%;
  padding-right: 10%;
}
</style>

<script>
export default {
  name: 'ButtonCard',
  props: {
    title: String,
    url: String,
    color: String
  }
}
</script>
