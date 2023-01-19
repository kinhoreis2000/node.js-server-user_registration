const AppError = require('../utils/AppError.js')
const {hash} = require('bcryptjs')
const sqlConnection = require('../database/sqlite')
class UsersController {

  async create(req, res,next) {
    const {name, email, password} = req.body
    
    const database = await sqlConnection()
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])


    if(checkUserExists) {

      throw new AppError('este email está em uso')
    }
    const hashedPassword = await hash(password, 8)

    await database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)',[name,email,hashedPassword])
    res.status(201).json() 

    r

  }
  
  async update(req, res, next) {
    const {name, email, password, old_password} = req.body 
    const {id} = req.params

    const database = await sqlConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if(!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email já está em uso ')
    }

    user.name = name 
    user.email = email

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = ?
    `,[
      user.name,
      user.email,
      new Date(),
      id
    ] 
    )

    return res.status(200).json()
  }


}

module.exports = UsersController