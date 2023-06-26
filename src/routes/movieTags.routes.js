const { Router } = require("express")
const MovieTagsController = require("../controller/movieTagsController")

const moviesTagsRoutes = Router()
const movieTagsController = new MovieTagsController()

moviesTagsRoutes.get("/:user_id", movieTagsController.index)

module.exports = moviesTagsRoutes
