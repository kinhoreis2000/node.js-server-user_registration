const {Router} = require('express')
const ensureAuth = require('../middlewares/ensureAuth.js')


const notesRoutes = Router()

const NotesController = require("../controllers/NotesController.js")

const notesController = new NotesController()

notesRoutes.post('/notes/:user_id',ensureAuth,notesController.create)

module.exports = notesRoutes