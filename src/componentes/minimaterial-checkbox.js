mymaterialModule.directive('mmCheckbox', ['$compile', function ($compile) {
    return {
        terminal: true,
        scope: false,
        restrict: 'E',
        compile: function (tElement, tAttrs) {
            return function Linked(scope, elemento, attrs) {
                var modelo = attrs.ngModel;
                if (modelo === null || modelo === undefined || modelo === '') {
                    throw "mm-checkbox Requiere obligatoriamente ngModel";
                }

                var label = attrs.label !== undefined ? attrs.label : '';

                var template = angular.element('<div class="form-group">' +
                    '<div class="checkbox">' +
                    '<input id="chk_' + modelo + '" ng-model="' + modelo + '" type="checkbox">' +
                    '<label for="chk_' + modelo + '">' + label + '</label>' +
                    '</div>' +
                    '</div>');

                $compile(template)(scope);
                elemento.replaceWith(template);
            }
        }
    }
}]);