
<template>
  <section class="section">
    <div class="container">
      <div class="notification is-warning" v-if="error">
        {{ error }}
      </div>
      <form v-on:submit.prevent autocomplete="off">
        <div class="field">
          <label for="email" class="label">Email</label>
          <div class="control">
            <input
              type="email"
              v-model.trim="credentials.email"
              name="email"
              @input="$v.credentials.email.$touch()"
              class="input">
          </div>
          <p class="help is-danger" v-if="$v.credentials.email.$error">Please enter a valid email address.</p>
        </div>
        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control">
            <input type="password"
              name="password"
              v-model.trim="credentials.password"
            class="input">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
                id="signin-submit-button"
                class="button is-primary"
                @click="submit()"
            >
            <span v-if="pending"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>
            <span v-else>Sign In</span>
            </button>
          </div>
          <div class="control">
            <router-link to="/" class="button is-link">Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        name: 'Signin',
        data () {
            return {
                credentials: {
                    email: '',
                    password: ''
                },
                pending: false,
                error: null
            }
        },
        methods: {
            async submit () {
                if (this.$v.$invalid) { this.$v.$touch(); return }

                this.error = null
                this.pending = true

                const { email, password} = this.credentials
                const credentials = {
                    email,
                    password
                }

                try {
                  await this.$store.dispatch('user/userSignin', credentials)
                  this.$toasted.success('Signed In')
                  this.credentials.email = ''
                  this.credentials.password = ''
                  this.$v.$reset()
                  this.$router.push({name: '/'})
                } catch (error) {
                  this.error = 'Incorrect email and/or password'
                } finally {
                    this.pending = false
                }
            }
        },
        validations: {
            credentials: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                },
            }
        }
    }
</script>

