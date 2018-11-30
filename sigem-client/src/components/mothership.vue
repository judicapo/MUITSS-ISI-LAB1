<template>
  <div class="columns">
    <div class="column">
      <form action="" @submit.prevent="save">
        <div class="material-card-content">
          <p class="title">Create a new mothership</p>
          <section class="modal-card-body">
            <b-field label="Mothership name">
              <b-input
                  name="name"
                  v-model="mothershipName"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['mothershipName']">{{ errors["mothershipName"] }}  </span>
          </section>
        </div>
        <div class="content has-text-centered">
          <p>
            <button class="button is-primary">
              Create
            </button>
          </p>
        </div>
      </form>
    </div>
    <div class="column">
      <div class="content has-text-centered">
        <p>
          <template>
            <b-table :data="motherships" :columns="columns"></b-table>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'mothership',
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
      mothershipName: null,
      errors: {},
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'name',
            label: 'Ship name',
        }
      ]
    }
  },
  methods: {
    ...mapActions('mothership', { findMotherships: 'find' }),
    ...mapActions('mothership', { createMothership: 'create' }),
    save() {
      if (this.validateForm()) {
        this.createMothership({
          name: this.mothershipName
        }).then(() => {
          this.mothershipName = ''
        }).catch(err => {
          this.errors = {}
          this.errors['mothershipName'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
      if (!this.mothershipName) {
        this.errors['mothershipName'] = 'ship name is required'
      }
      return Object.keys(this.errors).length === 0
    }
  },
  created() {
    this.findMotherships().catch(error => console.log(error))
  }
}
</script>
