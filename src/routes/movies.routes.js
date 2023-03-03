const {Router} = require('express')
const ensureAuth = require('../middlewares/ensureAuth.js')


const moviesRoutes = Router()

const MoviesController = require("../controllers/MoviesController.js")

const moviesController = new MoviesController()

moviesRoutes.post('/movies',ensureAuth, moviesController.create)
moviesRoutes.get('/movies',ensureAuth, moviesController.index)
moviesRoutes.get('/movies/:id',ensureAuth, moviesController.show)

module.exports = moviesRoutes