<template>
  <div class="columns">
    <div class="column">
      <form action="" @submit.prevent="save">
        <div class="material-card-content">
          <p class="title">Create a new passenger</p>
          <section class="modal-card-body">
            <b-field label="Type the marcian name">
              <b-input
                  name="name"
                  v-model="passengerName"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['passengerName']">{{ errors["passengerName"] }}</span>
          </section>
        </div>
        <div class="content has-text-centered">
          <p>
            <button class="button is-primary">
              Register passenger
            </button>
          </p>
        </div>
      </form>
    </div>
    <div class="column">
      <div class="content has-text-centered">
        <p>
          <template>
            <b-table :data="passengers" :columns="columns"></b-table>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'passenger',
  computed: {
    ...mapGetters('passenger', { findPassengerInStore: 'find' }),
    passengers () {
      const passenger = this.findPassengerInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return passenger && passenger.data ? passenger.data : []
    }
  },
  data() {
    return {
      passengerName: null,
      errors: {},
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'name',
            label: 'Marcian name',
        }
      ]
    }
  },
  methods: {
    ...mapActions('passenger', { createPassenger: 'create' }),
    ...mapActions('passenger', { findPassenger: 'find' }),
    save() {
      if (this.validateForm()) {
        this.createPassenger({
          name: this.passengerName
        }).then(() => {
          this.passengerName = ''
        }).catch(err => {
          this.errors = {}
          this.errors['passengerName'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
      if (!this.passengerName) {
        this.errors['passengerName'] = 'passenger name is required'
      }
      return Object.keys(this.errors).length === 0
    }
  },
  created() {
    this.findPassenger().catch(error => console.log(error))
  }
}
</script>
