import Users from "../models/users.model.js";
import * as bcrypt from "bcrypt";
import session from "express-session";

export class UsersController {
  static async addUser(req, res) {
    const data = req.body;
    if (!data.password) return res.status(409).json("password not provided!");
    const existingUser = await Users.findOne({ email: data?.email }).select(
      "email passwordHash"
    );
    if (existingUser !== null)
      return res.status(409).json("user with this email already exists!");
    const hashedPassword = await bcrypt.hash(data.password, 10);
    Users.create({
      username: data.username,
      email: data.email,
      passwordHash: hashedPassword,
      role: "user",
    })
      .then((userInfo) => {
        res.cookie("userInfo", JSON.stringify(userInfo));
        return res.status(200).json("user created successfully!");
      })
      .catch((err) => {
        return res.status(500).json(err.message);
      });
  }

  static async login(req, res) {
    const data = req.body;
    const userInfo = await Users.findOne({ email: data?.email }).select(
      "username email profileImg balance passwordHash"
    );
    if (!userInfo || !bcrypt.compare(data.password, userInfo.passwordHash)) {
      return res.status(401).json("email or password are invalid!");
    }
    delete userInfo.passwordHash;
    return res
      .status(200)
      .cookie("userInfo", JSON.stringify(userInfo))
      .json(userInfo);
  }

  static async addNewProduct(userId, product) {
    Users.findByIdAndUpdate(userId, { $push: { displayedProducts: product } });
  }

  static async purchaseProduct(userId, product) {
    const userInfo = await Users.findById(userId);
    if (userInfo.balance < product.cost) return false;
    userInfo.balance -= product.cost;
    userInfo.purchasedProducts.push(product);
    const updatedUser = await userInfo.save();
    return updatedUser;
  }

  static async getPurchasedProducts(userId) {
    const purchasedProducts = await Users.findById(userId).select(
      "purchasedProducts"
    );
    return purchasedProducts;
  }
}
