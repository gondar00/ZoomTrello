var appControllers = angular.module('appControllers');

appControllers.controller('WizardCtrl', 
  function ($rootScope, $scope, $modalInstance) {

    $scope.ok = function () {
      $rootScope.$storage.wiz.value = true;
      $modalInstance.dismiss('cancel');
    };

});