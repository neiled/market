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
                ctx.throw(400, 'INVALID_DATA')
            }
    
            //Let's grab their ipaddress
            //TODO: This doesn't work correctly because of the reverse-proxy
            request.ipAddress = ctx.request.ip
    
            //Ok, at this point we can sign them up.
            try {
                var [result] = await db('users')
                    .insert(request)
                    .returning('id')
    
                //Let's send a welcome email.
                if (process.env.NODE_ENV !== 'testing') {
                    //Let's turn off welcome emails for the moment
    
                    // let email = await fse.readFile(
                    //     './src/email/welcome.html',
                    //     'utf8'
                    // )
                    // const emailData = {
                    //     to: request.email,
                    //     from: process.env.APP_EMAIL,
                    //     subject: 'Welcome To Koa-Vue-Notes-Api',
                    //     html: email,
                    //     categories: ['koa-vue-notes-api-new-user'],
                    //     substitutions: {
                    //         appName: process.env.APP_NAME,
                    //         appEmail: process.env.APP_EMAIL,
                    //     },
                    // }
                    // await sgMail.send(emailData)
                }
    
                //And return our response.
                ctx.body = { message: 'SUCCESS', id: result }
            } catch (error) {
                ctx.throw(400, 'INVALID_DATA')
            }
    }
}

export default UserController