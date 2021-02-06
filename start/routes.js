'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {greeting: 'Hello world in JSON'}
})

Route.post('login', 'UserController.login')
Route.post('register', 'UserController.create')
Route.get('getuser/:id', 'UserController.show').middleware(['auth','FindPersona'])
Route.get('getallusers', 'UserController.index').middleware('auth')
Route.get('update', 'UserController.index').middleware(['auth','FindPersona'])
Route.get('delete', 'UserController.destroy').middleware(['auth','FindPersona'])
Route.get('loggedIn', 'UserController.loggedIn')
Route.get('loginCheck', 'UserController.loginCheck')
