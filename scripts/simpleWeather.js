// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

/* 
* Test Locations
* Austin lat/long: 30.2676,-97.74298
* Austin WOEID: 2357536
*/
$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
    //loadWeather('hyderabad',''); //@params location, woeid
});
function timeStamp() {
    var now = new Date();
    var hours = now.getHours();
    var suffix = ( hours < 12 ) ? "AM" : "PM";
    hours = ( hours < 12 ) ? hours : hours - 12;
    hours = hours || 12;
    return hours + ':' +now.getMinutes() + ' '+ suffix;
}
function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.alt.temp+'&deg; C</h2>';
      html += '<h3>'+ timeStamp() +'</h3>';        
      //html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      //html += '<li class="currently">'+weather.currently+'</li>';
      //html += '<li>'+weather.temp+'&deg;'+weather.units.temp+'</li></ul>';  
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
