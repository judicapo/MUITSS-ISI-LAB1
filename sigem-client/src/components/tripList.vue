<template>
    <div class="content has-text-centered">
      <p>
        <template>
          <b-table :data="trips" :columns="columns"></b-table>
        </template>
      </p>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'tripList',
  props: {
    query: Object
  },
  computed: {
    ...mapGetters('trip', { findTripInStore: 'find' }),
    ...mapGetters('passenger', { findPassengerInStore: 'find' }),
    ...mapGetters('ship', { findShipInStore: 'find' }),
    passengers () {
      const passengers = this.findPassengerInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return passengers && passengers.data ? passengers.data : []
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
      if (this.ships){
        trips.data.map(x => {
          let ship = this.ships.find(s => s.id === x.shipId)
          if (ship) x = Object.assign(x, { shipName: ship.name })
        })
      }
      if (this.passengers){
        trips.data.map(x => {
          let passenger = this.passengers.find(p => p.id === x.passengerId)
          if (passenger) x = Object.assign(x, { passengerName: passenger.name })
        })
      }
      if (this.query) {
        let querykeys = Object.keys(this.query)
        if (querykeys.length > 0){
          trips.data = trips.data.filter(t =>
              querykeys.every(q => t[q] === this.query[q])
          )
        }
      }
      return trips && trips.data ? trips.data : []
    }
  },
  data() {
    return {
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'shipName',
            label: 'Ship Name'
        },
        {
            field: 'passengerName',
            label: 'Marcian name'
        },
        {
            field: 'onBoard',
            label: 'Is on trip'
        }
      ]
    }
  },
  methods: {
    ...mapActions('trip', { findTrips: 'find' }),
    ...mapActions('passenger', { findPassenger: 'find' }),
    ...mapActions('ship', { findShips: 'find' })
  },
  created() {
    this.findShips().catch(error => console.log(error))
    this.findPassenger().catch(error => console.log(error))
    this.findTrips().catch(error => console.log(error))
  }
}
</script>
