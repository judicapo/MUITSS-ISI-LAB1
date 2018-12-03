<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
              <startTrip/>
          </div>
          <div class="column">
              <endTrip/>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
          <tripList/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import startTrip from '@/components/startTrip.vue'
import endTrip from '@/components/endTrip.vue'
import tripList from '@/components/tripList.vue'

export default {
  name: 'trip',
  components: {
    startTrip,
    endTrip,
    tripList
  }
}
</script>
