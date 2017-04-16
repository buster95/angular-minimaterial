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