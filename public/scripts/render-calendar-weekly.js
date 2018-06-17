$("#todays-date").append(function() {
  return "Today is " + moment().format("D MMMM, YYYY");
});

$.ajax({
  url: "/test-data/test-events.json",
  success: renderEvents,
});


function renderEvents(data) {
  data.events.forEach(function(evt) {
    var eventCard = $("#event-card").children();
    console.log($("#event-card").children());
    console.log(eventCard);
    eventCard.attr("id", evt.id);
    eventCard.find("card-title").html(evt.name);
    eventCard.find("card-body").html("STUFF");

    var template = `<div id={{eventId}} class="card calendar-event w-100">
      <div class="card-body">
        <div class="card-title">

        </div>
        <div class="card-text">

        </div>
      </div>
    </div>`;

    var html = Mustache.to_html()

    $("#" + evt.day + "-" + evt.startTime.split(':')[0]).append(eventCard);
  });
};
