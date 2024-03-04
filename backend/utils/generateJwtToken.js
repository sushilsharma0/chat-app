import Jwt from "jsonwebtoken";

const generateJwtTokenAndSetCookie = (userId, res) => {
  const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    // expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true, // prevent from XSS attack
    sameSite: true, // prevent CSRF attacks
  });
  //   return token;
};

export default generateJwtTokenAndSetCookie;
