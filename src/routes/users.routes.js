const {Router} = require('express')


const usersRoutes = Router()

const UsersController = require("../controllers/UsersController.js")

const usersController = new UsersController()


usersRoutes.post('/users',usersController.create)
usersRoutes.put('/users/:id',usersController.update)

module.exports = usersRoutes