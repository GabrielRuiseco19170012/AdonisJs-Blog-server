'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentarySchema extends Schema {
  up () {
    this.create('commentaries', (table) => {
      table.increments()
      table.integer('publication_id').unsigned().references('id').inTable('publications').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('title', 80).notNullable()
      table.string('content', 300).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('commentaries')
  }
}

module.exports = CommentarySchema
