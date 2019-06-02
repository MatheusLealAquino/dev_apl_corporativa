<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
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
          <div slot="subtitle">v0.0.1</div>
        </q-toolbar-title>

        <q-btn-group flat v-if="$q.platform.is.desktop">
          <q-btn to="/">{{ $t('menu.home') }}</q-btn>
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
        <q-item-label header>Essential Links</q-item-label>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-section avatar>
            <q-icon name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-section avatar>
            <q-icon name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-section avatar>
            <q-icon name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-section avatar>
            <q-icon name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-section avatar>
            <q-icon name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
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
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
