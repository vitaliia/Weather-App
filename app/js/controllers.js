export default myapp => {

// контроллер для приложения

myapp.controller('WeatherCtrl', function ($scope, weatherService, citiesService) {
    $scope.countdays = [
      {count:'1'},
      {count:'2'},
      {count:'3'},
      {count:'4'},
      {count:'5'},
      {count:'6'},
      {count:'7'},
    ];
    $scope.cnt = $scope.countdays[5];
    $scope.weather = weatherService.getWeather('Samara', $scope.cnt); // Выводим погоду для города по умолчанию

    $scope.load = function (){ //обрабатываем клик по кнопке "Показать"

        if (!$scope.city) {
          $scope.bcolor = {'border-color':'red'};
        } else {
          $scope.weather = weatherService.getWeather($scope.city, $scope.cnt);
          $scope.bcolor = {'border-color':'#cccccc'};
        }
    }

    $scope.cities = function (){ // Обрабатываем изменение текстового поля
        if ($scope.city.length > 3 ) {
          $scope.citytitle = citiesService.getCities($scope.city);
        }
    }
});
}