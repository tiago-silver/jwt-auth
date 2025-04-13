import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
// Importação do sign e authConfig
import { sign } from "jsonwebtoken"
import { authConfig } from "@/config/auth"

class SessionsController {
  async create(request: Request, response: Response) {
    const {username, userpassword} = request.body

    const userFake = {
      id: "1",
      username: "Tiago",
      userpassword: "12345",
      role: "custumer"
    }

    if(username !== userFake.username || userpassword !== userFake.userpassword){
      throw new AppError("Usuário e/ou senha incorretos!", 400)
    }

    // Se tudo estiver corrtos, criar um token para o usuário
    const {secret, expiresIn} = authConfig.jwt
    // Adiciiona no payload algomass informações, como por exemplo role
    const token = sign({role: userFake.role}, secret, {
      expiresIn,
      subject: String(userFake.id)
    })

    // Após criar o token do usuário, inserir na requisição pelas middlewares
    return response.json({token})
  }
}

export { SessionsController }
