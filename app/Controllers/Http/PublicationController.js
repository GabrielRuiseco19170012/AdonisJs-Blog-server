'use strict'
const Database = use('Database')
const Publication = use('App/Models/Publication')

class PublicationController {
  async selectPublications() {
    return await Database.select("*").from("Publications")
  }

  async selectPublicationByID({request}) {
    const id = request.only('id')
    return await Database.select('*').from('Publications').where({id: id['id']})
  }

  async selectPublicationByTitle({request}) {
    const title = request.only('title')
    return await Database.select('*').from('Publications').where({title: title['title']})
  }

  async insertPublications({request, response}) {
    const {user_id, title, content} = request.all()
    const newPublication = new Publication()

    newPublication.fill({
      user_id,
      title,
      content
    })
    await newPublication.save()
    return response.status(200).send({message: "Publicación creada."})
  }

  async updatePublicationTitle({request, response}) {
    const publication_id = request.input('id')
    const titlenew = request.input('title')
    const newTitle = await Publication.find(publication_id)
    newTitle.title = titlenew
    await newTitle.save()
    return response.status(200).send("Titulo actualizado")
  }

  async updatePublicationText({request, response}) {
    const publication_id = request.input('id')
    const textnew = request.input('content')
    const newText = await Publication.find(publication_id)
    newText.content = textnew
    await newText.save()
    return response.status(200).send("Texto actualizado")
  }

  async deletePublication({request, response}) {
    const publication_id = request.input('id')
    const deletedPublication = await Publication.find(publication_id)
    deletedPublication.delete()
    return response.status(200).send("Publicación eliminada con exito")
  }
}

module.exports = PublicationController
