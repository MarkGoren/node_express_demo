export class isAuth {
  static isLogged(req, res, next) {
    const userInfo = req.cookies?.userInfo;
    if (!userInfo) return res.status(409).json("unauthorized access denied!");
    next();
  }
}
