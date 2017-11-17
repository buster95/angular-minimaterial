function toggleActive(el) {
    angular.element(el).toggleClass('active');
}

(function () {
    miniapp.directive('mmToolbar', ['$compile', function ($compile) {
        return {
            priority: 5,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            // require: 'mmLayout',
            scope: {
                title: '@'
            },
            compile: function (tElement, tAttrs) {
                return function Link(scope, element, attrs) {
                    var elemento = element[0];
                    var sticky = Boolean.Convert(tAttrs.sticky);
                    var elpos = elemento.offsetTop;
                    var elHeight = elemento.offsetHeight;

                    console.log(elemento);
                    if (sticky === true) {
                        window.onresize = function (e) {
                            elpos = elemento.offsetTop;
                        }
                        window.onscroll = function (evt) {
                            var scroll = evt.pageY;
                            if (scroll >= elpos) {
                                element.addClass('sticky');
                                angular.element(document.body).css('padding-top', elHeight + 'px');
                            } else {
                                element.removeClass('sticky');
                                angular.element(document.body).css('padding-top', '0px');
                            }
                            // console.log("desplazandose...");
                            // console.log(evt.pageY);
                            // console.log(elpos);
                        };
                    }
                }
            },
            template:
                <div class="toolbar">
                    <div className="toolbar-title">
                        <div class="toolbar-hamburguer" onclick="toggleActive(this);">
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                        <span>{{ title }}</span>
                    </div>
                    <nav class="toolbar-item-container" ng-transclude></nav>
                </div>
        }
    }]);
})();