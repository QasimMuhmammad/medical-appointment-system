$("#todays-date").append(function() {
  return "Today is " + moment().format("D MMMM, YYYY");
});

$.ajax({
  url: "/test-data/test-events.json",
  success: renderEvents
});


function renderEvents(data) {
  data.events.forEach(function(evt) {
    var hours = evt.endTime.hour - evt.startTime.hour +
      (evt.endTime.minute - evt.startTime.minute) / 60.0;
    var minFrac = evt.startTime.minute / 60.0 * 100;
    console.log(minFrac);
    var eventAttr = {
      eventId: "event-" + evt.id,
      eventTitle: evt.name,
      eventHeight: (hours * 100).toString() + "%",
      eventTop: minFrac.toString() + "%"
    };

    var template = `<div id={{eventId}}
      class="card calendar-event w-100"
      style="height: {{eventHeight}}; top: {{eventTop}}">
      <div class="card-body">
        <div class="card-title">
          {{eventTitle}}
        </div>
        <div class="card-text">
          STUFF
        </div>
      </div>
    </div>`;

    var html = Mustache.to_html(template, eventAttr);

    $("#" + evt.day + "-" + evt.startTime.hour).html(html);


  });
};
