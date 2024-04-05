// en helpers se crean la funciones que se van a reutilizar
// por acá nunca se envía información sensible
const jwt = require("jsonwebtoken");

const generateJWT = (
  _id: string,
  login: string = "",
  expiresIn = process.env.EXPIRES_IN,
  jwtSecret = process.env.JWT_SECRET
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id,
      login,
    };
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: expiresIn,
      },
      (error: string, token: string) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else resolve(token);
      }
    );
  });
};

export default generateJWT;
