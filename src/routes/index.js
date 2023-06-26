const { Router } = require("express")

const usersRouter = require("./users.routes")
const movieNotesRouter = require("./movieNotes.routes")
const moviesTagsRouter = require("./movieTags.routes")
const routes = Router()

routes.use("/users", usersRouter)
routes.use("/movieNotes", movieNotesRouter)
routes.use("/movieTags", moviesTagsRouter)

module.exports = routes
