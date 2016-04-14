$(document).ready(function() {

  function planeLeft() {
    if($(window).width() > 800){
      $("#plane").animate({left: "-=800"}, 8000, "swing", planeRight);
    }else{
      $("#plane").animate({left: "-=200"}, 8000, "swing", planeRight);
    }
  }
  function planeRight() {
    if($(window).width() > 800){
      $("#plane").animate({left: "+=800"}, 8000, "swing", planeLeft);
    }else{
      $("#plane").animate({left: "+=200"}, 8000, "swing", planeLeft);
    }
  }
  planeRight();

});
