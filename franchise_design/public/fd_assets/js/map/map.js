
//format of coordinates expected
  const locations = [
    { lat: 51.61708,
      lng: -0.31235,
      name: 'name',
      phone: 'phone',
      link: 'link',
      address:  'address'
    },
    { lat: 51.57959, 
      lng: -0.30208,
      name: 'name',
      phone: 'phone',
      link: 'link',
      address:  'address'
    },
    { lat: 51.59163, 
      lng: -0.38674,
      name: 'name',
      phone: 'phone',
      link: 'link',
      address:  'address'
    },
  ];


var marker = null;
var infoWindow = null
var map = null
const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png';
function initMap() {
    
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: locations[0],
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
        let x= position
        infoWindow.setContent(
          '<p class="location"> '+ x.name +' </p>'+
          '<div class="d-flex align-items-center">'+
              '<i class="fa fa-external-link pink "></i>'+
              '<a href='+x.link+'>Go to the franchise page</a>'+
          '</div>'+

          '<div class="d-flex">'+
             ' <i class="fa fa-phone pink"></i>'+
              '<a href='+x.link+'>'+x.phone+'</a>'+
          "</div>"+

          '<div class="d-flex">' +
              '<i class="fa fa-map-marker pink "></i>'+
              '<a href='+x.link+' style="width: 250px">'+ x.address+
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

      infoWindow.setContent(
        '<p class="location"> '+ x.name +' </p>'+
          '<div class="d-flex align-items-center">'+
              '<i class="fa fa-external-link pink "></i>'+
              '<a href='+x.link+'>Go to the franchise page</a>'+
          '</div>'+

          '<div class="d-flex">'+
             ' <i class="fa fa-phone pink"></i>'+
              '<a href='+x.link+'>'+x.phone+'</a>'+
          "</div>"+

          '<div class="d-flex">' +
              '<i class="fa fa-map-marker pink "></i>'+
              '<a href='+x.link+' style="width: 250px">'+ x.address+
              '</a>'+
          '</div>'
      );
      infoWindow.open(map, mark);

      mark.addListener("click", () => {
        
        infoWindow.setContent(
          '<p class="location"> '+ x.name +' </p>'+
          '<div class="d-flex align-items-center">'+
              '<i class="fa fa-external-link pink "></i>'+
              '<a href='+x.link+'>Go to the franchise page</a>'+
          '</div>'+

          '<div class="d-flex">'+
             ' <i class="fa fa-phone pink"></i>'+
              '<a href='+x.link+'>'+x.phone+'</a>'+
          "</div>"+

          '<div class="d-flex">' +
              '<i class="fa fa-map-marker pink "></i>'+
              '<a href='+x.link+' style="width: 250px">'+x.address+
              '</a>'+
          '</div>'
        );
        infoWindow.open(map, mark);
      });
    // Add a marker clusterer to manage the markers.
    
    const markerCluster = new markerClusterer.MarkerClusterer({ map, mark });
  }

  $(document).ready(function() {
    $(".maplist").click(function(event) {
      event.preventDefault()
      console.log(event)
      map.setZoom(13);
      changeDirection( { 
        lat: parseFloat(event.currentTarget.dataset.lat) , 
        lng: parseFloat(event.currentTarget.dataset.lng),
        name: event.currentTarget.dataset.name,
        phone: event.currentTarget.dataset.phone,
        link: event.currentTarget.dataset.link,
        address:  event.currentTarget.dataset.address
      })
      
    });

});