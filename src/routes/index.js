const { Router } = require("express")

const usersRouter = require("./users.routes")
const movieNotesRouter = require("./movieNotes.routes")
const moviesTagsRouter = require("./movieTags.routes")
const sessionRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionRouter)
routes.use("/movieNotes", movieNotesRouter)
routes.use("/movieTags", moviesTagsRouter)

module.exports = routes
