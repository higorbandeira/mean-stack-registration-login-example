(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionsService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.Update = Update;
        service.GetById = GetById;

        return service;

        function GetCurrent() {
            return $http.get('/api/questions/current').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/questions/' + _id).then(handleSuccess, handleError);
        }

        function Update(_id, questions) {
            return $http.put('/api/questions/' + _id, questions).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
