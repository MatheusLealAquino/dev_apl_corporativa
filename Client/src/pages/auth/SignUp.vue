<template>
  <div class="row q-pa-md justify-center">
    <div class="col-md-12">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          v-model="name"
          :label="$t('auth.labelName')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('auth.typeSomething')]"
        />

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
</template>

<style>
</style>

<script>
import { CustomUsersService } from '../../resource'

export default {
  name: 'SignIn',
  data () {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    async onSubmit () {
      const dismiss = this.$q.notify({
        color: 'info',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: this.$t('loading')
      })
      try {
        // create the user
        await CustomUsersService.create('', {
          realm: this.name,
          email: this.email,
          password: this.password,
          emailVerified: true
        })
        dismiss()
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: this.$t('auth.messageSuccessSignUp')
        })
        this.$router('/auth/singIn')
      } catch (err) {
        let errorData = err.response.data.error
        dismiss()
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: `${this.$t('auth.messageFailSignUp')}
          ${errorData.details.messages.email ? errorData.details.messages.email[0] : ''}`
        })
      }
    },
    onReset () {
      this.name = null
      this.email = null
      this.password = null
    }
  }
}
</script>
