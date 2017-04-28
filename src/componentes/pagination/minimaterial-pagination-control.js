miniapp.directive('ngPaginationControl', ['$compile', '$parse', '$paginationRegister', function ($compile, $parse, $paginationRegister) {
    'use strict';
    return {
        priority: 10,
        restrict: 'E',
        scope: false,

        compile: function (element, attrs) {
            var registro = new $paginationRegister();
            if (element.attr('pagination-id') === undefined || element.attr('pagination-id') === '') {
                throw "directiva NG-PAGINATION-CONTROL requiere atributo pagination-id\n";
            } else {
                registro.set(element.attr('pagination-id'));
            }

            // COMPILE RETURNED LINKED
            return function (scope, element, atributos) {
                var dataNotation = registro.getDataNotation();
                var resultados = filtrar($parse(dataNotation)(scope), $parse(registro.getSearchNotation())(scope));
                var controls = angular.element('<div class="pagination-panel">' +
                    '<button ng-click="' + registro.getBeforeNotation() + '()" type="button"' +
                    'ng-disabled="' + registro.getCurrentNotation() + '<=0">Anterior</button>' +

                    '<small class="indicator">{{' + registro.getCurrentNotation() + '+1}}/{{' + registro.getPagesNotation() + '}}</small>' +

                    '<button ng-click="' + registro.getNextNotation() + '()" type="button"' +
                    'ng-disabled="' + registro.getCurrentNotation() + '>=(' + registro.getDataLengthNotation() + '/' + registro.getSizeNotation() + ')-1">Siguiente</button>' +
                    '</div>');

                $parse(registro.getBeforeNotation()).assign(scope, function () {
                    var actual = $parse(registro.getCurrentNotation())(scope);
                    actual = actual - 1;
                    $parse(registro.getCurrentNotation()).assign(scope, actual);
                });

                $parse(registro.getNextNotation()).assign(scope, function () {
                    var actual = $parse(registro.getCurrentNotation())(scope);
                    actual = actual + 1;
                    $parse(registro.getCurrentNotation()).assign(scope, actual);
                });

                $compile(controls)(scope);
                element.replaceWith(controls);
            };
        }
    };
}]);