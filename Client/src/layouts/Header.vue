<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-blue">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          v-if="$q.platform.is.mobile"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Stud Freemium
        </q-toolbar-title>

        <q-btn-group flat v-if="$q.platform.is.desktop">
          <q-btn to="/">{{ $t('menu.home') }}</q-btn>
          <div v-if="userLogged">
            <q-btn to="/setting" flat>{{ $t('menu.setting') }}</q-btn>
            <q-btn flat @click="makeLogout">{{ $t('menu.logout') }}</q-btn>
          </div>
          <div v-if="!userLogged">
            <q-btn to="/auth/signIn" flat>{{ $t('menu.signIn') }}</q-btn>
            <q-btn to="/auth/signUp" flat>{{ $t('menu.signUp') }}</q-btn>
          </div>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="$q.platform.is.mobile"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item to='/'>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>{{$t('menu.home')}}</q-item-section>
        </q-item>
        <q-item to='/setting'>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>{{$t('menu.setting')}}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <hr>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Header',
  data () {
    return {
      leftDrawerOpen: false,
      finishRequest: false
    }
  },
  computed: {
    userLogged: {
      get () {
        return this.$store.getters['user/isLogged']
      }
    }
  },
  methods: {
    openURL,
    makeLogout () {
      this.finishRequest = false
      this.$store.dispatch('user/logout')
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: this.$t('auth.logoutDone')
      })
      this.finishRequest = true
    }
  },
  watch: {
    userLogged (newVal) {
      if (!newVal && this.finishRequest) this.$router.push('/')
    },
    finishRequest (newVal) {
      if (newVal && !this.userLogged) this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
