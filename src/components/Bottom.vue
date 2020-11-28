<template>
  <div id="bot">
    <div>
      <icon name="brands/github-square"></icon>
      <a href="https://github.com/shoedrip-unbound">Repository</a>
    </div>
    <div>
      <icon name="database"></icon>
      <a href="/backup.tar.gz">Backup</a>
    </div>
    <div>
      <icon name="redo"></icon>
      <router-link to="/replays">Replays</router-link>
    </div>
    <div>
      <icon name="file-alt"></icon>
      <router-link to="/changelog">Changelog</router-link>
    </div>
    <div>
      <icon name="camera"></icon>
      <router-link to="/cringe">Cringe</router-link>
    </div>

    <div>
      <icon name="envelope"></icon>
      <a href="mail-to:shoedrip-unbound@dogars.ga">Email</a>
    </div>
    <div>
      <icon name="search"></icon>
      <router-link to="/search">Advanced Search</router-link>
    </div>
    <div>
      <icon name="puzzle-piece"></icon>
      <router-link to="/champs">Champs</router-link>
    </div>
    <div>
      <icon name="reply"></icon>
      <router-link to="/contact">Contact</router-link>
    </div>
    <div>
      <icon name="cogs"></icon>
      <router-link to="/settings">Settings</router-link>
    </div>

    <div>
      <icon name="heart"></icon>
      <router-link to="/fave">Favorites</router-link>
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div>
      <icon name="upload"></icon>
      <router-link to="/suggest">Image suggestion</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
#bot {
  display: grid;
  grid-template-areas:
    'h h h h h'
    'h h h h h';
  margin-top: 20px;
  box-shadow: 0px 10px 23px -13px black inset;
  padding: 15px 10px 10px 10px;
  text-align: end;
}

#bot div {
  display: inline-block;
  border-right: 1px solid grey;
}

#bot div:nth-child(5n) {
  border-right: none;
}

div svg {
  vertical-align: text-top;
}

@media screen and (min-width: 320px) and (max-width: 375px) {
  #bot a {
    font-size: 1.2em;
  }

  #bot {
    grid-template-areas:
      'h h'
      'h h';
    margin-top: 20px;
    text-align: start;
  }

  #bot div:nth-child(5n) {
    border-right: none;
  }

  #bot div {
    border-right: none;
  }

  #bot div:nth-child(2n) {
    border-right: none;
  }

  div svg {
    margin-right: 10px;
  }
}

@media screen and (min-width: 376px) and (max-width: 425px) {
  #bot a {
    font-size: 0.9em;
  }

  svg {
    display: none;
  }
}

@media screen and (min-width: 426px) and (max-width: 768px) {
  #bot a {
    font-size: 0.9em;
  }

  svg {
    margin-right: 10px;
    display: unset;
  }
}
</style>
