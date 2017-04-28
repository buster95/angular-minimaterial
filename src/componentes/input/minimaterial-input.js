miniapp.filter('secreto', [function () {
    return function (input) {
        if (input !== undefined && input !== null) {
            return input.replace(/./gi, '*');
        }
        return "";
    }
}]);

miniapp.directive('mmInput', ['$compile', '$parse', function ($compile, $parse) {
    return {
        // transclude: 'element',
        // priority: 600,
        multiElement: true,
        terminal: true,
        scope: false,
        restrict: 'E',
        // require: '?ngModel, ?ngIf',
        compile: function (tElement, tAttrs) {
            return function PostLink(scope, elemento, attrs) {
                var tipo = attrs.type !== undefined ? attrs.type : 'text';
                var estilo = attrs.style !== undefined ? attrs.style : '';
                var placeholder = attrs.placeholder !== undefined ? attrs.placeholder : '';

                var extraAttrs = "";

                var modelo = attrs.ngModel;
                var search = attrs.paginationSearch;
                if ((modelo === null || modelo === undefined || modelo === '') &&
                    (search === null || search === undefined || search === '')) {
                    throw "mm-input requiere obligatoriamente ngModel or paginationSearch\n";
                } else if (modelo != undefined && modelo !== '' && modelo !== null &&
                    search !== undefined && search !== '' && search !== null) {
                    throw "mm-input (paginationSearch and ngModel) ambas directivas no son permitidas a la vez\n";
                }

                if (modelo !== undefined && modelo !== '' && modelo !== null) {
                    extraAttrs += 'ng-model="' + modelo + '" ';
                } else {
                    $parse(search + '_search').assign(scope, '');
                    extraAttrs += 'pagination-search="' + search + '" ';
                }

                var value = '';
                if (modelo !== undefined && modelo !== '' && modelo !== null) {
                    value = modelo;
                } else {
                    value = search + '_search';
                }
                if (tipo === 'password') {
                    value += " | secreto"
                }

                if (tipo === 'number') {
                    var min = attrs.min, max = attrs.max, step = attrs.step;
                    if (angular.isNumber(min)) {
                        extraAttrs += 'min="' + min + '" ';
                        $parse(modelo).assign(scope, Number(min));
                    } else {
                        $parse(modelo).assign(scope, 0);
                    }

                    scope.$watch(modelo, function (newvalue, currentvalue) {
                        console.log(newvalue, currentvalue);
                        if (newvalue === undefined) {
                            if (angular.isNumber(min)) {
                                $parse(modelo).assign(scope, Number(min));
                            } else {
                                $parse(modelo).assign(scope, 0);
                            }
                        }
                    });

                    if (angular.isNumber(max)) {
                        extraAttrs += 'max="' + max + '" ';
                    }
                    if (angular.isNumber(step)) {
                        extraAttrs += 'step="' + step + '" ';
                    }
                }

                var required = attrs.required;
                var readonly = attrs.readonly;
                if (required !== undefined && required === true) {
                    extraAttrs += "required "
                }

                if (angular.isString(readonly)) {
                    if (readonly !== undefined && (readonly === "" || readonly === "true")) {
                        extraAttrs += "readonly ";
                    }
                }

                var template = angular.element(
                    '<div class="form-group" style="' + estilo + '">' +
                    '<div class="input-group">' +
                    // '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="" onchange="this.setAttribute("value", this.value);" class="form-control" />' +
                    '<input id="txt_' + modelo + '" type="' + tipo + '" name="txt_' + modelo + '" value="{{' + value + '}}" class="form-control" ' + extraAttrs + '/>' +
                    '<label for="txt_' + modelo + '">' + placeholder + '</label>' +
                    '<line class="line"></line>' +
                    '</div>' +
                    '</div>');

                $compile(template)(scope);
                elemento.append(template);
                // elemento.replaceWith(template);
            }
        }
    }
}]);

miniapp.directive('mmTextarea', ['$compile', function ($compile) {
    return {
        terminal: true,
        scope: false,
        restrict: 'E',
        compile: function (tElement, tAttrs) {
            return function Linked(scope, elemento, attrs) {
                var estilo = attrs.style !== undefined ? attrs.style : '';

                var modelo = attrs.ngModel;
                if (modelo === null || modelo === undefined || modelo === '') {
                    throw "mm-textarea Requiere obligatoriamente ngModel";
                }

                var placeholder = attrs.placeholder !== undefined ? attrs.placeholder : '';

                var extraAttrs = "";
                var required = attrs.required;
                var readonly = attrs.readonly;
                if (required !== undefined && required === true) {
                    extraAttrs += "required "
                }

                if (angular.isString(readonly)) {
                    if (readonly !== undefined && (readonly === "" || readonly === "true")) {
                        extraAttrs += "readonly ";
                    }
                }

                var template = angular.element(
                    '<div class="form-group" style="padding-top:5px;' + estilo + '">' +
                    '<div class="input-group">' +
                    // '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="" onchange="this.setAttribute("value", this.value);" class="form-control" />' +
                    '<textarea id="txt_' + modelo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="{{' + modelo + '}}" class="form-control" ' + extraAttrs + '></textarea>' +
                    '<label for="txt_' + modelo + '">' + placeholder + '</label>' +
                    '<line class="line"></line>' +
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
                elemento.append(template);
                // elemento.replaceWith(template);
            }
        }
    }
}]);