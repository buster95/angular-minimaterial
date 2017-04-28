miniapp.directive('paginationSearch', ['$compile', '$parse', '$paginationRegister', function ($compile, $parse, $paginationRegister) {
    'use strict';
    return {
        priority: 5,
        restrict: 'A',
        scope: false,

        compile: function (iElement, iAttrs) {
            var registro = new $paginationRegister();

            var elementName = iElement[0].localName.toLowerCase();

            // ESTA DIRECTIVA SOLO PUEDE SER USADA POR UN ELEMENTO INPUT
            // if (elementName != 'input') {
            //     throw "Directive pagination-search solo se puede usar por elemento input\n";
            // }
            var atributo = iElement.attr('pagination-search');
            if (atributo === undefined || atributo === '') {
                throw "Directive pagination-search not value\n";
            } else {
                registro.set(atributo);
            }

            return function (scope, element, attrs) {
                var modelo = registro.getSearchNotation();
                element.attr('ng-model', modelo);
                element.removeAttr('pagination-search');

                // EVENTO WATCH PARA EL CAMBIO DEL INPUT EN BUSQUEDA
                var dataNotation = registro.getDataNotation();
                var tempDataNotation = dataNotation + '_tmp';
                $parse(modelo).assign(scope, '');

                scope.$watch(modelo, function () {
                    // CAPTURANDO EL VALOR DEL INPUT
                    var paginas = 0;
                    var filtro = $parse(modelo)(scope);
                    // AL MOMENTO DE BUSQUEDA MANDAR EL CURRENT PAGE A 0 PARA QUE SE VAYA A LA PRIMERA PAGINA
                    $parse(registro.getCurrentNotation()).assign(scope, 0);
                    if (filtro === undefined || filtro === '') {
                        paginas = Number(getPaginas($parse(dataNotation)(scope), $parse(registro.getSizeNotation())(scope)));
                        $parse(registro.getDataLengthNotation()).assign(scope, ($parse(dataNotation)(scope) !== undefined ? $parse(dataNotation)(scope).length : 0));
                    } else {
                        var resultados = filtrar($parse(dataNotation)(scope), filtro);
                        paginas = Number(getPaginas(resultados, $parse(registro.getSizeNotation())(scope)));
                        $parse(registro.getDataLengthNotation()).assign(scope, resultados.length);
                    }

                    if (paginas > 0 && paginas !== undefined) {
                        $parse(registro.getPagesNotation()).assign(scope, paginas);
                    } else {
                        $parse(registro.getPagesNotation()).assign(scope, 1);
                    }
                });

                if (elementName == 'input') {
                    $compile(element)(scope);
                }
            };
        }
    };
}]);