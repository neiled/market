//Only run tests if we've specifically set NODE_ENV to testing
if (process.env.NODE_ENV !== 'testing') { throw new Error('NODE_ENV not set') }

//This starts the app up
import { server } from '../../server'

//Set up axios a little bit
import axios from 'axios'
const port = process.env.PORT || 3000
const url = 'http://localhost:'+port
const request = axios.create({ baseURL: url, validateStatus: false })

//Grab the db variable
import db from '../../db/db'

beforeAll(async () => {
    //As the tests start rollback and migrate our tables
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
})

afterAll(async () => {
    //After all the tests are done we're going to close our server
    //and rollback our database.
    await db.migrate.rollback()
    await db.destroy()
    return server.close()
})

describe('user account actions', () => {
    it('signs up a user', async () => {
        expect.assertions(4)

        const response = await request.post('/api/v1/auth/signup', {
            username: 'TestUsername',
            email: 'TestEmail@example.com',
            password: 'TestPassword',
        })

        const countOfUsers = parseInt((await db('users').where('username', 'TestUsername').count('id'))[0]['count'])
        expect(response.status).toBe(200)
        expect(countOfUsers).toBe(1)
        expect(response.data.token).toBeDefined()
        expect(response.data.refreshToken).toBeDefined()
    })

    it('wont sign up a user with a duplicate email', async () => {
        expect.assertions(5)

        const response = await request.post('/api/v1/auth/signup', {
            username: 'DupeEmailTest',
            email: 'DupeEmailTest@example.com',
            password: 'TestPassword',
        })
        expect(response.status).toBe(200)

        const responseOther = await request.post('/api/v1/auth/signup', {
            username: 'DupeEmailTest',
            email: 'DupeEmailTest@example.com',
            password: 'TestPassword',
        })
        expect(responseOther.status).toBe(422)
        const countOfUsers = parseInt((await db('users').where('email', 'TestEmail@example.com').count('id'))[0]['count'])
        expect(countOfUsers).toBe(1)
        expect(responseOther.data.token).toBeUndefined()
        expect(responseOther.data.refreshToken).toBeUndefined()
    })

    it('wont sign up a user with a duplicate username', async () => {
        expect.assertions(5)

        const response = await request.post('/api/v1/auth/signup', {
            username: 'DupeUsernameTest',
            email: 'DupeUsernameTest@example.com',
            password: 'TestPassword',
        })
        expect(response.status).toBe(200)

        const responseOther = await request.post('/api/v1/auth/signup', {
            username: 'DupeUsernameTest',
            email: 'DupeUsernameTest@example.com',
            password: 'TestPassword',
        })
        expect(responseOther.status).toBe(422)
        const countOfUsers = parseInt((await db('users').where('email', 'TestEmail@example.com').count('id'))[0]['count'])
        expect(countOfUsers).toBe(1)
        expect(responseOther.data.token).toBeUndefined()
        expect(responseOther.data.refreshToken).toBeUndefined()
    })

    it('signs in a user with correct password', async () => {
        expect.assertions(3)

        const response = await request.post('/api/v1/auth/signin', {
            email: 'test_email@example.com',
            password: 'secret',
        })

        expect(response.status).toBe(200)
        expect(response.data.token).toBeDefined()
        expect(response.data.refreshToken).toBeDefined()
    })

    it('does not sign in a user with incorrect password', async () => {
        expect.assertions(3)

        const response = await request.post('/api/v1/auth/signin', {
            email: 'test_email@example.com',
            password: 'WrongPassword',
        })

        expect(response.status).toBe(422)
        expect(response.data.token).toBeUndefined()
        expect(response.data.refreshToken).toBeUndefined()
    })

    it('does not sign in a user with incorrect email', async () => {
        expect.assertions(3)

        const response = await request.post('/api/v1/auth/signin', {
            email: 'wrong_test_email@example.com',
            password: 'secret',
        })

        expect(response.status).toBe(422)
        expect(response.data.token).toBeUndefined()
        expect(response.data.refreshToken).toBeUndefined()
    })

    it('retrieves the current users information', async () => {
        const response = await request.post('/api/v1/auth/signup', {
            username: 'RetrieveUser',
            email: 'RetrieveUser@example.com',
            password: 'TestPassword',
        })
        expect.assertions(1)
        const token = response.data.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

        const responseGet = await request.get('/api/v1/user/test')
        expect(responseGet.data.user.email).toBe('RetrieveUser@example.com')
    })

})
