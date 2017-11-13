(function () {
    miniapp.directive('mmLayout', [function () {
        return {
            priority: 10,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            template:
                <div class="layout" ng-transclude>
                </div>
        }
    }]);
})();