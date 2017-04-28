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