import Component from 'vue-class-component';

import Vue, { ComponentOptions, PluginFunction, PluginObject, VueConstructor } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { settings } from '@/settings';

import 'vue-awesome/icons/brands/github-square';
import 'vue-awesome/icons/envelope';
import 'vue-awesome/icons/database';
import 'vue-awesome/icons/search';

import 'vue-awesome/icons/redo';
import 'vue-awesome/icons/puzzle-piece';
import 'vue-awesome/icons/reply';
import 'vue-awesome/icons/camera';

import 'vue-awesome/icons/cogs';
import 'vue-awesome/icons/heart';
import 'vue-awesome/icons/upload';
import 'vue-awesome/icons/file-alt';

import 'vue-awesome/icons/angle-left';
import 'vue-awesome/icons/angle-double-left';
import 'vue-awesome/icons/angle-right';
import 'vue-awesome/icons/angle-double-right';

import Icon from 'vue-awesome/components/Icon';
import CheckboxRadio from 'vue-checkbox-radio';

import { init } from './ThemeManager';
import { DefaultComputed, DefaultData, DefaultMethods, PropsDefinition } from 'vue/types/options';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);
Vue.component('icon', Icon);
Vue.use(CheckboxRadio);

axios.defaults.baseURL = settings.domain;

Vue.config.productionTip = false;

export let root = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

init();