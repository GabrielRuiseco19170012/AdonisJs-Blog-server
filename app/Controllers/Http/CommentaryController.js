'use strict'

const Commentary = use('App/Models/Traits/Commentary')
const { validate } = use('Validator')
const Database = use('Database')


class CommentaryController {

    //Create commentary
    async createCommentary({request, response}){
        
        const rules = {
            publication_id: 'required',
            user_id: 'required',
            title: 'required',
            content: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).send({Error: "Fields are missing"})
        }


        const {publication_id, user_id, title, content} = request.all()
        const comment = new Commentary()
        comment.fill({
            publication_id,
            user_id,
            title,
            content
        })
        await comment.save()
        return response.status(201).send({Create:comment})
    }
    
    //Delete commentary
    async deleteCommentary({request, response}){
        
        const rules = {
            id: 'required'           
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).send({Error: "Fields are missing"})
        }

        const id = request.input('id')
        const comment = await Commentary.find(id)
        comment.delete()
        await comment.save()
        return response.status(200).send("Deleted")
    
    }
    
    //Edit title commentary

    async updateCommentaryTitle({request, response}){

        const rules = {
            id: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).send({Error: "Fields are missing"})
        }
        
        const id = request.input('id')
        const newTitle = request.input('title')
        const comment = await Commentary.find(id)
        comment.title = newTitle
        await comment.save()
        return response.status(201).send({Updated:usuario})
    }

    //Edit content commentary

    async updateCommentaryContent({request, response}){
        
        const rules = {
            id: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).send({Error: "Fields are missing"})
        }
               
        const id = request.input('id')
        const newContent = request.input('title')
        const comment = await Commentary.find(id)
        comment.content = newContent
        await comment.save()
        return response.status(201).send({Updated:usuario})
    }
    //Show only one commentary
    async showCommentary({request, response}){

        const rules = {
            id: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).send({Error: "Fields are missing"})
        }
               
        const id = request.input('id')        
        const comment = await Commentary.find(id)
        return response.status(200).send({Commentary:comment})

    }
    //Show all commentary
    async showAllCommentary({ response}){
         
        const comment = await Commentary.all()
        return response.status(200).send({Commentary:comment})
        
    }
    //Show all comentaries of a publication
    async showCommentaryPublication({request, response}){

        const rules = {
            id: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).send({Error: "Fields are missing"})
        }
               
        const publication_id = request.input('publication_id')        
        const comment = await Database.from('users').where('publication_id', publication_id)
        return response.status(200).send({Commentary:comment})

    }
    
}

module.exports = CommentaryController
