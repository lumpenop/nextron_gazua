import jwt from "jsonwebtoken";
import store from "store";

const { SECRET_KEY } = process.env;

module.exports = {
  sign: function (userId: string) {
    const payload = {
      userId,
    };

    return jwt.sign(payload, SECRET_KEY, {
      algorithm: "SHA256",
      expiresIn: "1h",
    });
  },
  verify: function (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
      return {
        ok: true,
        userId: decoded.userId,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: function () {
    return jwt.sign({}, SECRET_KEY, {
      algorithm: "SHA256",
      expiresIn: "1h",
    });
  },
  refreshVerify: function (token, userId) {},
};
