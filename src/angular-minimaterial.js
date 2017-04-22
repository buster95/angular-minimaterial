var miniapp = angular.module('ngMiniMaterial', []);

angular.isNumber = function (num) {
    var n = Number(num);
    if (typeof (n) === 'number' && !isNaN(n)) {
        return true;
    }
    return false;
};

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

                var modelo = attrs.ngModel;
                if (modelo === null || modelo === undefined || modelo === '') {
                    throw "mm-input Requiere obligatoriamente ngModel";
                }

                var value = attrs.ngModel;
                if (tipo === 'password') {
                    value += " | secreto"
                }

                var extraAttrs = "";
                if (tipo === 'number') {
                    var min = attrs.min, max = attrs.max, step = attrs.step;
                    if (angular.isNumber(min)) {
                        extraAttrs += 'min="' + min + '"';
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
                        extraAttrs += 'max="' + max + '"';
                    }
                    if (angular.isNumber(step)) {
                        extraAttrs += 'step="' + step + '"';
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
                    '<input id="txt_' + modelo + '" type="' + tipo + '" ng-model="' + modelo + '" name="txt_' + modelo + '" value="{{' + value + '}}" class="form-control" ' + extraAttrs + '/>' +
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
                    throw "mm-input Requiere obligatoriamente ngModel";
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

                var template = angular.element(
                    '<div class="spinner-container" ng-if="' + modelo + '">' +
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

miniapp.service('$mmSnackbar', [function () {
    var body = angular.element(document.body);
    var time = 3000;

    var wrapper = angular.element('<div class="snackbar-wrapper" id="snack1"><div>');
    body.append(wrapper);

    function CreateSnackbar(tpl) {
        wrapper.append(tpl);
        // tpl.removeClass('hide');
        tpl.addClass('show');
        setTimeout(function () {
            tpl.addClass('hide');
            // tpl.removeClass('show');
        }, time);

        setTimeout(function () {
            tpl.remove();
        }, time + 450);
    }

    function CreateStyle(sty) {
        body.append(
            '<style type="text/css">' + sty + '</style>'
        );
    }

    return {
        success: function (message) {
            var template = angular.element(
                '<div class="snackbar snackbar-success">' + message +
                '</div>'
            );
            CreateSnackbar(template);
        },
        info: function (message) {
            var template = angular.element(
                '<div class="snackbar snackbar-info">' + message +
                '</div>'
            );
            CreateSnackbar(template);
        },
        warning: function (message) {
            var template = angular.element(
                '<div class="snackbar snackbar-warning">' + message +
                '</div>'
            );
            CreateSnackbar(template);
        },
        error: function (message) {
            var template = angular.element(
                '<div class="snackbar snackbar-error">' + message +
                '</div>'
            );
            CreateSnackbar(template);
        },
        setTime: function (tiempo) {
            time = tiempo;
            return this;
        },
        setPosition: function (position) {
            position = position.toLowerCase();
            switch (position) {
                case "bottom-left":
                    CreateStyle('.snackbar-wrapper { bottom: 30px; left:30px; margin:0; }');
                    break;
                case "bottom-right":
                    CreateStyle('.snackbar-wrapper { bottom: 30px; right:30px; margin:0; }');
                    break;
            }
        }
    }
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
miniapp.directive('mmTab', [function () {
    return {
        priority: 0,
        replace: true,
        restrict: 'E',
        require: '^mmTabbed',
        // transclude: true,
        scope: { label: '@', href: '@', class: '@classes' },
        template: '<li role="presentation" class="{{classes}}"><a role="button" data-toggle="tab" data-target="{{href}}">{{label}}</a></li>',
        link: function (scope, element, attrs, tabbed) {
            element.on('click', function (evt) {
                evt.preventDefault();
                var id = element[0].firstChild.getAttribute('data-target');
                console.log(id);
                tabbed.selectTab(id);

                // var id = element[0].firstChild.getAttribute('data-target');
                // var tab = angular.element(document.getElementById(id));
                // console.log(id, tab, element[0].firstChild);
            });

            tabbed.addTab(element[0]);
        }
    }
}]);

miniapp.directive('mmTabContent', [function () {
    return {
        priority: 0,
        replace: true,
        restrict: 'E',
        require: '^mmTabbedContent',
        // scope: { href: '@' },
        terminal: true,
        transclude: true,
        template: '<div role="tabpanel" class="tab-pane" ng-transclude=""> </div>'
    }
}]);
miniapp.directive('mmTabbed', [function () {
    return {
        priority: 1,
        transclude: true,
        terminal: false,
        replace: true,
        restrict: 'E',
        template: '<div class="nav nav-tabs" role="tablist" ng-transclude=""></div>',
        controller: ['$scope', function ($scope) {
            var tabs = [];
            this.removeActive = function () {
                angular.forEach(tabs, function (tab) {
                    var target = tab.firstChild.getAttribute('data-target').substr(1);
                    var content = document.getElementById(target);
                    content.setAttribute('class', 'tab-pane');
                    tab.removeAttribute('class');
                });
            };

            this.selectTab = function (name) {
                this.removeActive();
                angular.forEach(tabs, function (tab) {
                    var href = tab.firstChild.getAttribute('data-target');
                    console.log(href, name);
                    if (href === name) {
                        var target = tab.firstChild.getAttribute('data-target').substr(1);
                        var content = document.getElementById(target);
                        content.setAttribute('class', 'tab-pane active');
                        tab.setAttribute('class', 'active');
                    }
                });
            };

            this.addTab = function (element) {
                tabs.push(element);
            };
        }]
    }
}]);

miniapp.directive('mmTabbedContent', [function () {
    return {
        priority: 1,
        transclude: true,
        terminal: false,
        replace: true,
        restrict: 'E',
        template: '<div class="tab-content" ng-transclude=""> </div>'
    }
}]);