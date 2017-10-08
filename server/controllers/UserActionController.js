import jsonwebtoken from 'jsonwebtoken'
import dateAddMonths from 'date-fns/add_months'
import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'
import db from '../db/db'

class UserController {
    constructor() {}

    async authenticate(ctx) {
        
        //at this point it should check the user is valid
        console.log(ctx)

        let refreshTokenData = {
            username: 'username',
            refreshToken: uuid(),
            expiration: dateAddMonths(new Date(), 1),
        }

        const token = jsonwebtoken.sign(
            { data: 'userData' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
        )
        ctx.body = {
            accessToken: token,
            refreshToken: refreshTokenData.refreshToken,
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

        try {
            var [result] = await db('users')
                .insert(request)
                .returning('id')

            ctx.body = { status: 200, id: result }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default UserController