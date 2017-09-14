import 'vue-dice-component/lib/dice.css';
import 'mdi/css/materialdesignicons.min.css';

import moment from 'moment';
import Vue from 'vue';
import Dice from 'vue-dice-component';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import App from './vue/App.vue';
import Loading from './vue/Loading.vue';
import router from './router';
import store from './store';

import './styles/vuetify.styl';
import './styles/main.styl';

async function main() {
  moment.locale('ja');

  Vue.use(Dice);
  Vue.use(Vuetify);
  Vue.directive('scroll', {
    inserted(el, binding) {
      el.classList.add('scroll');
      if (binding.value === 'y') el.classList.add('scroll-y');
      else if (binding.value === 'x') el.classList.add('scroll-x');
      else if (binding.value === 'all') el.classList.add('scroll-all');

      el.addEventListener('touchmove', e => e.stopPropagation());
    },
  });

  const loading = new Vue(Loading).$mount('#static-loading');

  await import('./utilities/bcdice');

  sync(store, router);

  loading.$destroy();
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}
main();
