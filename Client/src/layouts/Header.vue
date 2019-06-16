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
          <div v-if="userIsLogged">
            <q-btn to="/setting" flat>{{ $t('menu.setting') }}</q-btn>
            <q-btn to="/logout" flat>{{ $t('menu.logout') }}</q-btn>
          </div>
          <div v-if="!userIsLogged">
            <q-btn to="/signIn" flat>{{ $t('menu.signIn') }}</q-btn>
            <q-btn to="/signUp" flat>{{ $t('menu.signUp') }}</q-btn>
          </div>
        </q-btn-group>
      </q-toolbar>
      <hr>
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
      leftDrawerOpen: false
    }
  },
  computed: {
    userIsLogged () {
      return this.$store.getters['user/isLogged']
    }
  },
  methods: {
    openURL
  },
  mounted () {
  }
}
</script>

<style>
</style>
