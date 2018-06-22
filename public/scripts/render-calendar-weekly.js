$("#todays-date").append(function() {
  return "Today is " + moment().format("D MMMM, YYYY");
});
$(document).ready(function() {

      console.log("ready");
  $(".btn-invis").click(function(event) {
      console.log(event.target.id);
    }


  );
});
