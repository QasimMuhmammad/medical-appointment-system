$(document).ready(function() {
  $('.btn-profile').click(function(event) {
    var data = $(this).data();
    var url = '/allPatients';
    var target = '/profile';
    var form = $('<form action="' + url +
      '" method="post"' + 'target="' + target + '"' + '>' +
      '<input type="text" name="pid" value="' + data.pid+ '" />' +
      '</form>');
    $(this).append(form);
    form.submit();
    form.remove();
  });
});
