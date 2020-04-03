const express = require('express');
const router = express.Router();

// @route GET api/auth
//  @desc Get Logged in user
// @access Private

router.get('/', (req, res) => {
    res.send("get logged in user");
});

// @route POST api/auth
//  @desc auth user & get token
// @access Public

router.post('/', (req, res) => {
    res.send('Log in user');
});



module.exports = router;