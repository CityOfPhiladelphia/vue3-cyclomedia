<script setup>

import $config from '@/config';
if (import.meta.env.VITE_DEBUG == 'true') console.log('Map.vue $config:', $config);

import { ref, onMounted, watch, watchEffect, computed } from 'vue';

// PACKAGE IMPORTS
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// this was recommended by a comment in https://github.com/mapbox/mapbox-gl-js/issues/9114
// the official mapbox-gl-draw was blocking map clicks
// import '@/assets/mapbox-gl-draw.min.js'
// import '@/assets/maplibre-gl-draw.css';

import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();

import FullScreenMapToggleTab from '@/components/FullScreenMapToggleTab.vue';

let map;

onMounted(async () => {
  // if (import.meta.env.VITE_DEBUG == 'true') console.log('Map.vue onMounted route.params.topic:', route.params.topic, 'route.params.address:', route.params.address);
  
  // create the maplibre map
  // let currentTopicMapStyle = route.params.topic ? $config.topicStyles[route.params.topic] : 'pwdDrawnMapStyle';
  let zoom = route.params.address ? 17 : 12;

  map = new maplibregl.Map({
    container: 'map',
    style: $config['pwdDrawnMapStyle'],
    center: $config.cityCenterCoords,
    // center: [-75.163471, 39.953338],
    zoom: zoom,
    minZoom: 6,
    maxZoom: 22,
    attributionControl: false,
  });

  map.on('load', () => {
    let canvas = document.querySelector(".maplibregl-canvas");
    canvas.setAttribute('tabindex', -1);
  })
});

</script>

<template>
  <!-- <div
    id="map-panel"
    :class="mapPanelClass"
  > -->
    <full-screen-map-toggle-tab />
    <div
      id="map"
      class="map map-class"
    >
    </div>
  <!-- </div> -->
  
</template>