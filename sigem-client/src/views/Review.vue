<template>
  <div>
    <div class="card">
      <div class="card-content">
        <p></p>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <tripList :query="tripQuery"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import tripList from '@/components/tripList.vue'

export default {
  name: 'review',
  data() {
    return {
      tripQuery: {id: 'e25c7ae9-1b1b-4d40-a196-e1eaf058c088'}
    }
  },
  components: {
    tripList
  }
}
</script>
