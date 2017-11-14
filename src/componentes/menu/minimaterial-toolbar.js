function toggleActive(el) {
    angular.element(el).toggleClass('active');
}

(function () {
    miniapp.directive('mmToolbar', [function () {
        return {
            priority: 5,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            require: '^mmLayout',
            scope: {
                title: '@'
            },
            // compile: function (tElement, tAttrs) {
            //     var elemento = angular.element(document.querySelector('.toolbar-hamburguer'));
            //     elemento.bind('click', function () {
            //         console.log(elemento);
            //         // elemento.toggleClass('active');
            //     });
            //     // return function Linked(scope, elemento, attrs) {
            //     // }
            // },
            template:
                <header class="toolbar">
                    <div className="toolbar-title">
                        <div class="toolbar-hamburguer" onclick="toggleActive(this);">
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                        <span>{{ title }}</span>
                    </div>
                    <nav class="toolbar-item-container" ng-transclude></nav>
                </header>
        }
    }]);
})();