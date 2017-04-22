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