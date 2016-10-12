var myapp = angular.module('myapp', []);

myapp.factory('weatherService', function($http) {
    return { 
      getWeather: function() {
        var weather = {},
            i = 0,
            city = $('#city').val(), 
            cnt = $('#countDays').val();   

            if (city == "") {
              city = 'Санкт-Петербург';
            }

            $http.jsonp('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&mode=json&units=metric&cnt=' + cnt + '&callback=JSON_CALLBACK&APPID=b1cf72411725d1c622476781c219516c').success(function(data) {        	
            if (data) {
            	if (data.list) {
              	weather.days = [];                
              	angular.forEach(data.list, function(value, key) {
                    weather.days.push({
                    	"number": i,
                    	"temp": {
                      	"morn": value.temp.morn,
                        "day": value.temp.day,
                        "eve": value.temp.eve,
                        "night": value.temp.night,
                        "max": value.temp.max
                      },
                      "wind": value.speed,
                      "deg": value.deg,
                      "sky": value.weather[0].main
                    });
                    i++;
                  });
              }
              weather.city = data.city.name;             
            }
        });
				return weather;
      }
    }; 
});

myapp.factory('citiesService', function($http) {
    return { 
      getCities: function() {
        var cities = {},
        city = $('#city').val();
            $http.jsonp('https://api.vk.com/method/database.getCities?country_id=1&count=20&callback=JSON_CALLBACK&v=5.57&q='+ city).success(function(data) {  
                cities.title = []; 
                angular.forEach(data.response.items, function(value, key) {
                    cities.title.push({
                        "title": value.title
                    });
                });
        });
        return cities;
      }
    }; 
});

myapp.filter('temp', function($filter) {
    return function(input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0C';
    };
});

myapp.directive('weatherDay', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            day: '='
        },
        controller: function($scope) {
            $scope.getDate = function() {            	
            	var date = new Date();
              date.setDate(date.getDate() + $scope.day.number);
              return date;              
            }
        },
        templateUrl:"templates/wheather.html"
    };
});

myapp.directive('citiesTitle', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            citytitle: '='
        },
        template:"<option>{{ citytitle.title }}</option>"
    };
});

myapp.directive('weatherIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            sky: '@'
        },
        controller: function($scope) {
            $scope.imgurl = function() {
                if ($scope.sky === "Clear") {
                    return 'img/icon-1.png';
                } else if ($scope.sky === "Clouds") {
                    return 'img/icon-2.png';
                } else if ($scope.sky === "Rain") {
                    return 'img/icon-3.png';
                } else if ($scope.sky === "Snow") {
                    return 'img/icon-4.png';
                }
            };
        },
        template: '<img class="icon" ng-src="{{ imgurl() }}">'
    };
});	