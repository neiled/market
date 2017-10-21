import Router from 'koa-router'
const router = new Router({prefix: '/api/v1/user'})
import UserController from '../controllers/UserActionController'
const userController = new UserController()


router.get('/test', async function (ctx) {
  console.log('user/test')
  await userController.getUser(ctx)
})

export default router