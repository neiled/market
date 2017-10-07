import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import Signup from '@/components/User/Signup.vue'

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
            }
        })
    })

    it('Signup.vue test', () => {
        const wrapper = shallow(Signup, { store })

        expect(wrapper.vm.credentials.username).toBe('')
        expect(wrapper.vm.credentials.email).toBe('')
        expect(wrapper.vm.credentials.password).toBe('')
        expect(wrapper.vm.credentials.passwordConfirm).toBe('')

        wrapper.vm.credentials.username = 'testUsername'
        wrapper.vm.credentials.email = 'test@email.com'
        wrapper.vm.credentials.password = 'testPassword'
        wrapper.vm.credentials.passwordConfirm = 'testPassword'

        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.credentials.username).toBe('testUsername')
        expect(wrapper.vm.credentials.email).toBe('test@email.com')
        expect(wrapper.vm.credentials.password).toBe('testPassword')
        expect(wrapper.vm.credentials.passwordConfirm).toBe('testPassword')

        expect(wrapper.find('#signup-submit-button')).toBeTruthy()
    })
})
