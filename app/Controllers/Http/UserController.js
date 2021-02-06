'use strict'
const {hashPassword} = require("@adonisjs/auth/templates/UserHook");
const User = use('App/Models/User')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({response}) {

    const data = await User.all();
    try {
      return response.status(200).send({'Data': data});
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({request, response}) {

    const rules =
      {
        username: 'required|string',
        first_name: 'required|string',
        last_name: 'required|string',
        email: 'required|email|unique:users,email',
        password: 'required'
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {username, first_name, last_name, email, password} = request.only([
          'username',
          'first_name',
          'last_name',
          'email',
          'password'
        ])

        await User.create({
          username,
          first_name,
          last_name,
          email,
          password
        })

        return response.send({message: 'User has been created'})
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }

  }

  // /**
  //  * Create/save a new user.
  //  * POST users
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  */
  // async store({request, response}) {
  // }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({params, response}) {

    const user = await User.find(params.id)
    const res = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }

    return response.json(res)
  }

  // /**
  //  * Render a form to update an existing user.
  //  * GET users/:id/edit
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  * @param {View} ctx.view
  //  */
  // async edit({params, request, response, view}) {
  // }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({request, response}) {
    try {
      const data = request.only(['username','first_name', 'last_name', 'email', 'password']);
      const user = request.p
      user.username = data.username;
      user.first_name = data.first_name;
      user.last_name = data.last_name;
      user.email = data.email;
      user.password = hashPassword(data.password);
      await user.save();
      return response.status(200).json(user);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const user = request.p
      await user.delete();
      return response.status(204).send('status Persona deleted');
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  async login({request, response, auth}) {
    const {email, password} = request.only(['email', 'password'])
    const token = await auth.attempt(email, password)
    return response.json(token)
  }

  async loggedIn({response, auth}) {
    try {
      const user = await auth.getUser()
      return {
        id: user.id,
        state: true
      }
    } catch (error) {
      return response.json({state: false})
    }
  }

  async loginCheck({auth}) {
    try{
      const user = await auth.getUser()
      return !!user;
    }catch (e){
      return false
    }
  }

}

module.exports = UserController
