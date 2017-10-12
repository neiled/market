<template>
<section>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ msg }}</h1>
        </div>
      </div>
    </section>
    <section>
      <NavigationBar />
    </section>
  </div>
</section>
</template>

<script>
import NavigationBar from '@/components/Generic/NavigationBar'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  },
  components: {
    NavigationBar
  }
}
</script>

<style scoped>
</style>
