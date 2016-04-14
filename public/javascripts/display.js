$(function(){
  $('.modal').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal').find(".modal-content").empty();
      console.log(this);
  });
})
