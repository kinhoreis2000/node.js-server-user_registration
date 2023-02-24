const knex = require('knex')
const sqlConnection = require('../database/sqlite')

const AppError = require('../utils/AppError.js')
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController{
  async update(req, res) {
    const user_id = req.user.id

    const database = await sqlConnection()
    
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

    const diskStorage = new DiskStorage()
    
    const avatarFileName = req.file.filename


    if(!user) {
      throw new AppError('Somente usuários autenticados podem mudar o avatar', 401)
    }
    if(user.avatar) {
      await  diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFileName)
    user.avatar = filename




    await database.run('UPDATE users SET avatar = (?) WHERE id = (?)' ,[filename, user.id])

    return res.json(user)
    
  }
}

module.exports = UserAvatarController