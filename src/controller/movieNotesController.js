const knex = require("../database/knex")

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const user_id = request.user.id

    const [note_id] = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id,
    })

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        user_id,
        name,
      }
    })

    await knex("movieTags").insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params //GET ID FROM URL WITH REQUEST

    const movieNote = await knex("movieNotes").where({ id }).first()
    const movieTags = await knex("movieTags")
      .where({ note_id: id })
      .orderBy("name")

    return response.json({ movieNote, movieTags })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movieNotes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title, tags } = request.query
    const user_id = request.user.id

    let movieNote
    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim())

      movieNote = await knex("movieTags")
        .select(["movieNotes.id", "movieNotes.title", "movieNotes.user_id"])
        .where("movieNotes.user_id", user_id)
        .whereLike("movieNotes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movieNotes", "movieNotes.id", "movieTags.note_id")
        .orderBy("movieNotes.title")
    } else {
      movieNote = await knex("movieNotes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("movieTags").where({ user_id })
    const moviesWithTags = movieNote.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id)
      return {
        ...note,
        tags: noteTags,
      }
    })

    return response.json(moviesWithTags)
  }
}

module.exports = MovieNotesController
