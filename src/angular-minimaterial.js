var miniapp = angular.module('ngMiniMaterial', []);


miniapp.service('$ngMiniMaterialProvider', [function () {
    var colorPrimary = "";
    var colorPrimaryHover = "";

    return {
        Primary: function (color) {
        }
    }
}]);
miniapp.directive('mmButton', ['$compile', function ($compile) {
    return {
        terminal: true, // si la directiva tiene internamente otras directivas
        scope: false, // utilizar el scope actual
        transclude: true, // Es para traspasar atributos y elementos internos de la directiva
        replace: true, // reemplazar directiva por el template
        template: '<button class="btn ripple" ng-transclude></button>',
        restrict: 'E' // solo elemento
    }
}]);
miniapp.directive('mmCheckbox', ['$compile', function ($compile) {
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
miniapp.directive('mmInput', ['$compile', function ($compile) {
    return {
        terminal: true,
        scope: false,
        restrict: 'E',
        // require: '?ngModel',
        compile: function (tElement, tAttrs) {
            return function Linked(scope, elemento, attrs) {
                var tipo = attrs.type !== undefined ? attrs.type : 'text';

                var estilo = attrs.style !== undefined ? attrs.style : '';

                var modelo = attrs.ngModel;
                if (modelo === null || modelo === undefined || modelo === '') {
                    throw "mm-input Requiere obligatoriamente ngModel";
                }

                var placeholder = attrs.placeholder !== undefined ? attrs.placeholder : '';

                var template = angular.element('<div class="form-group" style="' + estilo + '">' +
                    '<div class="input-group">' +
                    // '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="" onchange="this.setAttribute("value", this.value);" class="form-control" />' +
                    '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="{{' + modelo + '}}" class="form-control" />' +
                    '<label for="txt_' + modelo + '">' + placeholder + '</label>' +
                    '</div>' +
                    '</div>');

                $compile(template)(scope);
                elemento.replaceWith(template);
            }
        }
    }
}]);
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

miniapp.directive('mmSwitch', ['$compile', function ($compile) {
    return {
        terminal: true,
        scope: false,
        restrict: 'E',
        // require: '?ngModel',
        compile: function (tElement, tAttrs) {
            return function Linked(scope, elemento, attrs) {
                var estilo = attrs.style !== undefined ? attrs.style : '';

                var modelo = attrs.ngModel;
                if (modelo === null || modelo === undefined || modelo === '') {
                    throw "mm-switch Requiere obligatoriamente ngModel";
                }

                var label = attrs.label !== undefined ? attrs.label : '';

                var template = angular.element(
                    '<div class="mmswitch-container">' +
                    '<click style="cursor:pointer;" ng-click="' + modelo + '=!' + modelo + '">' + label + '</click>' +
                    '<div class="mmswitch" >' +
                    '<input id="sw_' + modelo + '" ng-model="' + modelo + '" type="checkbox" />' +
                    '<label for="sw_' + modelo + '" class="label-primary"></label>' +
                    '</div >' +
                    '</div >'
                );

                $compile(template)(scope);
                elemento.replaceWith(template);
            }
        }
    }
}]);