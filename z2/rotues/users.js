const { Router } = require("express");

const { signIn, signUp, getUser } = require("../controllers/Users");

const router = Router();

// @desc    Sign in user
// @route   POST /auth/signin
router.post("/signin", signIn);

// @desc    Sign up user
// @route   POST /auth/signup
router.post("/signup", signUp);

// @desc    Get user
// @route   GET /auth/user
router.get("/user", getUser);

module.exports = router;
