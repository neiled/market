<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/signin">Sign In</router-link>
  </div>
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
