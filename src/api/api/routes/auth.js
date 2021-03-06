const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { isAuthenticated } = require('../auth');

const router = express.Router();

const signToken = (_id) => {
    return jwt.sign({ _id }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365,
    });
};

router.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64');
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encPassword = key.toString('base64');
            Users.findOne({ email })
                .exec()
                .then((user) => {
                    if (user) {
                        return res.send('usuario y/o contraseña incorrecta');
                    }

                    Users.create({
                        email,
                        name,
                        password: encPassword,
                        salt: newSalt,
                    }).then(() => {
                        res.send('usuario creado con éxito');
                    });
                });
        });
    });
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    Users.findOne({ email })
        .exec()
        .then((user) => {
            if (!user) {
                return res.send('usuario y/o contraseña incorrecta');
            }
            crypto.pbkdf2(
                password,
                user.salt,
                10000,
                64,
                'sha1',
                (err, key) => {
                    const encPassword = key.toString('base64');
                    if (user.password === encPassword) {
                        const token = signToken(user._id);
                        return res.send({ token });
                    }
                    res.send('usuario y/o contraseña incorrecta');
                }
            );
        });
});

router.put('/addPoint', isAuthenticated, (req, res) => {
    let value = {
        points: req.user.points + req.body.points,
        excludeTest: req.user.excludeTest.push(req.body.batch_id),
    };
    Batchs.findOneAndUpdate(req.user.id, value).then(() => res.sendStatus(204));
});

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user);
});

module.exports = router;
