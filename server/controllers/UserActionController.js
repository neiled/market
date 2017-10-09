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
        console.log(ctx)
        const request = ctx.request.body

        ctx.body = {
            status: 200,
            token: this.getToken(request),
            refreshToken: this.getRefreshToken(request.email)
        }        
    }

    async new_user(ctx) {
        //First let's save off the ctx.request.body. Throughout this project
        //we're going to try and avoid using the ctx.request.body and instead use
        //our own object that is seeded by the ctx.request.body initially
        const request = ctx.request.body
    
        try {
            request.password = await bcrypt.hash(request.password, 12)
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }

        request['token'] = this.getRefreshToken(request.email)

        try {
            var [result] = await db('users')
                .insert(request)
                .returning('id')

            ctx.body = {
                status: 200,
                token: this.getToken(request),
                refreshToken: request.token
            }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default UserController