(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($window, UserService, FlashService, QuestionsService) {
        var vm = this;

        vm.user = "";
        vm.newQuestion = "";
        vm.questions = [];
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;
        vm.addQuestion = addQuestion;
        vm.updateVector = updateVector;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                QuestionsService.GetCurrent().then(function (questions) {
                    vm.questions = questions;
                });
            });
        }

        function saveQuestion() {
            QuestionsService.Update(vm.user._id, vm.questions)
                .then(function () {
                    FlashService.Success('Saved');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
        
        function deleteQuestion(index) {
            vm.questions.splice(index, 1);
        }
        
        function addQuestion() {
            vm.questions.push(vm.newQuestion);
            vm.newQuestion = "";
        }
        
        function updateVector(index, value) {
            vm.questions[index] = value;
        }
    }

})();
