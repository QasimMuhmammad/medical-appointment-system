$("#todays-date").append(function() {
  return "Today is " + moment().format("D MMMM, YYYY");
});
$(document).ready(function() {
  console.log();
  var bg = $(".calendar-tile");
  var poppers = new Array();
  for (var i = 0; i < 1; i++) {
    //poppers.push(new Popper(bg[i], $(bg[i]).find('.popup'), {
    //placement: 'top',

    //}));
    var a = $(bg[i]);
    var b = $(bg[i]).find('.popup');
    console.log(a);
    console.log(b);

  }

  bg.click(function() {
    var ref = $(this);
    var popup = $(this).find('.popup');
    var tooltip = new Tooltip(ref, {
      placement: 'top'
    });


    console.log(tooltip);
  });

});
