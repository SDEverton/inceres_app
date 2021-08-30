
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  env: {
    mapsKey: '',
    baseURL: 'http://localhost:3333/v1/'
  },
});
