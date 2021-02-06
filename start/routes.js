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

Route.group(()=>{
  Route.get('/show/publication/','PublicationController.selectPublications')
  Route.get('/show/publication/id','PublicationController.selectPublicationsByID')
  Route.get('/show/publication/title','PublicationController.selectPublicationsByTitle')
  Route.post('/insert/publication/','PublicationController.insertPublications')
  Route.put('/update/publication/title/','PublicationController.updatePublicationTitle')
  Route.put('/update/publication/text/','PublicationController.updatePublicationText')
  Route.delete('/delete/publication/','PublicationController.deletePublication')
}).prefix('api/v1')

//Create commentary
Route.post('create/commentary','CommentaryController.createCommentary')
//Read commentary
Route.group(() => {
  Route.get('commentary', 'CommentaryController.showCommentary')
  Route.get('comments', 'CommentaryController.showAllCommentary')
  Route.get('publication/comments', 'CommentaryController.showCommentaryPublication')
}).prefix('show/')
//Update commentary
Route.group(() => {
  Route.post('title', 'CommentaryController.updateCommentaryTitle')
  Route.post('content', 'CommentaryController.updateCommentaryContent')
}).prefix('update/')
//Delete commentary
Route.delete('delete/commentary','CommentaryController.deleteCommentary')

