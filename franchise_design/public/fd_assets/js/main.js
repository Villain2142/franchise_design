function reveal() {
    var logo = document.getElementById('logo')
    var navList = document.getElementById('navList')
    var airplane = document.getElementById('airplane')
    
    var windowHeight = window.pageYOffset;

    // this animates the navbar
      if (windowHeight > 100 ) {
        logo.classList.add("active");
        navList.classList.add("increasePadding");
       
      } else {
        logo.classList.remove("active");
        navList.classList.remove("increasePadding");
      }

  }
  



document.addEventListener("DOMContentLoaded", function(event) { 
  var bars = document.getElementById('bars')
  var navOptions = document.getElementById('navOptions')
  var xmark = document.getElementById('xmark')
 

  bars.addEventListener('click',function(){
 
    navOptions.classList.toggle("slidein");
    xmark.classList.toggle("showed");
    bars.classList.toggle("noshowed");
    if(screen.width <= 1024){
      var coll = document.getElementsByClassName("dropdown");
      var i;
      console.log(coll)
      for (i = 0; i < coll.length; i++) {
        console.log(i)
        coll[i].addEventListener("click", function() {
          
          var content = this.lastElementChild;
          console.log(content)
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      }
    }
  })


  xmark.addEventListener('click',function(){
    navOptions.classList.toggle("slidein");
    bars.classList.toggle("noshowed");
    xmark.classList.toggle("showed");
  })

});




let docElement = document.documentElement;

document.addEventListener('scroll', function(e){
  // let box = document.querySelector('.box');
  let current_position = (window.pageYOffset/ docElement.clientHeight) * 100
  // var windowHeight = window.pageYOffset; 
  docElement.style.setProperty('--up', current_position +'px')
  docElement.style.setProperty('--down', -current_position + 50 +'px' )
})

  
window.onload = function() {
  //YOUR JQUERY CODE
  window.addEventListener("scroll", reveal);

  // counter
  let counts=setInterval(updated);
  let upto=49000;
  function updated(){
      var count= document.getElementById("counter");
      count.innerHTML=++upto;
      if(upto===50000)
      {
          clearInterval(counts);
          setInterval(updated, 1000)
      }
  }



  $("#kt_daterangepicker_3").daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format("YYYY"),10)
  }, function(start, end, label) {
    var years = moment().diff(start, "years");
    alert("You are " + years + " years old!");
  }
  );



};


