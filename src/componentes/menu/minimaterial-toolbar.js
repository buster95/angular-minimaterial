(function () {
    function ToggleClass(element) {
        $(element).toggleClass('active');
    }
    miniapp.directive('mmToolbar', [function () {
        return {
            priority: 5,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            scope: {
                title: '@'
            },
            compile: function (tElement, tAttrs) {
                return function Linked(scope, elemento, attrs) {
                }
            },
            template:
                <nav class="toolbar">
                    <span class="toolbar-title">{{ title }}</span>
                    <div class="toolbar-hamburguer" onclick="ToggleClass(this);">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                    <ul ng-transclude></ul>
                </nav>
        }
    }]);
})();