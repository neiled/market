<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <router-link id="signup-link" v-if="!user.logged_in" class="navbar-item" to="/signup">Sign Up</router-link>
    <router-link id="signin-link" v-if="!user.logged_in" class="navbar-item" to="/signin">Sign In 2</router-link>
    <a id="signout-link" v-if="user.logged_in" v-on:click="logout()" class="navbar-item" to="#">Sign Out</a>
  </nav>
</template>

<script>
  export default {
    name: 'NavigationBar',
    data () {
      return {
        user: {
          logged_in: false,
        },
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
