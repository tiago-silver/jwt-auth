import { Router } from "express"
import { ProductsController } from "@/controllers/products-controller"
// Importar as middlewares
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"

const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.get("/", productsController.index)
productsRoutes.post("/", ensureAuthenticated, productsController.create)

export { productsRoutes }
