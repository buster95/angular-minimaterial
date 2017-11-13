(function () {
    miniapp.directive('mmMenuItem', [function () {
        return {
            priority: 0,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            template:
                <li class="menu-item">
                    <a ng-transclude></a>
                </li>
        }
    }]);
})();