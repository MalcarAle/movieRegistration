const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  //validando se o token existe
  if (!authHeader) {
    throw new AppError("JWT token não informado!", 401)
  }

  //caso ele exista, montamos um array e pegando só a segunda posição, que é o token
  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
    }

    return next()
  } catch {
    throw new AppError("JWT Token invalido", 401)
  }
}

module.exports = ensureAuthenticated
