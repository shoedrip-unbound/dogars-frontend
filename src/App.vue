<template>
  <div id="app">
    <ChampPog/>
    <Banner/>
    <SearchBar/>
    <NavBar/>
    <div class="content">
      <router-view/>
    </div>
    <Bottom/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "@/components/Banner.vue";
import NavBar from "@/components/NavBar.vue";
import Bottom from "@/components/Bottom.vue";
import SearchBar from "@/components/SearchBar.vue";
import ChampPog from "@/components/ChampPog.vue";

@Component({
  components: {
    Banner,
    NavBar,
    SearchBar,
    ChampPog,
    Bottom
  }
})
export default class App extends Vue {}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Itim");

button {
    background: white;
    border: 1px solid;
    border-radius: 6px;
    color: #2c3e4f;
}

select {
    color: #2c3e50;
    background: white;
    border-color: #2c3e50;
    font-size: 1.1em;
    border-radius: 5px;
    padding: 4px;
    font-family: Itim;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  background-color: white;
  margin-bottom: 10px;
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
  font-family: "Itim", cursive;
}

#nav a,
#bot a {
  font-size: 1.1em;
  height: 1.3em;
  vertical-align: middle;
  font-family: "Itim", cursive;
  font-weight: bold;
  color: #2c3e50;
  display: inline-block;
  text-decoration: none;
  padding: 0 10px 0 0;
}

a.router-link-exact-active,
a.router-link-exact-active {
  color: #42b983;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

a:hover {
  background-color: #cfdeec;
  text-decoration: none;
}

body {
  margin: 0;
  background-color: #ececec;
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
