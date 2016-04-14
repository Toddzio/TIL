$(document).ready(function() {

  function balloonLeft() {
    if($(window).width() > 800){
      $("#balloon").animate({left: "-=1600"}, 20000, "swing", balloonRight);
    }else{
      $("#balloon").animate({left: "-=200"}, 20000, "swing", balloonRight);
    }
  }
  function balloonRight() {
    if($(window).width() > 800){
      $("#balloon").animate({left: "+=1600"}, 20000, "swing", balloonLeft);
    }else{
      $("#balloon").animate({left: "+=200"}, 20000, "swing", balloonLeft);
    }
  }
  balloonRight();

});
