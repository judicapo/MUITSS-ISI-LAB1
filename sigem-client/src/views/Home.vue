<template>
  <div>
    <div class="card">
      <div class="card-content">
        <mothership />
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <ship />
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <passenger />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mothership from '@/components/mothership.vue'
import ship from '@/components/ship.vue'
import passenger from '@/components/passenger.vue'

export default {
  name: 'home',
  components: {
    mothership,
    ship,
    passenger
  }
}
</script>
