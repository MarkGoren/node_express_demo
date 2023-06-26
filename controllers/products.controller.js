import Products from "../models/products.model.js";

export class ProductsController {
  static async addNew(req, res) {
    const data = req.body;
    const createdProduct = await Products.create({
      name: data.name,
      info: data.info,
      cost: data.cost,
      img: data.img,
    });
    delete createdProduct.info;
    return createdProduct;
  }

  static async remove(req, res) {
    const data = req.body;
    return await Products.findByIdAndDelete(data.productId);
  }

  static async getProduct(req, res) {
    const data = req.body;
    return await Products.findById(data.productId);
  }

  static async getAllProducts(req, res) {
    const page = req.query.page;
    const totalItems = await Products.find().count();
    const itemsPerPage = 3;
    return {
      products: await Products.find()
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage),
      totalProducts: totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      hasNextPage: itemsPerPage * page < totalItems,
      page: page,
    };
  }
}
