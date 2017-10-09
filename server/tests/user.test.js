//Only run tests if we've specifically set NODE_ENV to testing
if (process.env.NODE_ENV !== 'testing') { throw new Error('NODE_ENV not set') }

//This starts the app up
import { server } from '../server'

//Set up axios a little bit
import axios from 'axios'
const port = process.env.PORT || 3000
const url = 'http://localhost:'+port
const request = axios.create({ baseURL: url, validateStatus: false })

//Grab the db variable
import db from '../db/db'

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

    //This closes the app but it doesn't stop the tests in
    //Jest when done - that's why we have to --forceExit
    //when running Jest for now.
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

    it('signs in a user with correct password', async () => {
        expect.assertions(3)

        const response = await request.post('/api/v1/auth/signin', {
            username: 'test_user',
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
            username: 'test_user',
            email: 'test_email@example.com',
            password: 'WrongPassword',
        })

        expect(response.status).toBe(422)
        expect(response.data.token).toBeUndefined()
        expect(response.data.refreshToken).toBeUndefined()
    })

})
