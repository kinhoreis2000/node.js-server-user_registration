const {Router} = require('express')



const usersRouter = require('./users.routes')
const moviesRouter = require('./movies.routes')
const sessionsRoutes = require('./sessions.routes')



const routes = Router()

routes.use('/users', usersRouter)
routes.use('/movies',  moviesRouter)

routes.use('/sessions',sessionsRoutes)

module.exports = [usersRouter, moviesRouter, sessionsRoutes ]