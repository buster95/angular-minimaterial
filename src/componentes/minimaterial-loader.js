miniapp.directive('mmLoader', ['$compile', function ($compile) {
    return {
        terminal: true,
        scope: false,
        restrict: 'E',
        compile: function (tElement, tAttrs) {
            return function Linked(scope, elemento, attrs) {
                var ancho = attrs.width;
                var alto = attrs.height;
                if (ancho === undefined &&
                    alto === undefined) {
                    ancho = '50px';
                    alto = '50px';
                }
                if (ancho === undefined && alto !== undefined) {
                    ancho = alto;
                } else if (alto === undefined && ancho !== undefined) {
                    alto = ancho;
                }

                var modelo = attrs.ngModel;
                if (modelo === null || modelo === undefined || modelo === '') {
                    throw "mm-loader Requiere obligatoriamente ngModel";
                }

                var stroke = attrs.strokeWidth !== undefined ? attrs.strokeWidth : 6;

                var template = angular.element('<div class="spinner-container" ng-if="' + modelo + '">' +
                    '<svg class="spinner" width= "' + ancho + '" height= "' + alto + '" viewBox= "0 0 66 66" xmlns= "http://www.w3.org/2000/svg">' +
                    '<circle class="path" fill="none" stroke-width="' + stroke + '" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
                    '</svg >' +
                    '</div >');
                $compile(template)(scope);
                elemento.replaceWith(template);
            };
        }
    };
}]);