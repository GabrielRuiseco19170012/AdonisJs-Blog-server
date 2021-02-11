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
// User
// Create
Route.post('register', 'UserController.create')
// login
Route.post('login', 'UserController.login')
Route.get('loggedIn', 'UserController.loggedIn')
Route.get('loginCheck', 'UserController.loginCheck')
Route.post('logout', 'UserController.logout').middleware('auth')
// Read
Route.get('getuser/:id', 'UserController.show').middleware(['auth', 'FindUser'])
Route.get('getallusers', 'UserController.index').middleware('auth')
// Update
Route.put('update/:id', 'UserController.update').middleware(['auth', 'FindUser'])
// Delete
Route.delete('delete/:id', 'UserController.destroy').middleware(['auth', 'FindUser'])


Route.group(() => {

// Publications
// Create
  Route.post('insert/publication/', 'PublicationController.insertPublications')
// Read
  Route.get('show/publication/', 'PublicationController.selectPublications')
  Route.get('show/publication/id', 'PublicationController.selectPublicationByID')
  Route.get('show/publication/title', 'PublicationController.selectPublicationByTitle')
// Update
  Route.put('update/publication/title/', 'PublicationController.updatePublicationTitle')
  Route.put('update/publication/text/', 'PublicationController.updatePublicationText')
// Delete
  Route.delete('delete/publication/', 'PublicationController.deletePublication')

// Commentaries
//Create commentary
  Route.post('create/commentary', 'CommentaryController.createCommentary')
//Read commentary
  Route.get('show/commentary', 'CommentaryController.showCommentary')
  Route.get('show/comments', 'CommentaryController.showAllCommentary')
  Route.get('show/publication/comments', 'CommentaryController.showCommentaryPublication')
//Update commentary
  Route.put('update/comment', 'CommentaryController.update')
//Delete commentary
  Route.delete('delete/commentary', 'CommentaryController.deleteCommentary')

}).middleware('auth').prefix('api/')

