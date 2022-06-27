

  const locations = [
    { lat: 51.61708, lng: -0.31235},
    { lat: 51.57959, lng: -0.30208 },
    { lat: 51.59163, lng: -0.38674},
  ];
var marker = null;
var infoWindow = null
var map = null
const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png';
function initMap() {
    
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 51.61708, lng: -0.31235},
    });
    infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });
    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Add some markers to the map.
    const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      let marker = new google.maps.Marker({
        position,
        icon: image
      });
  
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        
        infoWindow.setContent('<p class="location"> Barnet </p>'+
          '<div class="d-flex align-items-center">'+
              '<i class="fa fa-external-link pink "></i>'+
              '<a href="">Go to the franchise page</a>'+
          '</div>'+

          '<div class="d-flex">'+
             ' <i class="fa fa-phone pink"></i>'+
              '<a href="">07883 268200</a>'+
          "</div>"+

          '<div class="d-flex">' +
              '<i class="fa fa-map-marker pink "></i>'+
              '<a href="" style="width: 250px">'+
                  'Belmont Mill Hill Preparatory School, The Ridgeway,'+ 
                  ' Village, London NW7 4ED'+
              '</a>'+
          '</div>'
        );
        infoWindow.open(map, marker);
      });
      return marker;
    });


    // Add a marker clusterer to manage the markers.
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  }
  
  
  
  window.initMap = initMap;

  const changeDirection=(x)=>{
    //  map.setCenter(x);

     map.panTo(x);
     var mark = new google.maps.Marker({position: x, map: map, icon: image,}); 

      infoWindow.setContent('<p class="pink">I love making money<p>'+x.lng);
      infoWindow.open(map, mark);

      mark.addListener("click", () => {
        console.log("here")
        infoWindow.setContent('<p class="pink">I love making money<p>'+x.lng);
        infoWindow.open(map, mark);
      });
    // Add a marker clusterer to manage the markers.
    
    const markerCluster = new markerClusterer.MarkerClusterer({ map, mark });
  }

  $(document).ready(function() {
    $("#location").click(function(event) {
      event.preventDefault()
      map.setZoom(13);
      changeDirection( { lat: 51.59163, lng: -0.38674})
      
    });

    $("#location2").click(function(event) {
      event.preventDefault()
      map.setZoom(13);
      changeDirection({ lat: 51.57959, lng: -0.30208 })
     

    });

    $("#location3").click(function(event) {

      event.preventDefault()
      changeDirection({ lat: 51.61708, lng: -0.31235})
      
    });
});