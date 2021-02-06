'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Commentary extends Model {
  user () {
    return this.hasOne('App/Models/User',"id","user_id")
  }

  publication () {
    return this.hasOne('App/Models/Publication',"id","publication_id")
  }
}

module.exports = Commentary
