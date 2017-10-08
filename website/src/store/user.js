import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL


const user = {
    namespaced: true,
    state: {
        user: null,
        accessToken: null,
        refreshToken: null
    },
    mutations: {
        SET_USER (state, data) {
            state.user = data
        },
        STORE_ACCESS_TOKEN (state, accessToken) {
            state.accessToken = accessToken
            localStorage.setItem('accessToken', accessToken)
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
        async userSignup ({ dispatch, commit, getters, rootGetters }, credentials) {
            try {
                return await axios.post('/api/v1/auth/signup', {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        async userSignin ({ dispatch, commit, getters, rootGetters }, credentials) {
            try {
                return await axios.post('/api/v1/auth/signin', {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default user
