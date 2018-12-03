<template>
  <form action="" @submit.prevent="save">
    <div class="material-card-content">
      <p class="title">Create a new trip</p>
      <section class="modal-card-body">
        <b-field label="Ship to travel">
          <b-select placeholder="Select" v-model="ship" expanded>
            <option v-for="item in ships" :key="item.id" :value="item.id"> {{ item.name  }}</option>
          </b-select>
        </b-field>
        <span class="error" v-show="errors['ship']">{{ errors["ship"] }}</span>
        <b-field label="Marcian to travel">
          <b-select placeholder="Select" v-model="passenger" expanded>
            <option v-for="item in passengers" :key="item.id" :value="item.id"> {{ item.name  }}</option>
          </b-select>
        </b-field>
        <span class="error" v-show="errors['passenger']">{{ errors["passenger"] }}</span>
      </section>
    </div>
    <div class="content has-text-centered">
      <p>
        <button class="button is-primary">
          Start trip
        </button>
      </p>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'startTrip',
  computed: {
    ...mapGetters('passenger', { findPassengerInStore: 'find' }),
    ...mapGetters('ship', { findShipInStore: 'find' }),
    ...mapGetters('trip', { findTripInStore: 'find' }),
    passengers () {
      const passenger = this.findPassengerInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return passenger && passenger.data ? passenger.data : []
    },
    ships () {
      const ships = this.findShipInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return ships && ships.data ? ships.data : []
    },
    trips () {
      const trips = this.findTripInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return trips && trips.data ? trips.data : []
    }
  },
  data() {
    return {
      passenger: null,
      ship: null,
      errors: {}
    }
  },
  methods: {
    ...mapActions('trip', { createTrip: 'create' }),
    ...mapActions('passenger', { findPassenger: 'find' }),
    ...mapActions('ship', { findShip: 'find' }),
    ...mapActions('ship', { patchShip: 'patch' }),
    ...mapActions('trip', { findTrip: 'find' }),
    save() {
      if (this.validateForm()) {
        const trip = this.trips.find(x => x.passengerId === this.passenger && x.onBoard)
        if (trip) {
          this.errors = {}
          this.errors['passenger'] = 'there is a trip started for the provided data'
          return
        }
        const targetShip = this.ships.find(s => s.id === this.ship)
        if (targetShip.maxMarciansCount < 1) {
          this.errors = {}
          this.errors['passenger'] = `Ship ${targetShip.name} is full`
          return
        }
        this.createTrip({
          shipId: this.ship,
          passengerId: this.passenger
        }).then((data) => {
          this.patchShip([targetShip.id, {
            maxMarciansCount: (targetShip.maxMarciansCount - 1)
          }]).catch(err => {
            this.patchTrip([data.id, {
              onBoard: true
            }])
            this.errors = {}
            this.errors['updatePassenger'] = err
          })
        }).catch(err => {
          this.errors = {}
          this.errors['passenger'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
      if (!this.passenger) {
        this.errors['passenger'] = 'passenger is required'
      }
      if (!this.ship) {
        this.errors['ship'] = 'ship is required'
      }
      return Object.keys(this.errors).length === 0
    }
  },
  created() {
    this.findPassenger().catch(error => console.log(error))
    this.findShip().catch(error => console.log(error))
    this.findTrip().catch(error => console.log(error))
  }
}
</script>
