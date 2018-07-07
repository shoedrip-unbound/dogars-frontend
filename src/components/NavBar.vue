<template>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/import">Import</router-link>
      <router-link to="/random">Random</router-link>
      <router-link to="/all">All</router-link>
      <router-link to="/fame">Wall of fame</router-link>
    </div>
</template>

<style scoped>
#nav {
  box-shadow: 0px 0px 15px -2px black;
  text-align: center;
  font-size: 2em;
}

#nav a {
  padding-left: 10px;
}

#nav {
  padding: 5px;
}

@media screen and (min-width: 320px) and (max-width: 375px) {
  #nav {
    font-size: 1.5em;
    padding: 0;
  }

  #nav a {
    padding-left: 0px;
  }

  #nav :last-child {
    display: none;
  }
}

@media screen and (min-width: 376px) and (max-width: 425px) {
  #nav {
    font-size: 2em;
    padding: 0;
  }

  #nav a {
    padding-left: 0px;
  }

  #nav :last-child {
    display: none;
  }
}

@media screen and (min-width: 426px) and (max-width: 768px) {
  #nav {
    font-size: 2em;
    padding: 0;
  }

  #nav a {
    padding-left: 15px;
  }
}
</style>
