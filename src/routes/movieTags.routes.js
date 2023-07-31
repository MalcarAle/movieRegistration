const { Router } = require("express")
const MovieTagsController = require("../controller/movieTagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const moviesTagsRoutes = Router()
const movieTagsController = new MovieTagsController()

moviesTagsRoutes.get("/:user_id", ensureAuthenticated, movieTagsController.index)

module.exports = moviesTagsRoutes
