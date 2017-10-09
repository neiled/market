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
      <a id="sign_out_button" v-if="user" v-on:click="logout()" class="button" to="#">Sign Out</a>
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
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  methods: {
    async logout() {
      this.$toasted.success('Signed Out')
      await this.$store.dispatch('user/userLogout')
    }
  }
}
</script>

<style scoped>
</style>
