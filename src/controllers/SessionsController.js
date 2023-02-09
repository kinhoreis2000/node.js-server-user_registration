const knex = require('knex')
const AppError = require('../utils/AppError')
const sqlConnection = require('../database/sqlite')
const {compare} = require('bcrypt')

const authConfig = require('../configs/auth.js')
const {sign} = require('jsonwebtoken')
class SessionsControler{

  async create(req, res){
    
    const {email, password} = req.body
    const database = await sqlConnection()
    const user = await database.get('SELECT * FROM users WHERE email = (?)', [email])
    const userPassword =  user.password


    const checkPassword =  await compare(password, userPassword)


    if(checkPassword) {

      const {secret, expiresIn } = authConfig.jwt
      const token = sign({}, secret,{
        subject:String(user.id),
        expiresIn})

      return res.json({user, token})



    } else {

      throw new AppError('A senha não confere')

    }
    

  }
}

module.exports = SessionsControler