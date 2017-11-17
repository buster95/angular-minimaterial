Boolean.Convert = function (value) {
    if (typeof (value) === 'string') {
        value = value.toLocaleLowerCase();
    }
    switch (value) {
        case '1':
        case 1:
        case 'true':
        case true:
        case 'on':
        case 'yes':
            return true;
        default:
            return false;
    }
}
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



// ======================================================
// PAGINADOR
// ======================================================

Array.prototype.filtrar = function () {
};

function filtrar(datos, filtro) {
    var busqueda = [];
    if (filtro === '' || filtro === undefined) {
        return datos;
    }
    angular.forEach(datos, function (fila) {
        for (var key in fila) {
            var propiedad = fila[key];
            if (esIgualFn(propiedad, filtro)) { busqueda.push(fila); return; }
        }
    });
    return busqueda;
}
function esIgualFn(propiedad, filtro) {
    if (angular.isString(propiedad)) {
        propiedad = propiedad.toLowerCase();
    }
    if (angular.isString(filtro)) {
        filtro = filtro.toLowerCase();
    }
    if (angular.isString(propiedad) && propiedad.length < 100 && (angular.isString(filtro) || angular.isNumber(filtro))) {
        if (propiedad.indexOf(filtro) > -1) {
            return true;
        }
    }
    return false;
}

function getPaginas(datos, size) {
    'use strict';
    var pag = 0;
    if (datos !== undefined) { pag = Math.ceil(datos.length / size); }
    return pag;
}

miniapp.filter('startFrom', function () {
    'use strict';
    return function (input, inicio) {
        if (input !== undefined) {
            inicio = +inicio;
            return input.slice(inicio);
        } else {
            // console.error("Modulo ng-pagination Filter startFrom Error");
            // throw "Filter startFrom tiene variable "+input;
        }
    };
});

miniapp.filter('pagFilter', function () {
    'use strict';
    return function (datos, filtro) {
        var busqueda = [];
        if (filtro === '' || filtro === undefined) {
            return datos;
        }
        angular.forEach(datos, function (fila) {
            for (var key in fila) {
                var propiedad = fila[key];
                if (esIgualFn(propiedad, filtro)) { busqueda.push(fila); return; }
            }
        });
        return busqueda;
    };
});

miniapp.service('$paginationRegister', ['$injector', function ($injector) {
    'use strict';
    function registerMetodos() {
        this.page_id = '';
        this.variable = '';
    }
    registerMetodos.prototype.set = function (id) {
        this.page_id = 'pag_' + id;
        this.variable = id;
    };
    registerMetodos.prototype.get = function () {
        return this.page_id;
    };
    registerMetodos.prototype.getDataNotation = function () {
        return this.variable;
    };
    registerMetodos.prototype.getSizeNotation = function () {
        return this.page_id + '.pageSize';
    };
    registerMetodos.prototype.getPagesNotation = function () {
        return this.page_id + '.pages';
    };
    registerMetodos.prototype.getDataLengthNotation = function () {
        return this.page_id + '.dataLength';
    };
    registerMetodos.prototype.getCurrentNotation = function () {
        return this.page_id + '.pageCurrent';
    };

    registerMetodos.prototype.getNextNotation = function () {
        return this.page_id + '.nextPage';
    };
    registerMetodos.prototype.getBeforeNotation = function () {
        return this.page_id + '.beforePage';
    };
    registerMetodos.prototype.getSearchNotation = function () {
        return this.variable + '_search';
    };

    return function () {
        return $injector.instantiate(registerMetodos);
    };
}]);
miniapp.directive('mmButton', ['$compile', function ($compile) {
    return {
        terminal: true, // si la directiva tiene internamente otras directivas
        scope: false, // utilizar el scope actual
        transclude: true, // Es para traspasar atributos y elementos internos de la directiva
        replace: true, // reemplazar directiva por el template
        restrict: 'E', // solo elemento
        template:
            "<button class=\"btn ripple\" ng-transclude></button>"
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

                // const template =
                //     <div class="form-group">
                //         <div class="checkbox">
                //             <input id="chk_{modelo}" ng-model="'{modelo}'" type="checkbox" />
                //             <label for="chk_' + modelo + '"> {label} </label>
                //         </div>
                //     </div>;

                // var nombre = "walter";
                // const tpl2 = (
                //     <h1>
                //         Hello, {nombre}!
                //     </h1>
                // );

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
                        // console.log(newvalue, currentvalue);
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
(function () {
    miniapp.directive('mmLayout', [function () {
        return {
            priority: 0,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            template:
                "<div class=\"layout\" ng-transclude>\n</div>"
        }
    }]);
})();

(function () {
    miniapp.directive('mmToolbarItem', [function () {
        return {
            priority: 0,
            transclude: true,
            terminal: false,
            replace: true,
            restrict: 'E',
            require: '^mmToolbar',
            scope: {
                href: '@',
                icon: '@'
            },
            compile: function (tElement, tAttrs) {
            },
            link: function (scope, element, attrs) {
                console.log(scope);
            },
            template:
                "<a ng-class=\"icon ? 'toolbar-icon' : 'toolbar-item'\" ng-transclude></a>"
        }
    }]);
})();
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
                "<div class=\"toolbar\">\n    <div class=\"toolbar-title\">\n        <div class=\"toolbar-hamburguer\" onclick=\"toggleActive(this);\">\n            <i></i>\n            <i></i>\n            <i></i>\n        </div>\n        <span>{{ title }}</span>\n    </div>\n    <nav class=\"toolbar-item-container\" ng-transclude></nav>\n</div>"
        }
    }]);
})();
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
                // console.log(id);
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
                    // console.log(href, name);
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