const express = require("express");
const router = express.Router();

const wrapAsnyc = require('../utlis/wrapAsnyc.js');
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js")

//signup form and register user

    router
    .route('/signup')
    .get(userController.renderSignupForm)
    .post(wrapAsnyc(userController.signup));


// login form and login user

    router
    .route('/login')
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect: '/login',
        failureFlash: true}),
    userController.login)


//logout
router.get("/logout",
    userController.logout
)

module.exports = router;