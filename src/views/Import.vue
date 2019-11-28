<template>
  <div>
    <div id="importform">
      <label>Set:</label>
      <textarea v-on:focus="error = ''" v-model="set"></textarea>
      <label>Description:</label>
      <textarea v-model="desc"></textarea>
      <label>Creator:</label>
      <input v-model="creat" />
      <label>Tripcode:</label>
      <input v-model="trip" />
      <label>Format:</label>
      <select v-on:focus="error = ''" v-model="format">
        <optgroup v-for="group in groups" :key="group.value" :label="group.value">
          <option v-for="opt in group.child" :key="opt.id" :value="opt.id">{{opt.name}}</option>
        </optgroup>

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

type Format = { id: string; name: string; section: string };

@Component
export default class Import extends Vue {
  set: string = "";
  desc: string = "";
  creat: string = "";
  trip: string = "";
  format: string = "gen8ou";
  error: string = "";
  submitting: boolean = false;
  data: { [k in string]: Format } = {};
  groups: { [k in string]: { value: string; child: Format[] } } = {};

  async created() {
    let res = await axios.get<this["data"]>("/api/formats");
    let data = res.data;
    let grouplist = new Set(Object.keys(data).map(e => data[e].section));
    this.groups = {};
    for (let g of grouplist) {
      console.log(g)
      this.groups[g] = {
        child: Object.values(data).filter(e => e.section == g),
        value: g
      };
    }
    this.format = "gen8ou";
  }

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
