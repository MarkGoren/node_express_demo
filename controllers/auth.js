import crypto from "crypto";
import Users from "../models/users.model";
export default class Auth {
  static postReset(req, res) {
    crypto.randomBytes(32, (err, buff) => {
      if (err) console.log(err);

      Users.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) return res.status(400).json("user does not exist");
          user.resetToken = buff.toString("hex");
          user.tokenExpiration = Date.now() + 3600000;
          return user.save();
        })
        .then((result) => {})
        .catch(console.log);
    });
  }
}
