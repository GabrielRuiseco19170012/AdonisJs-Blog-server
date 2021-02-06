'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicationSchema extends Schema {
  up () {
    this.create('publications', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('title', 80).notNullable()
      table.string('content', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('publications')
  }
}

module.exports = PublicationSchema
