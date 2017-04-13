miniapp.filter('secreto', [function () {
    return function (input) {
        if (input !== undefined) {
            return input.replace(/./gi, '*');
        }
        return "";
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

                var valueAttr = modelo;
                if (tipo === 'password') {
                    valueAttr += " | secreto"
                }

                var ifAttrs = "";
                if (attrs.ngIf !== undefined && attrs.ngIf !== '') {
                    ifAttrs = 'ng-if="' + attrs.ngIf + '"';
                }

                var placeholder = attrs.placeholder !== undefined ? attrs.placeholder : '';

                var template = angular.element('<div class="form-group" style="' + estilo + '" ' + ifAttrs + '>' +
                    '<div class="input-group">' +
                    // '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="" onchange="this.setAttribute("value", this.value);" class="form-control" />' +
                    '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="{{' + valueAttr + '}}" class="form-control" />' +
                    '<label for="txt_' + modelo + '">' + placeholder + '</label>' +
                    '</div>' +
                    '</div>');

                $compile(template)(scope);
                elemento.replaceWith(template);
            }
        }
    }
}]);

miniapp.directive('mmTextarea', ['$compile', function ($compile) {
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
                    throw "mm-input Requiere obligatoriamente ngModel";
                }

                var placeholder = attrs.placeholder !== undefined ? attrs.placeholder : '';

                var ifAttrs = "";
                if (attrs.ngIf !== undefined && attrs.ngIf !== '') {
                    ifAttrs = 'ng-if="' + attrs.ngIf + '"';
                }

                var template = angular.element('<div class="form-group" style="padding-top:5px;' + estilo + '" ' + ifAttrs + '>' +
                    '<div class="input-group">' +
                    // '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="" onchange="this.setAttribute("value", this.value);" class="form-control" />' +
                    '<textarea id="txt_' + modelo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="{{' + modelo + '}}" class="form-control"></textarea>' +
                    '<label for="txt_' + modelo + '">' + placeholder + '</label>' +
                    '</div>' +
                    '</div>');

                var textarea = template[0].firstChild.firstChild;
                textarea.onkeyup = function (evt) {
                    this.style.height = "4px";
                    this.style.height = (this.scrollHeight + 10) + 'px';
                    // this.style.height = (this.scrollHeight + 10) + 'px';
                };

                textarea.onkeydown = function (evt) {
                    this.style.height = "4px";
                    this.style.height = (this.scrollHeight + 10) + 'px';
                    // this.style.height = "auto";
                    // if (this.scrollHeight > 29 ) {
                    //     this.style.height = (this.scrollHeight + 10) + 'px';
                    // }
                }

                $compile(template)(scope);
                elemento.replaceWith(template);
            }
        }
    }
}]);