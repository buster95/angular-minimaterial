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