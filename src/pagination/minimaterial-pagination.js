miniapp.directive('mmPagination', ['$compile', '$parse', '$paginationRegister', function ($compile, $parse, $paginationRegister) {
    'use strict';

    function getVarname(RepeatValue) {
        'use strict';
        var variable = RepeatValue.replace(' in ', '~');
        variable = variable.replace(' | ', '~');
        variable = variable.replace('|', '~');
        variable = variable.split('~');
        return variable[1].replace(' ', '');
    };
    return {
        priority: 20,
        multiElement: true,
        terminal: true, // NOS SIRVE POR SI TENEMOS OTRA DIRECTIVA DENTRO DEL  NG-REPEAT
        restrict: 'A', // RESTRINGIDO SOLO A ATTRIBUTO
        scope: false, // NOS DICE QUE EL SCOPE ES EL MISMO DEL CONTROLADOR

        compile: function (tElement, tAttrs) {
            // COMPILE RETURNED LINKED
            return function (scope, element, attr) {
                var registro = new $paginationRegister();
                var dataNotation = getVarname(element.attr('mm-pagination'));
                registro.set(dataNotation);
                $parse(registro.get()).assign(scope, { pageCurrent: 0, pageSize: 5, pages: 1, dataLength: 1, nextPage: function () { }, beforePage: function () { } });

                // AGREGANDO ng-repeat Y QUITANDO ng-pagination PARA EVITAR LOOP
                element.attr('mm-pagination', element.attr('mm-pagination') + " | pagFilter:" + registro.getSearchNotation());
                element.attr('mm-pagination', element.attr('mm-pagination') + " | startFrom:" + registro.getCurrentNotation() + "*" + registro.getSizeNotation() + " | limitTo:" + registro.getSizeNotation());
                element.attr('ng-repeat', element.attr('mm-pagination'));
                element.removeAttr('mm-pagination');

                // NUMERO DE DATOS POR PAGINA
                var size = Number(element.attr('pagination-size')) + 0;
                if (angular.isDefined(size) && angular.isNumber(size) && size > 0) {
                    $parse(registro.getSizeNotation()).assign(scope, Number(size));
                }

                // NUMERO DE PAGINAS
                var paginas = getPaginas($parse(dataNotation)(scope), $parse(registro.getSizeNotation())(scope));
                if (paginas !== undefined && paginas !== '') {
                    $parse(registro.getPagesNotation()).assign(scope, Number(paginas));
                }

                // EVENTO WATCH PARA CUANDO CAMBIA LA VARIABLE DE LOS DATOS
                scope.$watch(dataNotation, function () {
                    var data = $parse(dataNotation)(scope);
                    if (data === undefined) {
                        console.log('mm-pagination Mensaje: No hay datos');
                    } else {
                        var paginas = Number(getPaginas(data, $parse(registro.getSizeNotation())(scope)));
                        if (paginas > 0) {
                            $parse(registro.getPagesNotation()).assign(scope, paginas);
                        } else {
                            $parse(registro.getPagesNotation()).assign(scope, 1);
                        }
                        $parse(registro.getDataLengthNotation()).assign(scope, data.length);
                    }
                });
                $compile(element)(scope);
            };
        }
    };
}]);