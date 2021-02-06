'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Persona = use('App/Models/Persona')

class FindPersona {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({request, response, params: {id}}, next) {

    const persona = await Persona.findBy('id', id)
    if (!persona) {
      return response.status(404).json({
        message: 'Persona not found', id
      })
    }
    // const nombre = persona.nombre;
    // const apellido = persona.apellido;
    // const edad = persona.edad;

    request.p = persona;
    // {id,nombre, apellido, edad}

    await next()
  }
}

module.exports = FindPersona
