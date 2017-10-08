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
      <router-link class="button" to="/signup">Sign Up</router-link>
      <router-link class="button" to="/signin">Sign In</router-link>
    </section>
  </div>
</section>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
</style>
