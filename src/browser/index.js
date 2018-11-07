import 'vue-dice-component/lib/dice.css';
import 'vue-simple-markdown/dist/vue-simple-markdown.css';
import 'vuetify/src/stylus/main.styl';
import 'mdi/css/materialdesignicons.min.css';

import _ from 'lodash';
import moment from 'moment';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import Dice from 'vue-dice-component';
import VueSimpleMarkdown from 'vue-simple-markdown';
import VueYoutube from 'vue-youtube';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import { sync } from 'vuex-router-sync';
import App from './vue/App.vue';
import config from './config';
import router from './router';
import store from './store';

import './styles/main.styl';

async function main() {
  moment.locale('ja');

  const theme = _.mapValues(config.theme, (value) => {
    if (value.match(/^#/)) return value;
    return _.get(colors, value);
  });

  Vue.use(Dice);
  Vue.use(Vuetify, { theme });
  Vue.use(VueSimpleMarkdown);
  Vue.use(VueYoutube);
  Vue.directive('scroll', {
    inserted(el, binding) {
      el.classList.add('scroll');
      if (binding.value === 'y') el.classList.add('scroll-y');
      else if (binding.value === 'x') el.classList.add('scroll-x');
      else if (binding.value === 'all') el.classList.add('scroll-all');
    },
  });

  if (config.googleAnalytics) {
    Vue.use(VueAnalytics, {
      id: config.googleAnalytics.id,
      router,
    });
  }

  sync(store, router);

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}
main();

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js');
  }
});
