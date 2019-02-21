const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();
const { check, body } = require("express-validator/check");

const User = require("../models/user");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);

router.post(
    "/login",
    [
        body("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),
        body(
            "password",
            "Please enter a password with only numbers and text and at least 5 characters"
        )
        .isLength({ min: 4})
        .isAlphanumeric()
        .trim()
    ],
    authController.postLogin
)

router.post(
    "/signup",
    [
        check("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .custom((value, {req}) => {
            return User.findOne({ email : value }).then(existUser => {
                if(exsitUser) {
                    return Promise.reject(
                        "E-mail exsists already, please pick a different one"
                    );
                }
            })
        })
       .normalizeEmail(),
       body(
           "password",
           "Please enter a password with only numbers and text and at least 5 characters"
       ) 
        .isLength({ min: 4 })
        .isAlphanumeric()
        .trim(),
        body("confirmPassword")
            .trim()
            .custom((value, { req }) => {
                if(value !== req.body.password) {
                    throw new Error("Passwords have to march!");
                }
                return true;
            })
    ],
    authController.postSignup
)