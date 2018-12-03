<template>
  <div class="columns">
    <div class="column">
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
    </div>
    <div class="column">
      <form action="" @submit.prevent="update">
        <div class="material-card-content">
          <p class="title">Create a new trip</p>
          <section class="modal-card-body">
            <b-field label="Ship to end trip">
              <b-select placeholder="Select" v-model="updateShip" expanded>
                <option v-for="item in ships" :key="item.id" :value="item.id"> {{ item.name  }}</option>
              </b-select>
            </b-field>
            <span class="error" v-show="errors['updateShip']">{{ errors["updateShip"] }}</span>
            <b-field label="Marcian to end trip">
              <b-select placeholder="Select" v-model="updatePassenger" expanded>
                <option v-for="item in passengers" :key="item.id" :value="item.id"> {{ item.name  }}</option>
              </b-select>
            </b-field>
            <span class="error" v-show="errors['updatePassenger']">{{ errors["updatePassenger"] }}</span>
          </section>
        </div>
        <div class="content has-text-centered">
          <p>
            <button class="button is-primary">
              End trip
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'passenger',
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
      updateShip: null,
      updatePassenger: null,
      errors: {}
    }
  },
  methods: {
    ...mapActions('trip', { createTrip: 'create' }),
    ...mapActions('trip', { patchTrip: 'patch' }),
    ...mapActions('passenger', { findPassenger: 'find' }),
    ...mapActions('ship', { findShip: 'find' }),
    ...mapActions('trip', { findTrip: 'find' }),
    save() {
      if (this.validateForm()) {
        const trip = this.trips.find(x => x.passengerId === this.passenger && x.onBoard)
        if (trip) {
          this.errors = {}
          this.errors['passenger'] = 'there is a trip started for the provided data'
          return
        }
        this.createTrip({
          shipId: this.ship,
          passengerId: this.passenger
        }).then(() => {
        }).catch(err => {
          this.errors = {}
          this.errors['passenger'] = err
        })
      }
    },
    update() {
      if (this.validateUpdateForm()) {
        const trip = this.trips.find(x => x.shipId == this.updateShip && x.passengerId === this.updatePassenger && x.onBoard)
        if (!trip) {
          this.errors = {}
          this.errors['updatePassenger'] = 'there is no trip started for the provided data'
          return
        }
        this.patchTrip([trip.id, {
          onBoard: false
        }]).then(() => {
        }).catch(err => {
          this.errors = {}
          this.errors['updatePassenger'] = err
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
    },
    validateUpdateForm() {
      this.errors = {}
      if (!this.updateShip) {
        this.errors['updateShip'] = 'updateShip is required'
      }
      if (!this.updatePassenger) {
        this.errors['updatePassenger'] = 'updatePassenger is required'
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
