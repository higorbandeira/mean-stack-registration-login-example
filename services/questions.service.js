var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.getById = getById;
service.update = update;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();
    db.questions.findOne({ user_id: _id }, function (err, questions) {
            if (err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if (questions) {
                deferred.resolve(questions.list);
            } else {
                var ret = [];
                deferred.resolve(ret);
            }
        });

    return deferred.promise;
}

function update(_id, questParam) {
    var deferred = Q.defer();

    // validation
    db.questions.findOne(
        { user_id: _id },
        function (err, questions) {
            if (err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            if (questions) {
                updateQuestions();
            } else {
                createQuestions();
            }
        });
    
    function updateQuestions() {
        // fields to update
        var set = {list: questParam};

        db.questions.update(
            { user_id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    function createQuestions() {
        var set = {user_id: _id, list: questParam};
        
        db.questions.insert(set, function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
