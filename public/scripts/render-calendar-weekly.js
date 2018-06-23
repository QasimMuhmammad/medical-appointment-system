$("#todays-date").append(function() {
  return "Today is " + moment().format("D MMMM, YYYY");
});
$(document).ready(function() {
  $('.btn-action').click(function(event) {
    var data = $(this).data();
    var url = '/calendar-weekly-action';
    var target = '/calendar-weekly-action';
    var form = $('<form action="' + url +
      '" method="post"' + 'target="' + target + '"' + '>' +
      '<input type="text" name="id" value="' + data.id+ '" />' +
      '<input type="text" name="action" value="' + data.action+ '" />' +
      '</form>');
    $(this).append(form);
    form.submit();
    form.remove();
  });
});
