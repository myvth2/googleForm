const express = require('express')
const userCtrl = require("../controllers/userCtrl")
const router = express.Router()


router.post("/signup", userCtrl.registerUser);
router.post("/signin", userCtrl.authUser);
module.exports = router;