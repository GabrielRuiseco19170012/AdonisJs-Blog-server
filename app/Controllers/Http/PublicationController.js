'use strict'
const Database = use('Database')
const Publication = use('App/Models/Publication')

class PublicationController {
    async selectPublications(){
        return await Database.select("*").from("Publications")
    }
    async selectPublicationByID({request,}){
        const id = request.only('id')
        return await Database.select('*').from('Publications').where({id: id['id']})
    }
    async selectPublicationByTitle({request,}){
        const title = request.only('title')
        return await Database.select('*').from('Publications').where({title: title['title']})
    }
    async insertPublications({request,response}){
        const {id, id_user, title, text} = request.all()
        const newPublication = Publication()

        const inserted = await validate(request.all())
        if(inserted.fails()){
            return reponse.status(400).send("Datos Incorrectos.")
        }
        newPublication.fill({
            id,
            id_user,
            title,
            text
        })
        await newPublication.save()
        return response.status(200).send("Publicación creada.")
    }
    async updatePublicationTitle({request,response}){
        const id_publication = request.input('id')
        const titlenew = request.input('title')
        const newTitle = await Publication.find(id_publication)
        newTitle.title = titlenew
        await newTitle.save()
        return response.status(200).send("Titulo actualizado")
    }
    async updatePublicationText({request,response}){
        const id_publication = request.input('id')
        const textnew = request.input('text')
        const newText = await Publication.find(id_publication)
        newText.title = textnew
        await newText.save()
        return response.status(200).send("Texto actualizado")
    }
    async deletePublication({request,response}){
        const id_publication = request.input('id')
        const deletedPublication = await Publication.find(id_publication)
        deletedPublication.save()
        return response.status(200).send("Publicación eliminada con exito")
    }
}
module.exports = PublicationController
