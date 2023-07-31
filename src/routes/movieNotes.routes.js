const { Router } = require("express")
const MovieNotesController = require("../controller/movieNotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const moviesNotesRoutes = Router()
const movieNotesController = new MovieNotesController()

moviesNotesRoutes.use(ensureAuthenticated)

moviesNotesRoutes.get("/", movieNotesController.index)
moviesNotesRoutes.post("/", movieNotesController.create)
moviesNotesRoutes.get("/:id", movieNotesController.show)
moviesNotesRoutes.delete("/:id", movieNotesController.delete)

module.exports = moviesNotesRoutes
