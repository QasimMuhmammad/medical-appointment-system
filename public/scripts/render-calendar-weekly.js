$("#todays-date").append(function() {
  return "Today is " + moment().format("D MMMM, YYYY");
});
$(document).ready(function() {
  $('.btn-action').click(function(event) {
    var data = $(this).data();
    $.ajax({
      type: "POST",
      url: "/calendar-weekly-user-manage",
      data: data,
      success: location.reload(true)
    });

    console.log();
  });
});
