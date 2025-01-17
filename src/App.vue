<script setup>
import isMobileDevice from './util/is-mobile-device';
import isMac from './util/is-mac';

import MapPanel from '@/components/MapPanel.vue';
import CyclomediaPanel from '@/components/CyclomediaPanel.vue';

import { useMainStore } from './stores/MainStore';
const MainStore = useMainStore();

import AddressSearchControl from '@/components/AddressSearchControl.vue';


if (!import.meta.env.VITE_PUBLICPATH) {
  MainStore.publicPath = '/';
} else {
  MainStore.publicPath = import.meta.env.VITE_PUBLICPATH;
}
if (import.meta.env.VITE_DEBUG == 'true') console.log('import.meta.env.VITE_PUBLICPATH:', import.meta.env.VITE_PUBLICPATH, 'MainStore.publicPath:', MainStore.publicPath);


import { onMounted, computed } from "vue";

// ROUTER
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();

const fullScreenCyclomediaEnabled = computed(() => {
  return MainStore.fullScreenCyclomediaEnabled;
})

const fullScreenMapEnabled = computed(() => {
  return MainStore.fullScreenMapEnabled;
})

onMounted(async () => {
  MainStore.appVersion = import.meta.env.VITE_VERSION;
  MainStore.isMobileDevice = isMobileDevice();
  MainStore.isMac = isMac();
  await router.isReady()
  if (import.meta.env.VITE_DEBUG == 'true') console.log('App onMounted, route.params.topic:', route.params.topic, 'route.params.address:', route.params.address);
  if (route.name === 'not-found') {
    router.push({ name: 'home' });
  }

  const main = document.getElementById('main');
  main.scrollTop = -main.scrollHeight;

  window.addEventListener('resize', handleWindowResize);
  handleWindowResize();
});

const handleWindowResize = () => {
  const rootElement = document.getElementById('app');
  const rootStyle = window.getComputedStyle(rootElement);
  const rootWidth = rootStyle.getPropertyValue('width');
  const rootHeight = rootStyle.getPropertyValue('height');
  const rootWidthNum = parseInt(rootWidth.replace('px', ''));
  const rootHeightNum = parseInt(rootHeight.replace('px', ''));

  const dim = {
    width: rootWidthNum,
    height: rootHeightNum,
  };
  MainStore.windowDimensions = dim;
}


const links = [
  {
    type: 'native',
    href: 'https://phila.formstack.com/forms/atlas_feedback_form',
    text: 'Feedback',
    attrs: {
      target: '_blank',
    },
  },
];

</script>

<template>
  <a
    href="#main"
    class="skip-to-main-content-link"
  >Skip to main content</a>

  <app-header
    app-title="Cyclomedia"
    app-link="/"
    :is-sticky="true"
    :is-fluid="true"
  >
    <template #mobile-nav>
      <mobile-nav :links="links" />
    </template>
  </app-header>

  <!-- MAIN CONTENT -->
  <main
    id="main"
    class="main invisible-scrollbar"
  >
    <AddressSearchControl :input-id="'map-search-input'" />

    <!-- MAP PANEL ON LEFT - right now only contains the address input -->
    <div
      v-show="!fullScreenCyclomediaEnabled"
      class="map-panel-holder"
      :class="fullScreenMapEnabled ? 'topics-holder-full' : ''"
    >
      <map-panel />
    </div>

    <div
      v-show="!fullScreenMapEnabled"
      class="cyclomedia-holder"
      :class="fullScreenCyclomediaEnabled ? 'cyclomedia-holder-full' : ''"
    >
      <cyclomedia-panel
        @update-camera-yaw="updateCyclomediaCameraAngle"
        @update-camera-h-fov="updateCyclomediaCameraViewcone"
        @update-camera-lng-lat="updateCyclomediaCameraLngLat"
      />
    </div>

    
  </main>

  <!-- FOOTER -->
  <app-footer
    :is-sticky="true"
    :is-hidden-mobile="true"
    :links="links"
  />
</template>

<style scoped>

</style>
