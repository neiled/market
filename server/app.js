import Koa from 'koa'
var app = new Koa()
import jwt from 'koa-jwt'
import cors from 'kcors'
import session from 'koa-session'
import userRouter from './routes/user'

const serverOrigin = (process.env.WEB_URL || 'http://localhost:8080')
const origin = {origin: serverOrigin}

app.use(cors(origin))
app.use(session(app))

app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())


// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: process.env.JWT_SECRET }))


export default app
