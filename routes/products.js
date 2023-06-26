import express from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { UsersController } from "../controllers/users.controller.js";
import { isAuth } from "../middlewear/authentication.mid.js";

const productsRouter = express.Router();

productsRouter.post("/addNew", isAuth.isLogged, async (req, res) => {
  const userId = JSON.parse(req.cookies.userInfo)._id;
  try {
    const addedProduct = await ProductsController.addNew(req, res);
    UsersController.addNewProduct(userId, addedProduct)
      .then(() => {
        return res.status(200).json("product added successfully!");
      })
      .catch((err) => res.status(409).json(err._message));
  } catch (err) {
    return res.status(409).json(err._message);
  }
});

productsRouter.post("/purchase", isAuth.isLogged, async (req, res) => {
  const userId = JSON.parse(req.cookies.userInfo)._id;
  const product = await ProductsController.getProduct(req, res);
  UsersController.purchaseProduct(userId, product).then((updatedUser) => {
    if (!updatedUser) return res.status(500).json("something went wrong!");
    ProductsController.remove(req, res).then(() => {
      return res.status(200).json("product purchased successfully!");
    });
  });
});

productsRouter.get("/getAll", async (req, res) => {
  const result = await ProductsController.getAllProducts(req, res);
  return res.status(200).json(result);
});

productsRouter.get("/getAllPurchased", isAuth.isLogged, async (req, res) => {
  const userId = JSON.parse(req.cookies.userInfo)._id;
  const allProducts = await UsersController.getPurchasedProducts(userId);
  return res.status(200).json(allProducts);
});

export default productsRouter;
