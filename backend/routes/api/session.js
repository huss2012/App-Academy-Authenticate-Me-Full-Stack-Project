const express = require('express');
const router = express.Router();
const asynHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post(
    '/', asynHandler(async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({credential, password});

    if (!user) {
        const err = new Error("Login faild");
        err.status = 401;
        err.title = 'Login faild';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }
    await setTokenCookie(res, user);

    return res.json({
        user
    });

}));



module.exports = router;
