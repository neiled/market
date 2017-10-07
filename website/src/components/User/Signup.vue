<template>
  <section class="section">
    <div class="container">
      <form v-on:submit.prevent autocomplete="off">
        <div class="field">
          <label for="email" class="label">Email</label>
          <div class="control">
            <input
              type="email"
              v-model.trim="credentials.email"
              @input="$v.credentials.email.$touch()"

              class="input">
          </div>
          <p class="help is-danger" v-if="$v.credentials.email.$error">Please enter a valid email address.</p>

        </div>
        <div class="field">
          <label for="username" class="label">Username</label>
          <div class="control">
            <input type="text"
              v-model.trim="credentials.username"
            class="input">
          </div>
        </div>
        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control">
            <input type="password"
              v-model.trim="credentials.password"
            class="input">
          </div>
        </div>
        <div class="field">
          <label for="password_conf" class="label">Password Confirmation</label>
          <div class="control">
            <input type="password"
              v-model.trim="credentials.passwordConfirm"
            class="input">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
                id="signup-submit-button"
                class="button is-primary"
                @click="submit()"
            >
            <span v-if="pending"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>
            <span v-else>Sign Up</span>
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
    import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

    export default {
        name: 'signup',
        data () {
            return {
                credentials: {
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirm: ''
                },
                pending: false
            }
        },
        methods: {
            async submit () {
                if (this.$v.$invalid) { this.$v.$touch(); return }

                this.pending = true

                const { username, email, password, passwordConfirm } = this.credentials
                const credentials = {
                    username,
                    email,
                    password,
                    passwordConfirm
                }

                try {
                    await this.$store.dispatch('user/userSignup', credentials)
                    this.$toasted.success('Successfully signed up. Please login.')
                    this.credentials.username = ''
                    this.credentials.email = ''
                    this.credentials.password = ''
                    this.credentials.passwordConfirm = ''
                    this.$v.$reset()
                    this.$router.push({name: 'login'})
                } catch (error) {
                    this.$toasted.error('Hmm, something you entered doesn\'t seem right.')
                } finally {
                    this.pending = false
                }
            }
        },
        validations: {
            credentials: {
                username: {
                    required,
                    minLength: minLength(3)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
                passwordConfirm: {
                    sameAs: sameAs('password')
                }
            }
        }
    }
</script>
