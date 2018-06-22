$("#todays-date").append(function() {
  return "Today is " + moment().format("D MMMM, YYYY");
});
$(document).ready(function() {
  $('.btn-action').click(function(event) {
    var data = $(this).data();
    $.ajax({
      type: "POST",
<<<<<<< HEAD
      url: "/calendar-weekly-action",
      data: data,
      success: location.reload(true)
=======
      url: "/calendar-weekly-user-manage",
      data: data
>>>>>>> e8d57f70ec5c7137a00e771c90aeb614cc485e36
    });

    console.log();
  });
});
