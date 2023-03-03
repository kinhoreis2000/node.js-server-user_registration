const AppError = require('../utils/AppError.js')
const knex = require('../database/knex')
const sqlConnection = require('../database/sqlite')


class MoviesController {

  async create(req, res, next){
    const {title, description, rating, tags_name} = req.body 
    const user_id = req.user.id


    const database = await sqlConnection()

    if(!title || !rating) {
      throw new AppError('Você precisa colocar o título e o rating')
    }

    
   const movie = await database.run('INSERT INTO movies (title, description, rating, user_id) VALUES ( (?), (?) ,(?) , (?) )' ,[title,description,rating,user_id])
    const movie_id = movie.lastID
 
    if(tags_name && tags_name.length > 0) {
      const tagsInsert = tags_name.map(name => {
            return {
              user_id: Number(user_id),
              movie_id,
              name
             
            }
        }
      )
          
   
        
      await knex('tags').insert(tagsInsert)
          

     } else {
          console.log('A movie não conseguiu ser inserida')
        } 

      
    res.status(201).json() 


  }


  async index(req, res) {
    const user_id= req.user.id
    const {title} =  req.query


    const movies = await knex('movies')
    .where({user_id})
    .whereLike('title', `%${title}%`)
    .orderBy('title')
  
   console.log('movies:',movies)

    const userTags = await knex('tags').where({user_id})


    console.log('userTafs',userTags)

    const moviesWithTags = movies.map(movie => {
        const movieTags = userTags.filter(tag => tag.movie_id === movie.id)

        return {
          ...movie,
          tags: movieTags
        }
    })
    console.log('movieswithtags',moviesWithTags)

    return res.json(moviesWithTags)

  }

  async show(req, res) {
    const user_id= req.user.id
    const {params} =  req
    const movie_id = Number(params.id)

    const movie = await knex('movies')
    .where({user_id, id: movie_id})
  
    const movieTags = await knex('tags').where({user_id, movie_id})

    const movieWithTags = {movie, movieTags}


    return res.json(movieWithTags)

  }
}

module.exports = MoviesController