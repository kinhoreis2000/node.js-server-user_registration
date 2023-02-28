const {Router} = require('express')

const SessionsController = require('../controllers/SessionsController')
const sessionsController = new SessionsController()

const sessionsRoutes = Router()
sessionsRoutes.post('/sessions', sessionsController.create )

module.exports = sessionsRoutes
