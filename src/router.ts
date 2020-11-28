import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Fame from './views/Fame.vue';
import Import from './views/Import.vue';
import Sets from './views/Set.vue';
import Random from './views/Random.vue';
import All from './views/All.vue';
import Replays from './views/Replays.vue';
import AutoReplays from './views/AutoReplays.vue';
import Search from './views/Search.vue';
import Results from './views/Results.vue';
import Champs from './views/Champs.vue';
import Cringe from './views/Cringe.vue';
import Settings from './views/Settings.vue';
import Contact from './views/Contact.vue';
import Changelog from './views/Changelog.vue';
import NotFound from './views/NotFound.vue';
import Favorites from './views/Favorites.vue';
import Suggestion from './views/Suggestion.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/import',
      name: 'import',
      component: Import
    }, {
      path: '/random',
      name: 'random',
      component: Random
    }, {
      path: '/fave',
      name: 'fave',
      component: Favorites
    }, {
      path: '/all',
      name: 'all',
      component: All
    }, {
      path: '/fame',
      name: 'fame',
      component: Fame
    }, {
      path: '/replays',
      name: 'replays',
      component: Replays
    }, {
      path: '/replays/auto',
      name: 'autoreplays',
      component: AutoReplays
    }, {
      path: '/changelog',
      name: 'changelog',
      component: Changelog
    }, {
      path: '/cringe',
      name: 'cringe',
      component: Cringe
    }, {
      path: '/settings',
      name: 'settings',
      component: Settings
    }, {
      path: '/suggest',
      name: 'suggest',
      component: Suggestion
    }, {
      path: '/contact',
      name: 'contact',
      component: Contact
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/results',
      name: 'results',
      component: Results
    }, {
      path: '/champs',
      name: 'champs',
      component: Champs
    }, {
      path: '/set/:id',
      name: 'set',
      component: Sets
    }, {
      path: '/404',
      name: 'notfound',
      component: NotFound
    }, {
      path: '*',
      component: NotFound
    }
  ]
});
