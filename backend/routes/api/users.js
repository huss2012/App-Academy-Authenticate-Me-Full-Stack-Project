const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handelValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
//Signup validation:
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.')
    ,
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with al least 4 charachters.')
    ,
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.')
    ,
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 charachters or more.')
    ,
    handelValidationErrors
];
//Signup:
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        const user = await User.singup({ username, email, password });

        await setTokenCookie(res, user);

        res.json({ user });
    })
);






module.exports = router;
