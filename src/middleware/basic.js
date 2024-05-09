'use strict';

const base64 = require('base-64');
const {users} = require('../models/index');

module.exports = async (req, res, next) => {
    console.log("checking BASIC")
    if (!req.headers.authorization) { //ok
        return _authError();
    }

    let basic = req.headers.authorization.split(' ').pop();
    console.log(basic);
    console.log("string is...", base64.decode(basic))
    let [user, pass] = base64.decode(basic).split(':');

    try {
        console.log(user, pass)
        req.user = await users.authenticateBasic(user, pass)
        next();
    } catch (e) {
        _authError()
    }

    function _authError() {
        res.status(403).send('Invalid Login');
    }
}
