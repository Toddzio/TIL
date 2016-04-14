$(document).ready(function() {

  function balloonLeft() {
    if($(window).width() > 800){
      $("#ballon").animate({left: "-=800"}, 8000, "swing", balloonRight);
    }else{
      $("#ballon").animate({left: "-=200"}, 8000, "swing", balloonRight);
    }
  }
  function planeRight() {
    if($(window).width() > 800){
      $("#ballon").animate({left: "+=800"}, 8000, "swing", balloonLeft);
    }else{
      $("#ballon").animate({left: "+=200"}, 8000, "swing", balloonLeft);
    }
  }
  balloonRight();

});
