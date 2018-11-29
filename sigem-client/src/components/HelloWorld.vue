<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
    <p></p>
    <h3>Add ships to system</h3>
    <ul>
      <li>
        <span>shipName is: {{ shipName }}</span>
        <br>
        <input name="shipName" v-model="shipName" type="text" placeholder="New ship name">
        <span class="error" v-show="errors['shipName']">{{ errors["shipName"] }}</span>
        <br>
        <button @click="save()">Save</button>
        <div v-for="item in motherships" :key="item.id">
          {{item.id}} , {{item.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters('mothership', { findMothershipInStore: 'find' }),
    motherships () {
      const motherships = this.findMothershipInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return motherships && motherships.data ? motherships.data : []
    }
  },
  data() {
    return {
      shipName: null,
      errors: {}
    }
  },
  methods: {
    ...mapActions('mothership', { findMotherships: 'find' }),
    ...mapActions('mothership', { createMothership: 'create' }),
    save() {
      if (this.validateForm()) {
        this.createMothership({
          name: this.shipName
        }).then(() => {
          this.shipName = ''
        }).catch(err => {
          this.errors = {}
          this.errors['shipName'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
      if (!this.shipName) {
        this.errors['shipName'] = 'ship name is required'
      }
      return Object.keys(this.errors).length === 0
    }
  },
  created() {
    this.findMotherships().then(data => {
      console.log(data)
    }).catch(error => console.log(error))
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #301c7a;
}
error {
  color: red;
}
</style>
