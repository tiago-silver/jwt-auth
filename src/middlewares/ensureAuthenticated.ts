import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// CCria uma tipagem para o token
interface TokenPayload {
    role: string
    sub: string
}

function ensureAuthenticated(request:Request, response:Response, next:NextFunction){
    // Pega o token pelo cabeçalho da requisição
    const authHeader = request.headers.authorization

    // verifica se tem o token 
    if(!authHeader){
        throw new AppError("JWT token não informado!")
    }

    // Pega somente o token 
    const [, token] = authHeader.split(" ")

    // faz a verificação do token com o secret e adiciona na requisição a informação que o usuário está logado
    const {sub: user_id, role} = verify(token, authConfig.jwt.secret) as TokenPayload
    // adiciona o user_id a requisição (adicionar a tipagem)
    request.user = {
        id: String(user_id),
        role,
    }
    console.log(user_id)
    return next()
}
// Será importada na rotas
export {ensureAuthenticated}