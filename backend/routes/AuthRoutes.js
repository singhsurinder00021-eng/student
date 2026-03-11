const express = require("express");
const router = express.Router();
const { Signup, login } = require("../controllers/AuthController");

router.post("/signup", Signup);
router.post("/login", login);

module.exports = router;