<template>
  <div class="home">
    <div class="columns">
      <div class="column">
        <mothership />
      </div>
      <div class="column">
        <ship />
      </div>
      <div class="column">
      </div>
    </div>
    <div>
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
