<template>
  <div>
    <div id="importform">
      <label>Set:</label><textarea v-on:focus="error = ''" v-model="set"></textarea>
      <label>Description:</label><textarea v-model="desc"></textarea>
      <label>Creator:</label><input v-model="creat"/>
      <label>Tripcode:</label><input v-model="trip"/>
      <label>Format:</label>
      <select v-on:focus="error = ''" v-model="format">
        <option selected value="gen7ou">[Gen 7] OU</option>
        <option value="gen7ubers">[Gen 7] Ubers</option>
        <option value="gen7anythinggoes">[Gen 7] Anything Goes</option>
        <option value="gen7uu">[Gen 7] UU</option>
        <option value="gen7ru">[Gen 7] RU</option>
        <option value="gen7nu">[Gen 7] NU</option>
        <option value="gen7pu">[Gen 7] PU</option>
        <option value="gen7lc">[Gen 7] LC</option>
        <option value="gen7natureswap">[Gen 7] Nature Swap</option>
        <option value="gen7balancedhackmons">[Gen 7] Balanced Hackmons</option>
        <option value="gen7mixandmega">[Gen 7] Mix and Mega</option>
        <option value="gen7almostanyability">[Gen 7] Almost Any Ability</option>
        <option value="gen7camomons">[Gen 7] Camomons</option>
        <option value="gen7stabmons">[Gen 7] STABmons</option>
        <option value="gen7customgame">Disable checks</option>
      </select>
    </div>
    <button :disabled="submitting" @click.prevent="submit()">Submit</button>
    <pre class="error" v-if="error">{{error}}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { Sets } from "@/Models/Sets";

@Component
export default class Import extends Vue {
  set: string = "";
  desc: string = "";
  creat: string = "";
  trip: string = "";
  format: string = "gen7ou";
  error: string = "";
  submitting: boolean = false;
  async submit() {
    try {
      this.submitting = true;
      let res = await axios.post<number | Error>("/api/sets", {
        set: this.set,
        trip: this.trip,
        creat: this.creat,
        desc: this.desc,
        format: this.format
      });
      this.$router.push(`/set/${res.data}`);
    } catch (e) {
      this.error = "Your set was rejected for the following reason(s):\n";
      this.error += e.response.data.join("\n");
    }
    this.submitting = false;
  }
}
</script>

<style scoped>
.error {
  padding: 10px;
  color: red;
  font-weight: bold;
}

#importform {
  display: grid;
}

#importform > * {
  margin-bottom: 15px;
}

#importform > textarea {
  resize: none;
}

#importform :nth-child(2) {
  height: 170px;
}

button {
  margin: 0 auto 0 auto;
  text-align: center;
  display: block;
  font-size: 2em;
}

@media screen and (min-width: 768px) {
  #importform {
    grid-template-areas: "h h";
  }
}
</style>
