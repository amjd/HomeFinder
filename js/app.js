  var map;
  var marker1, marker2, marker3, marker4;
  var searchform = document.getElementById('form1');
  var place1, place2, place3;
  var pos1, pos2, pos3, pos4;
  var input1 = document.getElementById('place-1'); 
  var input2 = document.getElementById('place-2'); 
  var input3 = document.getElementById('place-3'); 
  var autocomplete1 = new google.maps.places.Autocomplete(input1);
  var autocomplete2 = new google.maps.places.Autocomplete(input2);
  var autocomplete3 = new google.maps.places.Autocomplete(input3);
  var currently_selected = 0;

$(document).ready(function() {

  var initialize = function () {
    var myLatlng = new google.maps.LatLng(12.946550,77.600615);
    var mapOptions = {
      zoom: 8,
      center: myLatlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

  }

  var placeMarker = function (location) {
    if (currently_selected === 1)
    {
      marker1 = new google.maps.Marker({
          position: location, 
          map: map,
          title: 'Favourite place 1',
          draggable: true
      });
      pos1 = marker1.getPosition();
    }
    else if (currently_selected === 2)
    {
      marker2 = new google.maps.Marker({
          position: location, 
          map: map,
          title: 'Favourite place 2',
          draggable: true
      });
      pos2 = marker2.getPosition();
    }
    else if (currently_selected === 3)
    {
      marker3 = new google.maps.Marker({
          position: location, 
          map: map,
          title: 'Favourite place 3',
          draggable: true
      });
      pos3 = marker3.getPosition();
    }
  }
  
  $('.cta').click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: $("#continue-1").offset().top}, 1000);
  });
  $('.button-2').click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: $("#continue-2").offset().top}, 1000);
  });
  $('#place-1').focus(function() {
    currently_selected = 1;
  });
  $('#place-2').focus(function() {
    currently_selected = 2;
  });
  $('#place-3').focus(function() {
    currently_selected = 3;
  });

google.maps.event.addDomListener(window, 'load', initialize);
});

//Add listener to detect autocomplete selection
google.maps.event.addListener(autocomplete1, 'place_changed', function () {
  if(marker1)
  {
    marker1.setMap(null);
  }
  place1 = autocomplete1.getPlace();
  var newlatlong = new google.maps.LatLng(place1.geometry.location.lat(),place1.geometry.location.lng());
  map.setCenter(newlatlong);
  map.setZoom(12);
 });

google.maps.event.addListener(autocomplete2, 'place_changed', function () {
  if(marker2)
  {
      marker2.setMap(null);
  }
  place2 = autocomplete2.getPlace();
  var newlatlong = new google.maps.LatLng(place2.geometry.location.lat(),place2.geometry.location.lng());
  map.setCenter(newlatlong);
  map.setZoom(12);
 });

 google.maps.event.addListener(autocomplete3, 'place_changed', function () {
  if(marker3)
  {
      marker3.setMap(null);
  }
  place3 = autocomplete3.getPlace();
  var newlatlong = new google.maps.LatLng(place3.geometry.location.lat(),place3.geometry.location.lng());
  map.setCenter(newlatlong);
  map.setZoom(12);
 });
 
google.maps.event.addListener(map, 'click', function(evt) {
 placeMarker(evt.latLng);
});

google.maps.event.addListener(marker1, 'dragend', function(evt){
    pos1 = evt.latLng;
    map.setCenter(pos1);
});
google.maps.event.addListener(marker1, 'dragend', function(evt){
    pos2 = evt.latLng;
    map.setCenter(pos2);
});
google.maps.event.addListener(marker1, 'dragend', function(evt){
    pos3 = evt.latLng;
    map.setCenter(pos3);


//Add listener to search
searchform.addEventListener("submit", function() {
  var new_lat, new_lng, newlatlong, circleOptions, circle;
  if(circle)
  {
    circle.setMap(null);
  }
  new_lat = (pos1.lat() + pos2.lat() + pos3.lat())/3;
  new_lng = (pos1.lng() + pos2.lng() + pos3.lng())/3;
  newlatlong = new google.maps.LatLng(new_lat,new_lng);
  map.setCenter(newlatlong);
  marker4 = new google.maps.Marker({
    position: newlatlong, 
    map: map,
    title: 'Recommended place for home'
  });
  map.setZoom(12);
  pos4 = marker4.getPosition();
  circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: pos4,
    radius: 3000
  };

  // Add the circle to the map.
  circle = new google.maps.Circle(circleOptions);


});
  
});