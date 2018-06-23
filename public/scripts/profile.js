$(document).ready(function() {
  // popup modal
  var modal = $('#modal');


  $('.btn-profile').click(function(event) {
    var data = event.getPatients;

    $.ajax({
      type: "POST",
      url: "/profile",
      data: data,
      success: success,
      dataType: dataType
    });
  });

  $('.btn-view-prescription').click(function (event) {
    modal.css("display", "block");
    console.log("MODAL BUTTON PRESSED");
  });

  $('#modal-close').click(function (event) {
    modal.css('display', 'none');
  })
});
