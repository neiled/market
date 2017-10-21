<template>
  <h1>Welcome {{user.username}}</h1>
</template>

<script>
export default {
  name: 'Home',
    data () {
      return {
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user
      }
    },

}
</script>
