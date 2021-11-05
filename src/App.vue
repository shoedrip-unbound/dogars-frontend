<template>
  <div style="height: 100%">
    <audio id="playAudio">
      <source src="/media/doors.f9504c74.ogg" />
    </audio>
    <div v-if="ack" id="app">
      <ChampPog />
      <Banner />
      <SearchBar v-model="word" />
      <NavBar />
      <div class="content">
        <router-view />
      </div>
      <Bottom />
      <Waifu ref="waifu" />
    </div>
    <div id="ended" v-else>
      <img src="@/assets/its_over.png" alt="" />

      <h1>This is the end</h1>
      <h1>
        <button @click="acked">It has indeed ended</button>
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Banner from '@/components/Banner.vue'
import NavBar from '@/components/NavBar.vue'
import Bottom from '@/components/Bottom.vue'
import SearchBar from '@/components/SearchBar.vue'
import ChampPog from '@/components/ChampPog.vue'
import Waifu from '@/components/Waifu.vue'

@Component({
  components: {
    Banner,
    NavBar,
    SearchBar,
    ChampPog,
    Bottom,
    Waifu,
  },
})
export default class App extends Vue {
  word: string = ''

  ack: string | null

  acked() {
    this.ack = 'true'
    localStorage.setItem('ack', 'true')
    let audio = new Audio(require('@/assets/doors.ogg'))
    audio.play()
  }

  constructor() {
    super()
    this.ack = localStorage.getItem('ack')
  }

  async mounted() {
    this.ack = localStorage.getItem('ack')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Itim');

.the-end {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}

button {
  cursor: pointer;
}

body {
  margin: 0;

  /* Out Of Focus, like the background */
  --oof: #ececec;

  /* Container is above meaningful content */
  --content: #white;

  /* Used for hovering */
  --highlight: #cccccc;

  /* Obvious */
  --text: #2c3e4f;
  background-color: var(--oof);
  height: 100vh;
}

textarea,
button,
input,
select {
  background: var(--content);
  color: var(--text);
  padding: 5px;
  border: 1px solid var(--text);
  box-sizing: border-box;
}

button {
  border: 1px solid;
  border-radius: 6px;
}

select {
  border-color: var(--text);
  font-size: 1.1em;
  border-radius: 5px;
  padding: 4px;
  font-family: Itim;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text);
  overflow: hidden;
  background-color: var(--content);
  margin-bottom: 10px;
}

#ended {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text);
  overflow: hidden;
  height: 100%;
  display: table;
  overflow: hidden;
  background-color: #060b23;
  margin-bottom: 10px;
  width: 100%;
  font-family: 'Itim', cursive;
  font-size: xxx-large;
  color: #939baa;
}

#ended h1 {
  margin: 0;
}

.content {
  font-size: 1.1em;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
}

h1,
h2,
h3 {
  font-family: 'Itim', cursive;
}

#nav a,
#bot a {
  font-size: 1.1em;
  height: 1.3em;
  vertical-align: middle;
  font-family: 'Itim', cursive;
  font-weight: bold;
  color: var(--text);
  display: inline-block;
  text-decoration: none;
  padding: 0 10px 0 0;
}

a.router-link-exact-active,
a.router-link-exact-active {
  color: #42b983;
}

a {
  color: var(--text);
  text-decoration: none;
}

a:hover {
  background-color: var(--highlight);
  text-decoration: none;
}

@media screen and (min-width: 426px) {
  #app {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    box-shadow: 0 0 20px -5px;
  }

  #nav a,
  #bot a {
    height: 1.3em;
    display: inline-block;
    text-decoration: none;
    padding: 0 10px 0 10px;
  }
}

@media screen and (orientation: portrait) and (max-width: 480px) {
  #nav a,
  #bot a {
    height: 1.3em;
    display: inline-block;
    text-decoration: none;
    padding: 0 10px 0 10px;
  }
}
</style>
