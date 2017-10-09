import jsonwebtoken from 'jsonwebtoken'
import dateAddMonths from 'date-fns/add_months'
import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'
import db from '../db/db'

class UserController {
    constructor() {}

    getRefreshToken(email) {
        let refreshTokenData = {
            username: email,
            refreshToken: uuid(),
            expiration: dateAddMonths(new Date(), 1),
        }
        return refreshTokenData
    }

    getToken(email) {
        const token = jsonwebtoken.sign(
            { data: email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
        )
        return token
    }

    async authenticate(ctx) {
        //at this point it should check the user is valid
        const request = ctx.request.body

        const foundUsers = await this.findUser(request.email)
        if (!foundUsers || !foundUsers[0]) {
            ctx.throw(422, 'INVALID_CREDENTIALS')
        }
        else {
            const foundUser = foundUsers[0]

            try {
                let correct = await bcrypt.compare(
                    request.password,
                    foundUser.password
                )
                if (!correct) {
                    ctx.throw(422, 'INVALID_CREDENTIALS')
                }
            } catch (error) {
                ctx.throw(422, 'INVALID_DATA')
            }
        }

        ctx.status = 200
        ctx.body = {
            token: this.getToken(request),
            refreshToken: this.getRefreshToken(request.email)
        }        
    }
    async newUser(ctx) {
        //First let's save off the ctx.request.body. Throughout this project
        //we're going to try and avoid using the ctx.request.body and instead use
        //our own object that is seeded by the ctx.request.body initially
        const request = ctx.request.body

        //Now let's check for a duplicate username
        var [result] = await db('users')
        .where({
            username: request.username,
        })
        .count('id as id')

        if (result.id > 0) {
            ctx.throw(422, 'DUPLICATE_USERNAME')
        }

        //..and duplicate email
        [result] = await db('users')
            .where({
                email: request.email,
            })
            .count('id as id')
        if (result.id > 0) {
            ctx.throw(422, 'DUPLICATE_EMAIL')
        }

    
        try {
            request.password = await bcrypt.hash(request.password, 12)
        } catch (error) {
            ctx.throw(422, 'INVALID_DATA')
        }

        request['token'] = this.getRefreshToken(request.email)

        try {
            await db('users')
                .insert(request)
                .returning('id')

            ctx.status = 200
            ctx.body = {
                token: this.getToken(request),
                refreshToken: request.token
            }
        } catch (error) {
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async findUser(email) {
        const user = await db('users').where('email', email)
        return user
    }
}

export default UserController