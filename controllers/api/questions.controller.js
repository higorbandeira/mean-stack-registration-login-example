var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionsService = require('services/questions.service');

router.get('/current', getCurrentQuestions);
router.put('/:_id', updateQuestions);

module.exports = router;

function getCurrentQuestions(req, res) {
    questionsService.getById(req.session.userId)
        .then(function (quest) {
            if (quest) {
                res.send(quest);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateQuestions(req, res) {
    var userId = req.session.userId;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    questionsService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
