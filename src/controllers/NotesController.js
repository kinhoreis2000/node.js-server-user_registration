const AppError = require('../utils/AppError.js')
const knex = require('knex')
const sqlConnection = require('../database/sqlite')


class NotesController {
  async create(req, res, next){
    const {title, description, rating, tags_name} = req.body 
    const {user_id} = req.params

    const database = await sqlConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

    if(!title || !rating) {
      throw new AppError('Você precisa colocar o título e o rating')
    }

    await database.run('INSERT INTO notes (title, description, rating, user_id) VALUES ( (?), (?) ,(?) , (?) )' ,[title,description,rating,user_id])

    const note = await database.get('SELECT * FROM notes WHERE user_id = (?)', [user_id])

    await database.run('INSERT INTO tags (user_id, note_id, name) VALUES ( (?), (?) ,(?))' ,[user.id,note.id,tags_name])


    res.status(201).json() 


  }

}

module.exports = NotesController