$(document).ready(function() {
  $('.btn-profile').click(function(event) {
    var data
    $.ajax({
      type: "POST",
      url: "/profile",
      data: data,
      success: success,
      dataType: dataType
    });
  });
});
