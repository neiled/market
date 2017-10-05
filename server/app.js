import Koa from 'koa'
var app = new Koa()
import jwt from 'koa-jwt'
import cors from 'kcors'
import session from 'koa-session'

const serverOrigin = (process.env.WEB_URL || 'http://localhost:8080')
const origin = {origin: serverOrigin}

app.use(cors(origin))
app.use(session(app))


app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      throw err
    }
  })
})

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: process.env.JWT_SECRET }))

// app
//   .use(sessionRouter.routes())
//   .use(sessionRouter.allowedMethods())

export default app
