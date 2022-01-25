const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    let id;

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, 'mi-secreto', (err, decoded) => {
        if (err === null) {
            id = decoded._id;
        } else {
            id = false;
        }
    });

    if (id) {
        Users.findOne({ _id: id })
            .exec()
            .then((user) => {
                console.log(user);
                req.user = user;
                next();
            });
    } else {
        return res.sendStatus(403);
    }
};

const hasRoles = (roles) => (req, res, next) => {
    if (roles.indexOf(req.user.role) > -1) {
        console.log(req.user.role);
        return next();
    }
    res.sendStatus(403);
};

module.exports = { isAuthenticated, hasRoles };
