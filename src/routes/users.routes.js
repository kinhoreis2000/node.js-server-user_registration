const {Router} = require('express')

const AppError = require('../utils/AppError.js')

const usersRoutes = Router()

const UsersController = require("../controllers/UsersController.js")

const usersController = new UsersController()



usersRoutes.post('/',usersController.create)

module.exports = usersRoutes