const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//Signup:
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        const user = await User.singup({ username, email, password });

        await setTokenCookie(res, user);

        res.json({ user });
    })
);






module.exports = router;
