var app = angular.module("ogdesign", ['angular-google-analytics']);

app.config(function($locationProvider, AnalyticsProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    AnalyticsProvider.setAccount([{
        tracker: 'UA-52653674-2',
        name: "tracker"
    }]);
});

app.directive('mousetrap', function () {
    return {
        restrict: 'A',
        controller: ['$scope', '$element', '$attrs',
                     function ($scope, $element, $attrs) {
            
            var mousetrap;

            $scope.$watch($attrs.mousetrap, function(_mousetrap) {
                mousetrap = _mousetrap;

                for (var key in mousetrap) {
                    if (mousetrap.hasOwnProperty(key)) {
                        Mousetrap.unbind(key);
                        Mousetrap.bind(key, applyWrapper(mousetrap[key])); 
                    }
                }
            }, true);
            
            function applyWrapper(func) {
                return function(e) {
                    $scope.$apply(function() {
                        func(e);
                    });
                };
            }
            
            $element.bind('$destroy', function() {
                if (!mousetrap) return;

                for (var key in mousetrap) {
                    if (mousetrap.hasOwnProperty(key)) {
                        Mousetrap.unbind(key);
                    }
                }
            });

        }]
    }
});


app.controller("RootController", function($scope, $timeout, Analytics, $location) {

    // 作品
    $scope.porfolios = [
        {
            thumbnail: "智慧觀光Web.jpg",
            full: "智慧觀光Web.jpg",
            name: "台灣智慧觀光 - 網站設計",
            isSmall: false
        },
        {
            thumbnail: "smarttrip.jpg",
            full: "smarttrip.jpg",
            name: "台灣智慧觀光 - App 設計",
            isSmall: false
        },
        {
            thumbnail: "cupoy_web.jpg",
            full: "cupoy_web.jpg",
            name: "Cupoy - 網站設計",
            isSmall: false
        },
        {
            thumbnail: "cupoy_ios.jpg",
            full: "cupoy_ios.jpg",
            name: "Cupoy - 傳遞知識的最佳解決方案",
            isSmall: false
        },
        {
            thumbnail: "cupoy_ios_extension.jpg",
            full: "cupoy_ios_extension.jpg",
            name: "Cupoy - iOS Extension Design",
            isSmall: false
        },
        {
            thumbnail: "cupoy_email_template.jpg",
            full: "cupoy_email_template.jpg",
            name: "CUPOY - Email Template Design",
            isSmall: false
        },
        {
            thumbnail: "clipo.jpg",
            full: "clipo.jpg",
            name: "Clipo - 收藏、整理有趣的資訊",
            isSmall: false
        },
        {
            thumbnail: "金色三麥.jpg",
            full: "金色三麥.jpg",
            name: "金色三麥",
            isSmall: false
        },
        {
            thumbnail: "oodeco.jpg",
            full: "oodeco.jpg",
            name: "ooDesign",
            isSmall: false
        },
        {
            thumbnail: "豐盛.jpg",
            full: "豐盛.jpg",
            name: "豐盛智匯",
            isSmall: false
        },
        {
            thumbnail: "Jibaoapp.jpg",
            full: "Jibaoapp.jpg",
            name: "吉寶知識系統",
            isSmall: true
        },
        {
            thumbnail: "AIESEC.jpg",
            full: "AIESEC.jpg",
            name: "AIESEC Taiwan",
            isSmall: true
        },
    ];
    $scope.isOpenPlayer = false;
    $scope.portfolio = $location.search().portfolio;

    $scope.openPlayer = function(portfolio, index) {
        $scope.isOpenPlayer = true;
        $scope.goto(portfolio, index);
    };

    $scope.closePlayer = function() {
        $scope.isOpenPlayer = false;
        $scope.current = undefined;
        $location.search('portfolio', null);
    };

    $scope.goto = function (portfolio, index) {
        Analytics.trackEvent('Portfolio', 'View', portfolio.name);
        if ($scope.current) {
            $scope.current.scrollTop = $("#player").scrollTop();
        }
        $scope.currentIndex = index;
        $scope.current = portfolio;
        $scope.isSmall = portfolio.isSmall;
        $("#player").scrollTop($scope.current.scrollTop || 0);
        $location.search('portfolio', index);
    };

    $scope.next = function () {
        if ($scope.currentIndex + 1 <= $scope.porfolios.length - 1) {
            $scope.goto($scope.porfolios[$scope.currentIndex + 1], $scope.currentIndex + 1);
        }
        else {
            $scope.goto($scope.porfolios[0], 0);
        }
    };

    $scope.prev = function () {
        if ($scope.currentIndex - 1 > 0) {
            $scope.goto($scope.porfolios[$scope.currentIndex - 1], $scope.currentIndex - 1);
        }
        else {
            $scope.goto($scope.porfolios[$scope.porfolios.length - 1], $scope.porfolios.length - 1);
        }
    };

    if ($scope.portfolio) {
        var idx = parseInt($scope.portfolio);
        $scope.openPlayer($scope.porfolios[idx], idx);
    }
});