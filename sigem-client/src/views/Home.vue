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
  </div>
</template>

<script>
// @ is an alias to /src
import mothership from '@/components/mothership.vue'
import ship from '@/components/ship.vue'

export default {
  name: 'home',
  components: {
    mothership,
    ship
  }
}
</script>
