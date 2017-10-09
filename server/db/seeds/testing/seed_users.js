//I only want migrations, rollbacks, and seeds to run when the NODE_ENV is specified
//in the knex seed/migrate command. Knex will error out if it is not specified.
if (!process.env.NODE_ENV) { throw new Error('NODE_ENV not set') }

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') { throw new Error('Can\'t run seeds in production') }

const faker = require('faker')
const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
    //Make 10 users using faker. Note: we're also bcrypting
    //the passwords to make it exactly like the real app. All their
    //passwords will be 'secret'
    let seedData = []
    let password = 'secret'
    try {
        password = await bcrypt.hash(password, 12)
    } catch (error) {
        throw new Error('PASSWORD_ENCRIPTION_ERROR')
    }

    for (let i = 0; i < 5; i++) {

        let testUser = {
            token: faker.internet.password(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: password,
        }
        seedData.push(testUser)
    }

    seedData.push({username:'test_user', email:'test_email@example.com', password: password, token: password})

    // Deletes ALL existing entries
    await knex('users').truncate()

    //Insert users
    await knex('users').insert(seedData)
}