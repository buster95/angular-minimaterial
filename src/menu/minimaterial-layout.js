(function () {
    miniapp.directive('mmLayout', [function () {
        return {
            priority: 0,
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