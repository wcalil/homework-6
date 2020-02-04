
    var cities =[];

function renderForecast() {

    // var cities =[];

    var cityInput = $("#cityInput").val().trim();
    console.log(cityInput)
    
    cities.push(cityInput);
    console.log(JSON.stringify(cities))

    $("#listOfCities").localStorage.getItem("listOfCities");\

    function renderCityButtons() {

        // Loops through the array of cities
        for (var i = 0; i < cities.length; i++) {
        
        
        var listOfCities = $("<li>");
        listOfCities.addClass("list-group-item");
        listOfCities.attr("data-name", cities[i]);
        listOfCities.text(cities[i]);
        $("#listOfCities").append(listOfCities);
        localStorage.setItem("listOfCities", JSON.stringify(cities))
    
       

        }

    }

    $("#listOfCities").empty()

    renderCityButtons()
  

    var queryURLCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial" + "&appid=d04875a8abdb33018b444d3bd910bebb";


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
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
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

            var uv = $("<p>").text("UV Index: " + response2.value);
            $("#cityCard").append(uv);


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
        var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial" + "&appid=d04875a8abdb33018b444d3bd910bebb";;
        console.log(queryURLforecast)

        $.ajax({
            url: queryURLforecast,
            method: "GET"
        }).then(function (response4) {
            console.log(response4)

            $(".column5").empty()
            $(".column13").empty()
            $(".column21").empty()
            $(".column29").empty()
            $(".column37").empty()

            // Forecast Day 1
            var forecastDay1 = response4.list[5];
            var dateDay1 = $("<h5>").text(moment(forecastDay1.dt_txt).format("MMMM Do YYYY"))
            var div1 = $(".column5").append("<div class='cardBody' id='5'></div>");
            $("#5").append(dateDay1);
            $("#5").append("Temp: " + response4.list[5].main.temp + "°F");
            $("#5").append("<br>");
            $("#5").append("Humidity: " + response4.list[5].main.humidity + "%");

            // Forecast Day 2
            var forecastDay2 = response4.list[13];
            var dateDay2 = $("<h5>").text(moment(forecastDay2.dt_txt).format("MMMM Do YYYY"))
            $(".column13").append("<div class='cardBody' id='13'></div>");
            $("#13").append(dateDay2);
            $("#13").append("Temp: " + response4.list[13].main.temp + "°F");
            $("#13").append("<br>");
            $("#13").append("Humidity: " + response4.list[13].main.humidity + "%");

            // Forecast Day 3
            var forecastDay3 = response4.list[21];
            var dateDay3 = $("<h5>").text(moment(forecastDay3.dt_txt).format("MMMM Do YYYY"))
            $(".column21").append("<div class='cardBody' id='21'></div>");
            $("#21").append(dateDay3);
            $("#21").append("Temp: " + response4.list[21].main.temp + "°F");
            $("#21").append("<br>");
            $("#21").append("Humidity: " + response4.list[21].main.humidity + "%");

            // Forecast Day 4
            var forecastDay4 = response4.list[29];
            var dateDay4 = $("<h5>").text(moment(forecastDay4.dt_txt).format("MMMM Do YYYY"))
            $(".column29").append("<div class='cardBody' id='29'></div>");
            $("#29").append(dateDay4);
            $("#29").append("Temp: " + response4.list[29].main.temp + "°F");
            $("#29").append("<br>");
            $("#29").append("Humidity: " + response4.list[29].main.humidity + "%");

            // Forecast Day 5
            var forecastDay5 = response4.list[37];
            var dateDay5 = $("<h5>").text(moment(forecastDay5.dt_txt).format("MMMM Do YYYY"))
            $(".column37").append("<div class='cardBody' id='37'></div>");
            $("#37").append(dateDay5);
            $("#37").append("Temp: " + response4.list[37].main.temp + "°F");
            $("#37").append("<br>");
            $("#37").append("Humidity: " + response4.list[37].main.humidity + "%");

            // Get forecast icon code to append icon
            var forecastIconCode = response4.list[5].weather[0].icon;
            console.log(forecastIconCode)

            //Append the iconForecast
            var queryURLiconForecast = "https://openweathermap.org/img/wn/" + forecastIconCode + ".png";
            // console.log(queryURLicon)

            $.ajax({
                url: queryURLiconForecast,
                method: "GET"
            }).then(function () {

                // Icon Day 1      
                var icon = $("<img class='icon'>").attr("src", queryURLiconForecast);
                $("#5").append(icon);

                // Icon Day 2  
                var icon = $("<img class='icon'>").attr("src", queryURLiconForecast);
                $("#13").append(icon);

                // Icon Day 3  
                var icon = $("<img class='icon'>").attr("src", queryURLiconForecast);
                $("#21").append(icon);

                // Icon Day 4  
                var icon = $("<img class='icon'>").attr("src", queryURLiconForecast);
                $("#29").append(icon)

                // Icon Day 5  
                var icon = $("<img class='icon'>").attr("src", queryURLiconForecast);
                $("#37").append(icon)

            });



        });

    });




}




$("#basic-addon2").on("click", function (event) {
    event.preventDefault();
  
    renderForecast();  


});


