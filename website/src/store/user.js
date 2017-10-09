import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.API_URL

const SET_USER = 'SET_USER'
const STORE_ACCESS_TOKEN = 'STORE_ACCESS_TOKEN'
const STORE_REFRESH_TOKEN = 'STORE_REFRESH_TOKEN'

const user = {
    namespaced: true,
    state: {
        user: null,
        token: null,
        refreshToken: null
    },
    mutations: {
        SET_USER (state, data) {
            state.user = data
        },
        STORE_ACCESS_TOKEN (state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        STORE_REFRESH_TOKEN (state, refreshToken) {
            state.refreshToken = refreshToken
            localStorage.setItem('refreshToken', refreshToken)
        },
    },
    getters: {
        user (state) {
            return state.user
        }
    },
    actions: {
        async setUserAndTokens ({ dispatch, commit, getters, rootGetters }, data) {
          try {
              let decoded = jwtDecode(data.token)
              commit(SET_USER, decoded.data)
              commit(STORE_ACCESS_TOKEN, data.token)
              commit(STORE_REFRESH_TOKEN, data.refreshToken)
          } catch (error) {
              throw new Error(error)
          }
        },
        async userSignup ({ dispatch, commit, getters, rootGetters }, credentials) {
            try {
                const response = await axios.post('/api/v1/auth/signup', {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                })
                return await dispatch('setUserAndTokens', {token: response.data.token, refreshToken: response.data.refreshToken})

            } catch (error) {
                throw new Error(error)
            }
        },
        async userSignin ({ dispatch, commit, getters, rootGetters }, credentials) {
            try {
                const response = await axios.post('/api/v1/auth/signin', {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                })
                return await dispatch('setUserAndTokens', {token: response.data.token, refreshToken: response.data.refreshToken})
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default user
