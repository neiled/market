import Koa from 'koa'
var app = new Koa()
import jwt from 'koa-jwt'
import cors from 'kcors'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import error from 'koa-json-error'
import authRouter from './routes/auth'
import userRouter from './routes/user'

app.use(async (ctx, next) => {
  try {
      await next()
      console.log(
          ctx.method + ' ' + ctx.url + ' RESPONSE: ' + ctx.response.status
      )
  } catch (error) {
    //Do nothing
  }
})

//Apply error json handling
let errorOptions = {
  postFormat: (e, obj) => {
      //Here's where we'll stick our error logger.
      console.log(obj)
      if (process.env.NODE_ENV !== 'production') {
          return obj
      } else {
          delete obj.stack
          delete obj.name
          return obj
      }
  },
}
app.use(error(errorOptions))

// const serverOrigin = (process.env.WEB_URL || 'http://localhost:8080')
// const origin = {origin: serverOrigin}

app.use(bodyParser({ enableTypes: ['json'] }))
// app.use(cors(origin))
app.use(cors({ origin: '*' }))
app.use(session(app))

app
  .use(authRouter.routes())
  .use(authRouter.allowedMethods())


app.use(function (ctx, next) {
    return next().catch((err) => {
        if (err.status === 401) {
            console.log('oh hai')
            ctx.status = 401
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message
            }
        } else {
            throw err
        }
    })
})

app.use(jwt({ secret: process.env.JWT_SECRET}))

app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())

export default app