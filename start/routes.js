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
  return { greeting: 'Hello world in JSON' }
})
Route.group(()=>{
  Route.get('/show/publication/','PublicationController.selectPublications')
  Route.get('/show/publication/id','PublicationController.selectPublicationsByID')
  Route.get('/show/publication/title','PublicationController.selectPublicationsByTitle')
  Route.post('/insert/publication/','PublicationController.insertPublications')
  Route.put('/update/publication/title/','PublicationController.updatePublicationTitle')
  Route.put('/update/publication/text/','PublicationController.updatePublicationText')
  Route.delete('/delete/publication/','PublicationController.deletePublication')
}).prefix('api/v1')
