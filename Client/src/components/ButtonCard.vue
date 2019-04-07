<template>
    <div class="col-12">
      <q-btn :to="url" :color="color" class="full-height full-width text-center">
        {{title}}
      </q-btn>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    url: String,
    color: String
  }
}
</script>
