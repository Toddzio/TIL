$(document).ready(function() {

  function flyPlane(){
         plane.css('right', startPos);
         plane.animate({right: 200}, 9000, 'linear')
       };

    var screenWidth = $(document).width();
    var startPos = screenWidth;
    var plane = $('#plane')
        flyPlane();
        setInterval(function() {
          flyPlane();
        }, 1000);
      });
