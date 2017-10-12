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

    it('NavBar Vue Bindings Test', () => {
        const wrapper = shallow(NavBar, { store })

        expect(wrapper.vm.user.logged_in).toBeFalsy()

        wrapper.vm.user.logged_in = true

        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.user.logged_in).toBeTruthy()
    })

    //If the user is logged in then show the sign out button only
    //If the user is logged out then show the sign in and the sign up buttons

    it('Should show the sign in button if the user is logged out', () => {
      const wrapper = shallow(NavBar, {store})
      wrapper.vm.user.logged_in = false
      wrapper.update()

      console.log(wrapper.find('#signin-link').exists())
      expect(wrapper.find('#signin-link').exists()).toBeTruthy()
    })

    it('Should show the sign up button if the user is logged out', () => {
      const wrapper = shallow(NavBar, {store})
      wrapper.vm.user.logged_in = false
      wrapper.update()

      console.log(wrapper.find('#signup-link').exists())
      expect(wrapper.find('#signup-link').exists()).toBeTruthy()
    })

    it('Should show the sign out button if the user is logged in', () => {
      const wrapper = shallow(NavBar, {store})
      wrapper.vm.user.logged_in = true
      wrapper.update()

      console.log(wrapper.find('#signout-link').exists())
      expect(wrapper.find('#signout-link').exists()).toBeTruthy()
    })
})
