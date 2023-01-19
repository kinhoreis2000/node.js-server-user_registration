const AppError = require('../utils/AppError.js')

class UsersController {

  async create(req, res,next) {
    const {name, email, password} = req.body
    
    if(!name) {
      console.log('Apperror:', new AppError('O nome é obrigatório') )

       throw new AppError('O nome é obrigatório')

      

    }

    res.status(200).json({name, email, password})

  }
}
console.log('module AppError is being imported')

module.exports = UsersController