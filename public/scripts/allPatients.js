$(document).ready(function() {
  $('.btn-profile').click(function(event) {
    console.log("PRESSED");
    var data = $(this).data();
    var url = '/allPatients';
    var target = '/allPatients';
    var form = $('<form action="' + url +
      '" method="post"' + 'target="' + target + '"' + '>' +
      '<input type="text" name="pid" value="' + data.pid + '" />' +
      '</form>');
    $(this).append(form);
    form.submit();
    form.remove();
  });
});
