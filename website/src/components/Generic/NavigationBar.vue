<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <router-link id="signup-link" v-if="!user" class="navbar-item" to="/signup">Sign Up</router-link>
    <router-link id="signin-link" v-if="!user" class="navbar-item" to="/signin">Sign In</router-link>
    <router-link id="home-link" v-if="user" class="navbar-item" to="/home">Home</router-link>
    <a id="signout-link" v-if="user" v-on:click="logout()" class="navbar-item" to="#">Sign Out</a>
  </nav>
</template>

<script>
  export default {
    name: 'NavigationBar',
    data () {
      return {
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
    },
  }
</script>
