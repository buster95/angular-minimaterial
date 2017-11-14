(function () {
    miniapp.directive('mmToolbarItem', [function () {
        return {
            priority: 0,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            require: '^mmToolbar',
            scope: {
                href: '@',
                icon: '@'
            },
            compile: function (tElement, tAttrs) {
            },
            link: function (scope, element, attrs) {
                console.log(scope);
            },
            template:
                <a ng-class="icon ? 'toolbar-icon' : 'toolbar-item'" ng-transclude></a>
        }
    }]);
})();