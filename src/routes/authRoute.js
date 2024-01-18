const router = require("express").Router()
const AuthController = require('../controllers/authController');
const checkToken = require("../middlewares/checkToken");

router.get("/:userId/checkAuthorization",checkToken ,AuthController.checkAuthorization); 
router.post("/register", AuthController.Register);
router.post("/login", AuthController.login); 

module.exports = router;