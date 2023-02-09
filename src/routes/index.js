const {Router} = require('express')



const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const sessionsRoutes = require('./sessions.routes')



const routes = Router()

routes.use('/users', usersRouter)
routes.use('/notes',  notesRouter)

routes.use('/sessions', sessionsRoutes)

module.exports = [usersRouter, notesRouter, sessionsRoutes]