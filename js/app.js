var map, circle;

var marker1, marker2, marker3, marker4;

var searchform = document.getElementById("form1");

var place1, place2, place3;

var pos1, pos2, pos3, pos4;

var input1 = document.getElementById("place-1");

var input2 = document.getElementById("place-2");

var input3 = document.getElementById("place-3");

var autocomplete1 = new google.maps.places.Autocomplete(input1);

var autocomplete2 = new google.maps.places.Autocomplete(input2);

var autocomplete3 = new google.maps.places.Autocomplete(input3);

var currently_selected = 0;

var initialize = function() {
    var a = new google.maps.LatLng(12.94655, 77.600615);
    var b = {
        zoom: 8,
        center: a
    };
    map = new google.maps.Map(document.getElementById("map"), b);
    google.maps.event.addListener(autocomplete1, "place_changed", function() {
        if (marker1) marker1.setMap(null);
        place1 = autocomplete1.getPlace();
        var a = new google.maps.LatLng(place1.geometry.location.lat(), place1.geometry.location.lng());
        map.setCenter(a);
        map.setZoom(12);
    });
    google.maps.event.addListener(autocomplete2, "place_changed", function() {
        if (marker2) marker2.setMap(null);
        place2 = autocomplete2.getPlace();
        var a = new google.maps.LatLng(place2.geometry.location.lat(), place2.geometry.location.lng());
        map.setCenter(a);
        map.setZoom(12);
    });
    google.maps.event.addListener(autocomplete3, "place_changed", function() {
        if (marker3) marker3.setMap(null);
        place3 = autocomplete3.getPlace();
        var a = new google.maps.LatLng(place3.geometry.location.lat(), place3.geometry.location.lng());
        map.setCenter(a);
        map.setZoom(12);
    });
    google.maps.event.addListener(map, "click", function(a) {
        placeMarker(a.latLng);
    });
    google.maps.event.addListener(marker1, "dragend", function(a) {
        pos1 = a.latLng;
        map.setCenter(pos1);
    });
    google.maps.event.addListener(marker2, "dragend", function(a) {
        pos2 = a.latLng;
        map.setCenter(pos2);
    });
    google.maps.event.addListener(marker3, "dragend", function(a) {
        pos3 = a.latLng;
        map.setCenter(pos3);
    });
};

function placeMarker(a) {
    if (1 === currently_selected) {
        if (marker1) marker1.setMap(null);
        marker1 = new google.maps.Marker({
            position: a,
            map: map,
            title: "Favourite place 1",
            draggable: true
        });
        pos1 = marker1.getPosition();
    } else if (2 === currently_selected) {
        if (marker2) marker2.setMap(null);
        marker2 = new google.maps.Marker({
            position: a,
            map: map,
            title: "Favourite place 2",
            draggable: true
        });
        pos2 = marker2.getPosition();
    } else if (3 === currently_selected) {
        if (marker3) marker3.setMap(null);
        marker3 = new google.maps.Marker({
            position: a,
            map: map,
            title: "Favourite place 3",
            draggable: true
        });
        pos3 = marker3.getPosition();
    }
}

$(document).ready(function() {
    google.maps.event.addDomListener(window, "load", initialize);
    $(".cta").click(function(a) {
        a.preventDefault();
        $("html, body").animate({
            scrollTop: $("#continue-1").offset().top
        }, 1e3);
    });
    $(".button-2").click(function(a) {
        a.preventDefault();
        $("html, body").animate({
            scrollTop: $("#continue-2").offset().top
        }, 1e3);
    });
    $("#place-1").focus(function() {
        currently_selected = 1;
    });
    $("#place-2").focus(function() {
        currently_selected = 2;
    });
    $("#place-3").focus(function() {
        currently_selected = 3;
    });
    searchform.addEventListener("submit", function() {
        var a, b, c, d;
        if (circle) circle.setMap(null);
        a = (pos1.lat() + pos2.lat() + pos3.lat()) / 3;
        b = (pos1.lng() + pos2.lng() + pos3.lng()) / 3;
        c = new google.maps.LatLng(a, b);
        map.setCenter(c);
        if (marker4) marker4.setMap(null);
        marker4 = new google.maps.Marker({
            position: c,
            map: map,
            title: "Recommended place for home"
        });
        map.setZoom(12);
        pos4 = marker4.getPosition();
        d = {
            strokeColor: "#FF0000",
            strokeOpacity: .5,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: .35,
            map: map,
            center: pos4,
            radius: 3e3
        };
        circle = new google.maps.Circle(d);
    });
});