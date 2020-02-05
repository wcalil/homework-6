let oldCitiesList = JSON.parse(localStorage.getItem("listOfCities"))
var cities = [];
if (oldCitiesList) {
    cities = oldCitiesList
}
renderCityButtons()
function renderCityButtons() {
    // Loops through the array of cities
    cities.forEach(function (city) {
        var listOfCities = $("<li>");
        listOfCities.addClass("list-group-item");
        listOfCities.text(city);
        $("#listOfCities").append(listOfCities);
        listOfCities.on("click", function () { renderForecast(city) })
    })
}
function saveCity() {
    localStorage.setItem("listOfCities", JSON.stringify(cities))
}
function renderForecast(cityToRender) {
    // cities.push(cityToRender);
    $("#listOfCities").empty()
    renderCityButtons()
    var queryURLCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + cityToRender + "&units=imperial" + "&appid=d04875a8abdb33018b444d3bd910bebb";
    $.ajax({
        url: queryURLCurrentDay,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // Clear the city section
        $("#cityCard").empty();
        // Append the name of the city
        var cityName = $("<h2>").text(response.name);
        $("#cityCard").append(cityName);
        // Append the date
        var currentDate = new Date();
        var currentDateMoment = moment(currentDate).format("dddd, MMMM Do YYYY");
        var cityDay = $("<h3>").text(currentDateMoment);
        $("#cityCard").append(cityDay);
        $("#cityCard").append("<br>")
        // Append the temperature
        var temperature = $("<p>").text("Temperature: " + response.main.temp);
        $("#cityCard").append(temperature);
        // Append the humidity
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        $("#cityCard").append(humidity);
        // Append the wind speed
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);
        $("#cityCard").append(windSpeed);
        //Get Longitude and Latitude for the UV index
        var longitude = response.coord.lon;
        console.log(longitude)
        var latitude = response.coord.lat;
        console.log(latitude)
        //Append the UV Index
        var queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + latitude + "&lon=" + longitude + "&appid=d04875a8abdb33018b444d3bd910bebb";
        // console.log(queryURLuv)
        $.ajax({
            url: queryURLuv,
            method: "GET"
        }).then(function (response2) {
            // console.log(response2)
            var uv = $("<p id='uvIndex'>").text("UV Index: " + response2.value);
            $("#cityCard").append(uv);
            // Change UV background color
        if (response2.value < 5){
            $("#uvIndex").css("background-color", "green")
            }
        else if (response2.value >= 5 && response2.value <= 8){
            $("#uvIndex").css("background-color", "yellow")
        }
        else if (response2.value >= 8){
            $("#uvIndex").css("background-color", "red")
        }
        });
        // Get icon code to append icon
        var iconCode = response.weather[0].icon;
        // console.log(iconCode)
        //Append the icon
        var queryURLicon = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        console.log(queryURLicon)
        $.ajax({
            url: queryURLicon,
            method: "GET"
        }).then(function (response3) {
            // console.log(response3)
            $("#weatherIcon").empty()
            var icon = $("<img class='bigIcon'>").attr("src", queryURLicon);
            $("#weatherIcon").append(icon);
        });
        //Append the forecast
        var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityToRender + "&units=imperial" + "&appid=d04875a8abdb33018b444d3bd910bebb";;
        $.ajax({
            url: queryURLforecast,
            method: "GET"
        }).then(function (response4) {
            console.log("response", response4)
            $(".column5").empty()
            $(".column13").empty()
            $(".column21").empty()
            $(".column29").empty()
            $(".column37").empty()
            const targetTimes = [5, 13, 21, 29, 37]
            targetTimes.forEach((time) => {
                var forecastDay1 = response4.list[time];
                var dateDay1 = $("<h5>").text(moment(forecastDay1.dt_txt).format("MMMM Do YYYY"))
                var div1 = $(`.column${time}`).append(`<div class='cardBody' id='${time}'></div>`);
                $(`#${time}`).append(dateDay1);
                $(`#${time}`).append("Temp: " + response4.list[time].main.temp + "°F");
                $(`#${time}`).append("<br>");
                $(`#${time}`).append("Humidity: " + response4.list[time].main.humidity + "%");
                var forecastIconCode = response4.list[time].weather[0].icon;
                var queryURLiconForecast = "https://openweathermap.org/img/wn/" + forecastIconCode + ".png";
                $.ajax({
                    url: queryURLiconForecast,
                    method: "GET"
                }).then(function () {
                    var icon = $("<img class='icon'>").attr("src", queryURLiconForecast);
                    $(`#${time}`).append(icon);
                })
            });
        });
    });
}
$("#basic-addon2").on("click", function (event) {
    event.preventDefault();
    let cityInput = $("#cityInput").val().trim()
    cities.push(cityInput)
    renderForecast(cityInput);
    saveCity()
});