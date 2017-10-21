import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import NavBar from '@/components/Generic/NavigationBar.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Router from 'vue-router'
Vue.use(Router)

describe('User action testing', () => {
    let store
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                user: {}
            },
            actions: {
                //swallow response
                'user/userSignup': () => { return },
                'user/userSignin': () => { return },
            }
        })
    })

    //If the user is logged in then show the sign out button only
    //If the user is logged out then show the sign in and the sign up buttons
    //I will add these tests as soon as it's easy to mock/stubb the router-link

    it('Should not show the sign out button if the user is logged out', () => {
      const wrapper = shallow(NavBar, {store})
      store.state.user = {user: false}
      wrapper.update()
      expect(wrapper.find('#signout-link').exists()).toBeFalsy()
    })

    it('Should show the sign out button if the user is logged in', () => {
      const wrapper = shallow(NavBar, {store})
      store.state.user = {user: true}
      wrapper.update()
      expect(wrapper.find('#signout-link').exists()).toBeTruthy()
    })

    it('Should show the home button if the user is logged in', () => {
      const wrapper = shallow(NavBar, {store})
      store.state.user = {user: true}
      wrapper.update()
      expect(wrapper.find('#home-link').exists()).toBeTruthy()
    })
})
