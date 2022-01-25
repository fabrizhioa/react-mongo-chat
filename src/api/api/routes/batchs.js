const express = require('express');
const Batchs = require('../models/Batchs');
const { isAuthenticated, hasRoles } = require('../auth');
const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    Batchs.find()
        .exec()
        .then((x) => {
            let filtrated = x.filter(
                (v) => req.user.excludeBatchs.indexOf(v._id) == -1
            );
            res.status(200).send(filtrated);
        });
});

router.get('/:id', (req, res) => {
    Batchs.findById(req.params.id)
        .exec()
        .then((x) => res.status(200).send(x));
});

router.post('/', isAuthenticated, hasRoles(['admin']), (req, res) => {
    const { _id } = req.user;
    Batchs.create({ ...req.body, user_id: _id }).then((x) =>
        res.status(201).send(x)
    );
});

router.put('/:id', isAuthenticated, hasRoles(['admin']), (req, res) => {
    Batchs.findOneAndUpdate(req.params.id, req.body).then(() =>
        res.sendStatus(204)
    );
});

router.delete('/:id', isAuthenticated, hasRoles(['admin']), (req, res) => {
    Batchs.findOneAndDelete(req.params.id)
        .exec()
        .then(() => res.sendStatus(204));
});
module.exports = router;
