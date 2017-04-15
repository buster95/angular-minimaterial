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