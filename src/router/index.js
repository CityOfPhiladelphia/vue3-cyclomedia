import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

import { useMainStore } from '@/stores/MainStore';
import { useGeocodeStore } from '@/stores/GeocodeStore';

import useRouting from '@/composables/useRouting';
// import Condos from '@/components/topics/Condos.vue';
const { routeApp } = useRouting();

const getGeocodeAndPutInStore = async(address) => {
  if (import.meta.env.VITE_DEBUG == 'true') console.log('getGeocodeAndPutInStore is running, address:', address);
  const MainStore = useMainStore();

  const GeocodeStore = useGeocodeStore();
  await GeocodeStore.fillaisData(address);
  if (MainStore.lastSearchMethod == 'address' && !GeocodeStore.aisData.features) {
    MainStore.currentAddress = null;
    if (import.meta.env.VITE_DEBUG == 'true') console.log('getGeocodeAndPutInStore, calling not-found');
    router.push({ name: 'not-found' });
    return;
  } else if (!GeocodeStore.aisData.features) {
    return;
  }
  // if there is a value, add the value for the street_address in the MainStore
  const currentAddress = GeocodeStore.aisData.features[0].properties.street_address;
  MainStore.setCurrentAddress(currentAddress);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    {
      path: '/search',
      name: 'search',
      component: App,
      beforeEnter: async (to, from) => {
        const { address } = to.query;
        if (import.meta.env.VITE_DEBUG == 'true') console.log('search route beforeEnter, to.query:', to.query, 'from:', from, 'address:', address);
        // const MainStore = useMainStore();
        if (address && address !== '') {
          if (import.meta.env.VITE_DEBUG == 'true') console.log('search route beforeEnter, address:', address);
          // MainStore.setLastSearchMethod('address');
          await getGeocodeAndPutInStore(address);
          routeApp(router);
        } //else if (lat && lng) {
        //   MainStore.setLastSearchMethod('mapClick');
        //   await getParcelsAndPutInStore(lng, lat);
        //   routeApp(router);
        // } else {
        //   return false;
        // }
      },
    },
    {
      path: '/:address',
      name: 'address',
      component: App,
    },
  ]
})

export default router
