const {Router} = require('express')


const notesRoutes = Router()

const NotesController = require("../controllers/NotesController.js")

const notesController = new NotesController()

notesRoutes.post('/notes/:user_id',notesController.create)

module.exports = notesRoutes