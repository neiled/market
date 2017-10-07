import jsonwebtoken from 'jsonwebtoken'
import dateAddMonths from 'date-fns/add_months'
import uuid from 'uuid/v4'

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
        //at this point it should create the user
        ctx.status = 200

    }
}

export default UserController