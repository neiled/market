import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import Signin from '@/components/User/Signin.vue'

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
                'user/userSignin': () => { return },
            }
        })
    })

    it('Sign In Vue Bindings Test', () => {
        const wrapper = shallow(Signin, { store })

        expect(wrapper.vm.credentials.email).toBe('')
        expect(wrapper.vm.credentials.password).toBe('')

        wrapper.vm.credentials.email = 'test@email.com'
        wrapper.vm.credentials.password = 'testPassword'

        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.credentials.email).toBe('test@email.com')
        expect(wrapper.vm.credentials.password).toBe('testPassword')

        expect(wrapper.find('#signin-submit-button').exists()).toBeTruthy()
    })
})
