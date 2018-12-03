<template>
  <div>
    <div class="card">
      <div class="card-content">
        <adminPassenger/>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import adminPassenger from '@/components/adminPassenger.vue'

export default {
  name: 'trip',
  components: {
    adminPassenger
  }
}
</script>
