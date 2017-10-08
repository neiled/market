//Only run tests if we've specifically set NODE_ENV to testing
if (process.env.NODE_ENV !== 'testing') { throw new Error('NODE_ENV not set') }

//This starts the app up
import { server } from '../server'

//Set up axios a little bit
import axios from 'axios'
const url = 'http://localhost:3000'
const request = axios.create({ baseURL: url })

//Grab the db variable
import db from '../db/db'

beforeAll(async () => {
    //As the tests start rollback and migrate our tables
    await db.migrate.rollback()
    await db.migrate.latest()
})

afterAll(async () => {
    //After all the tests are done we're going to close our server
    //and rollback our database.
    await db.migrate.rollback()

    //This closes the app but it doesn't stop the tests in
    //Jest when done - that's why we have to --forceExit
    //when running Jest for now.
    return server.close()
})

//////////
// User //
//////////

describe('user account actions', () => {
    it('signs up a user', async () => {
        expect.assertions(1)

        const response = await request.post('/api/v1/auth/signup', {
            username: 'TestUsername',
            email: 'TestEmail@example.com',
            password: 'TestPassword',
        })
        expect(response.status).toBe(200)
    })

})
