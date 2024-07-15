import { defineStore } from 'pinia';

export const useMainStore = defineStore("MainStore", {
  state: () => {
    return {
      initialDatafetchComplete: false,
      publicPath: null,
      isMobileDevice: null,
      isMac: null,
      fullScreenMapEnabled: false,
      fullScreenCyclomediaEnabled: true,
      windowDimensions: {},
    };
  },
  actions: {
    setCurrentAddress(address) {
      this.currentAddress = address;
    },
  },
});