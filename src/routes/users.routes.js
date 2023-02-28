const {Router} = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require("../controllers/UsersController.js")
const UserAvatarController = require("../controllers/UserAvatarController.js")
const ensureAuth = require('../middlewares/ensureAuth.js')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)


const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


usersRoutes.post('/users', usersController.create)
usersRoutes.put('/users',ensureAuth, usersController.update)

usersRoutes.patch('/users/avatar', ensureAuth, upload.single('avatar'), userAvatarController.update)

module.exports = usersRoutes