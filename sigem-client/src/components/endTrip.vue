<template>
  <form action="" @submit.prevent="update">
    <div class="material-card-content">
      <p class="title">End a trip</p>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'endTrip',
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
      updateShip: null,
      updatePassenger: null,
      errors: {}
    }
  },
  methods: {
    ...mapActions('trip', { patchTrip: 'patch' }),
    ...mapActions('passenger', { findPassenger: 'find' }),
    ...mapActions('ship', { findShip: 'find' }),
    ...mapActions('ship', { patchShip: 'patch' }),
    ...mapActions('trip', { findTrip: 'find' }),
    update() {
      if (this.validateUpdateForm()) {
        const ship = this.ships.find(x => x.id === this.updateShip)
        const trip = this.trips.find(x => x.shipId === ship.id && x.passengerId === this.updatePassenger && x.onBoard)
        if (!trip) {
          this.errors = {}
          this.errors['updatePassenger'] = 'there is no trip started for the provided data'
          return
        }
        this.patchTrip([trip.id, {
          onBoard: false
        }]).then(() => {
          this.patchShip([ship.id, {
            maxMarciansCount: (ship.maxMarciansCount + 1)
          }]).catch(err => {
            this.patchTrip([trip.id, {
              onBoard: true
            }])
            this.errors = {}
            this.errors['updatePassenger'] = err
          })
        }).catch(err => {
          this.errors = {}
          this.errors['updatePassenger'] = err
        })
      }
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
