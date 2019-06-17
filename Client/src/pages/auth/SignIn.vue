<template>
  <q-page>
    <div class="row q-pa-md justify-center">
      <h4>Realizar Login</h4>
      <div class="col-md-12">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
              v-model="email"
              type="email"
              :label="$t('auth.labelEmail')"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || $t('auth.typeSomething')
              ]"
            />

            <q-input
              v-model="password"
              type="password"
              :label="$t('auth.labelPassword')"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || $t('auth.typeSomething')
              ]"
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
export default {
  name: 'SignIn',
  data () {
    return {
      email: null,
      password: null,
      finishRequest: false
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
      this.finishRequest = false
      const dismiss = this.$q.notify({
        color: 'info',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: this.$t('loading')
      })
      // make login the user
      let response = await this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password
      })
      if (response) {
        dismiss()
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: this.$t('auth.messageSuccessSignIn')
        })
      } else {
        dismiss()
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `${this.$t('auth.messageFailSignIn')}`
        })
      }
      this.finishRequest = true
    },
    onReset () {
      this.email = null
      this.password = null
      this.finishRequest = false
    }
  },
  watch: {
    finishRequest (newVal) {
      if (newVal && this.alreadyLogged) this.$router.push('/')
    }
  }
}
</script>
