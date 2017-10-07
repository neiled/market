import Router from 'koa-router'
const router = new Router({prefix: '/api/v1/auth'})
import UserController from '../controllers/UserActionController'
const userController = new UserController()

router.post('/signin', async function (ctx) {
  console.log('sign in')
  await userController.authenticate(ctx)
})

router.post('/signup', async function (ctx) {
  console.log('sign up')
  await userController.new_user(ctx)
})

router.get('/test', async function (ctx) {
  console.log('test api')
  console.log(ctx.state.user)
  ctx.body = 'test api ok'
})

export default router