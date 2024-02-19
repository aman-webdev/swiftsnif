const { Router } = require("express");
const {
  createUrl,
  redirectToOriginalUrl,
  verifyPasswordAndRedirect,
} = require("../controllers/url.controller.js");

const router = Router();

router.post("/", createUrl);

router.get("/:shortId", redirectToOriginalUrl);

router.post("/verify-password", verifyPasswordAndRedirect);

module.exports = router;
