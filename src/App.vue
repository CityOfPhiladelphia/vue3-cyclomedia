<script setup>
import MapPanel from '@/components/MapPanel.vue';
import CyclomediaPanel from '@/components/CyclomediaPanel.vue';


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
    

    <!-- MAP PANEL ON LEFT - right now only contains the address input -->
    <div
      v-show="!fullScreenCyclomediaEnabled"
      class="map-panel-holder"
      :class="fullScreenMapEnabled ? 'topics-holder-full' : ''"
    >
      <map-panel />
    </div>

    <div
      v-show="fullScreenCyclomediaEnabled"
    >
      <cyclomedia-panel />
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
