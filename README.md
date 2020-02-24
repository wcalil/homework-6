# homework-6

The app was created for those who travel a lot and need to know the forecasts for the next days to get ready for the weather in the city destination.

##Link
https://wcalil.github.io/homework-6/

## Development

The app pulls data from OpenWeatherMap API. This data refers to the current day and 5-day forecast. To render the weather information, an event listener was used. Every time the user inputs the name of the city in the input field, the ajax function pulls information from the API using the URL, the API key, and the name of the city.

Another function adds the name of the city in an array. This array is stored on a visible list of cities that keep a record of all cities previously searched. The for each method works to grab each city from the array, creating an <li>, inserting the name of the city, and storing in local storage. The for-each method also inserts an event listener to it, using the same function (renderForecast) that the input uses, just by adding the name of the city as a parameter.

The function renderForecast creates an HTML element every time there is a new input (by clicking on the list of cities or inputting a new city). After adding elements, it pulls the specific value of the object in the array of the API and places it in the HTML elements created.

