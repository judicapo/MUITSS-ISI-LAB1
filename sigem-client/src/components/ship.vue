<template>
  <div class="columns">
    <div class="column">
      <form action="" @submit.prevent="save">
        <div class="material-card-content">
          <p class="title">Create a new ship</p>
          <section class="modal-card-body">
            <b-field label="Type the ship name">
              <b-input
                  name="name"
                  v-model="shipName"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['shipName']">{{ errors["shipName"] }}</span>
            <b-field label="Set the ship max capacity">
              <b-input
                  name="maxCapacity"
                  v-model="maxCapacity"
                  type="number">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['maxCapacity']">{{ errors["maxCapacity"] }}</span>
            <b-field label="Select the origin mothership">
              <b-select placeholder="Select" v-model="originMothership" expanded>
                <option v-for="item in motherships" :key="item.id" :value="item.id"> {{ item.name  }}</option>
              </b-select>
            </b-field>
            <span class="error" v-show="errors['originMothership']">{{ errors["originMothership"] }}</span>
            <b-field label="Select the destiny mothership">
              <b-select placeholder="Select" v-model="destinyMothership" expanded>
                <option v-for="item in motherships" :key="item.id" :value="item.id"> {{ item.name  }}</option>
              </b-select>
            </b-field>
            <span class="error" v-show="errors['destinyMothership']">{{ errors["destinyMothership"] }}</span>
          </section>
        </div>
        <div class="content has-text-centered">
          <p>
            <button class="button is-primary">
              Create new route
            </button>
          </p>
        </div>
      </form>
    </div>
    <div class="column">
      <div class="content has-text-centered">
        <p>
          <template>
            <b-table :data="ships" :columns="columns"></b-table>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ship',
  computed: {
    ...mapGetters('ship', { findShipInStore: 'find' }),
    ...mapGetters('mothership', { findMothershipInStore: 'find' }),
    ships () {
      const ships = this.findShipInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      if (this.motherships){
        ships.data.map(x => {
          let origin = this.motherships.find(m => m.id === x.origin_mothership)
          if (origin) x = Object.assign(x, { origin: origin.name })
          let destiny = this.motherships.find(m => m.id === x.destiny_mothership)
          if (destiny) x = Object.assign(x, { destiny: destiny.name })
        })
      }
      return ships && ships.data ? ships.data : []
    },
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
      maxCapacity: null,
      originMothership: null,
      destinyMothership: null,
      errors: {},
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'name',
            label: 'Ship name',
        },
        {
            field: 'origin',
            label: 'Origin mothership',
        },
        {
            field: 'destiny',
            label: 'Destiny mothership',
        },
        {
            field: 'maxMarciansCount',
            label: 'Current capacity',
        }
      ]
    }
  },
  methods: {
    ...mapActions('ship', { findShips: 'find' }),
    ...mapActions('ship', { createShip: 'create' }),
    ...mapActions('mothership', { findMotherships: 'find' }),
    save() {
      if (this.validateForm()) {
        this.createShip({
          name: this.shipName,
          maxMarciansCount: this.maxCapacity,
          origin_mothership: this.originMothership,
          destiny_mothership: this.destinyMothership
        }).then(() => {
          this.shipName = ''
          this.maxCapacity = ''
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
      if (!this.maxCapacity) {
        this.errors['maxCapacity'] = 'max capacity is required'
      }
      if (!this.originMothership) {
        this.errors['originMothership'] = 'ship is required'
      }
      if (!this.destinyMothership) {
        this.errors['destinyMothership'] = 'ship is required'
      }
      return Object.keys(this.errors).length === 0
    }
  },
  created() {
    this.findShips().catch(error => console.log(error))
    this.findMotherships().catch(error => console.log(error))
  }
}
</script>
