const express = require('express');
const router = express.Router();
const apiRputer = require('./api');

router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send("Hello World!");
});
router.use('/api', apiRputer);

//Static routes.
//Serve React build files in production:
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    //Serve the frontend's index.html file at the root route:
    router.use('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    //Serve the static assets in the frontend'd build folder:
    router.use(express.static(path.resolve("../frontend/build")));

    //Serve the frontend'd index.html file at all other routes Not starting with /api:
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
};

//Add a XSRF-TOKEN cookie in development:
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({});
    });
};

module.exports = router;
