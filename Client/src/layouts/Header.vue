<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="blue"
        inverted
      >
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
          <div slot="subtitle">v0.0.1</div>
        </q-toolbar-title>

        <q-btn-group flat v-if="$q.platform.is.desktop">
          <q-btn to="/">{{ $t('menu.home') }}</q-btn>
          <q-btn to="/setting">{{ $t('menu.setting') }}</q-btn>
        </q-btn-group>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
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
          <q-item-side icon="home" />
          <q-item-main :label="$t('menu.home')" />
        </q-item>
        <q-item to='/setting'>
          <q-item-side icon="settings" />
          <q-item-main :label="$t('menu.setting')" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
