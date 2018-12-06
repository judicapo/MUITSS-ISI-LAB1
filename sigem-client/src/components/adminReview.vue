<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <form action="" @submit.prevent="save">
              <div class="material-card-content">
                <p class="title">Make a review</p>
                <b-field label="Type your name">
                  <b-input
                      name="name"
                      v-model="username"
                      type="name">
                  </b-input>
                </b-field>
                <span class="error" v-show="errors['username']">{{ errors["username"] }}  </span>
                <b-field label="Select ship to review">
                  <b-select placeholder="Select" v-model="ship" expanded>
                    <option v-for="item in ships" :key="item.id" :value="item.id"> {{ item.name }}</option>
                  </b-select>
                </b-field>
                <span class="error" v-show="errors['ship']">{{ errors["ship"] }}</span>
                <b-field label="Pick a date">
                  <b-datepicker v-model="date" :date-formatter="(date) => date.toUTCString()" position="is-top-right">
                  </b-datepicker>
                </b-field>
                <span class="error" v-show="errors['date']">{{ errors["date"] }}</span>
              </div>
              <div class="content has-text-centered">
                <p>
                  <button class="button is-primary">
                    Show tip information
                  </button>
                </p>
              </div>
            </form>
          </div>
          <div class="column">
            <div class="content has-text-centered">
              <p>
                <b-table :data="reviews" :columns="columns"></b-table>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-show="showTrips">
      <div class="card-content">
        <tripList :query="tripQuery"/>
      </div>
    </div>
  </div>
</template>

<script>
import tripList from '@/components/tripList.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'adminReview',
  components: {
    tripList
  },
  computed: {
    ...mapGetters('trip', { findTripInStore: 'find' }),
    ...mapGetters('trip-review', { findReviewInStore: 'find' }),
    ...mapGetters('ship', { findShipInStore: 'find' }),
    ships () {
      const ships = this.findShipInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return ships && ships.data ? ships.data : []
    },
    reviews () {
      const reviews = this.findReviewInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      if (this.ships){
        reviews.data.map(x => {
          let ship = this.ships.find(s => s.id === x.shipId)
          if (ship) x = Object.assign(x, { targetShip: ship.name })
        })
      }
      return reviews && reviews.data ? reviews.data : []
    },
    trips () {
      const trips = this.findTripInStore({
        query: this.tripQuery
      })
      return trips && trips.data ? trips.data : []
    }
  },
  data() {
    return {
      showTrips: false,
      tripQuery: null,
      username: null,
      ship: null,
      date: null,
      errors: {},
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'username',
            label: 'User name',
        },
        {
            field: 'targetDate',
            label: 'Review date',
        },
        {
            field: 'targetShip',
            label: 'Reviewed ship',
        }
      ]
    }
  },
  methods: {
    ...mapActions('trip', { findTrips: 'find' }),
    ...mapActions('trip-review', { findReviews: 'find' }),
    ...mapActions('trip-review', { createReview: 'create' }),
    ...mapActions('ship', { findShip: 'find' }),
    save() {
      if (this.validateForm()) {
        this.createReview({
          username: this.username,
          targetDate: this.date,
          shipId: this.ship
        }).then(() => {
          this.initializeQuery({ shipId: this.ship })
          this.showTrips = true
          this.username = ''
        }).catch(err => {
          this.errors = {}
          this.errors['username'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
      this.showTrips = false
      let targetTrips = this.trips
      if (targetTrips.length > 0) {
        if (this.tripQuery) {
          let querykeys = Object.keys(this.tripQuery)
          if (querykeys.length > 0){
            targetTrips = this.trips.filter(t =>
                querykeys.every(q => t[q] === this.tripQuery[q])
            )
          }
        }
      }
      if (targetTrips.length === 0) {
        this.errors['username'] = 'No trips in system'
      }
      if (!this.username) {
        this.errors['username'] = 'User name is required'
      }
      if (!this.ship) {
        this.errors['ship'] = 'ship is required'
      }
      if (!this.date) {
        this.errors['date'] = 'date is required'
      }
      const getLatestDate = function (xs) {
        if (xs && xs.length) {
          return xs.reduce((m,v,i) => (v.updatedAt > m.updatedAt) && i ? v : m).updatedAt
        }
        return null
      }
      const lastReview = getLatestDate(this.reviews.filter(x => x.shipId === this.ship))
      if (lastReview) {
        const lastDate = new Date(lastReview.split('.')[0])
        // const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        // const diffDays = Math.round(Math.abs(((new Date).getTime() - lastDate.getTime())/(oneDay)));
        // if (diffDays <= 1) {
        //   this.errors['date'] = 'a review has been done today!'
        // }
        if (new Date().toLocaleDateString() === lastDate.toLocaleDateString()) {
          this.errors['date'] = 'a review has been done today!'
        }
      }
      
      return Object.keys(this.errors).length === 0
    },
    initializeQuery (q) {
      this.tripQuery = Object.assign(q ? q : {} , {
        onBoard: 1
      })
    }
  },
  beforeMount() {
    this.initializeQuery()
  },
  mounted() {
    this.findTrips({
      query: this.tripQuery
    }).catch(error => console.log(error))
    this.findShip().catch(error => console.log(error))
    this.findReviews().catch(error => console.log(error))
  }
}
</script>
