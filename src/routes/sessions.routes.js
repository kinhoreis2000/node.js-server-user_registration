const {Router} = require('express')

const SessionsController = require('../controllers/SessionsController')
const sessionsController = new SessionsController()

const sessionsRoutes = Router()
console.log('passei aqui no ssss')
sessionsRoutes.post('/sessions', sessionsController.create )

module.exports = sessionsRoutes
