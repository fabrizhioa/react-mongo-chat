const express = require('express');
const Questions = require('../models/Questions');

const router = express.Router();

router.get('/:batch_id', (req, res) => {
    Questions.find({ batch_id: req.params.batch_id })
        .exec()
        .then((x) => res.status(200).send(x));
});

router.post('/', (req, res) => {
    Questions.create(req.body).then((x) => res.status(201).send(x));
});

router.put('/:id', (req, res) => {
    Questions.findOneAndUpdate(req.params.id, req.body).then(() =>
        res.sendStatus(204)
    );
});

router.delete('/:id', (req, res) => {
    Questions.findOneAndDelete(req.params.id)
        .exec()
        .then(() => res.sendStatus(204));
});
module.exports = router;
