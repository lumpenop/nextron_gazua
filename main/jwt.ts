import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "key";

export const jwtToken = {
  access: function (userId: string) {
    const payload = {
      userId,
    };

    return jwt.sign(payload, SECRET_KEY, {
      algorithm: "HS256",
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
      algorithm: "HS256",
      expiresIn: "24h",
    });
  },
  refreshVerify: function (token, storeToken) {
    if (token === storeToken) {
      return true;
    }
    return false;
  },
};
