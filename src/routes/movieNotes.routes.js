const { Router } = require("express")
const MovieNotesController = require("../controller/movieNotesController")

const moviesNotesRoutes = Router()
const movieNotesController = new MovieNotesController()

moviesNotesRoutes.get("/", movieNotesController.index)
moviesNotesRoutes.post("/:user_id", movieNotesController.create)
moviesNotesRoutes.get("/:id", movieNotesController.show)
moviesNotesRoutes.delete("/:id", movieNotesController.delete)

module.exports = moviesNotesRoutes
