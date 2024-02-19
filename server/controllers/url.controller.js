const validateUrl = require("../utils/validateUrl.js");
const bcrypt = require("bcryptjs");
const genRandomId = require("../utils/generateUniqueId.js");
const UrlModel = require("../models/url.model.js");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const createUrl = async (req, res, next) => {
  try {
    const { url, password, expirationTime } = req.body;
    if (!url) return res.status(400).json({ message: "URL is required" });
    if (!validateUrl(url))
      return res.status(400).json({ message: "Invalid URL" });

    let hashPass;
    if (password) hashPass = bcrypt.hashSync(password, 5);

    const shortId = genRandomId(4);

    const URL = new UrlModel({
      originalLink: url,
      shortId,
      ...(hashPass && { password: hashPass }),
      ...(expirationTime && { expirationTime }),
    });

    await URL.save();

    return res.status(201).json(URL);
  } catch (err) {
    next(err);
  }
};

const redirectToOriginalUrl = async (req, res, next) => {
  const { shortId } = req.params;
  try {
    const URL = await UrlModel.findOne({ shortId });
    if (!URL) return res.status(404).json({ message: "No URL found!" });
    if (
      URL.expirationTime &&
      new Date(URL.expirationTime).getTime() < Date.now()
    )
      return res.status(400).json({ messsage: "URL Expired" });

    if (URL.password) {
      const token = jwt.sign({shortId}, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });
     return res.redirect(`${process.env.FRONTEND_URL}/password?token=${token}`);
    }

    res.redirect(URL.originalLink);
  } catch (err) {
    next(err);
  }
};

const verifyPasswordAndRedirect = (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  if (!token) return res.status(400).json({ message: "Invalid token" });
  if (!password) return res.status(400).json({ message: "Password required" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) return res.status(400).json({ message: err.message });

    const {shortId} = data;
    const URL = await UrlModel.findOne({ shortId });
    const comparePass = bcrypt.compareSync(password, URL.password);
    if (!comparePass)
      return res.status(400).json({ message: "Invalid password" });
    res.redirect(URL.originalLink);
  });
};

module.exports = {
  createUrl,
  redirectToOriginalUrl,
  verifyPasswordAndRedirect,
};
