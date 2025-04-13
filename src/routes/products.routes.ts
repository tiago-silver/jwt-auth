import { Router } from "express"
import { ProductsController } from "@/controllers/products-controller"
// Importar as middlewares de authenticação
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
// Middlewarea de autorização
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.get("/", productsController.index)
productsRoutes.post("/", 
    ensureAuthenticated, 
    verifyUserAuthorization(["sale", "admin"]),
    productsController.create)

export { productsRoutes }
