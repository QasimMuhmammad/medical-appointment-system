$(document).ready(function() {
  // popup modal
  var modal = $('#modal');

  $('.btn-view-prescription').click(function (event) {
    var data = $(this).data();

    $.ajax({
      type: "POST",
      url: "/profile",
      data: data,
      success: function renderDrugs(drugs) {
        var table = `<table class="myTable">
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Doctor ID</th>
              <th>Date</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>

            <% for (var i = 0; i < patient.length; i++) { %>
              <tr>
                <td>
                  <%= patient[i].prescriptionid; %>
                </td>
                <td>
                  <%= patient[i].doctorid; %>
                </td>
                <td>
                  <%= patient[i].year + "/" + patient[i].month + "/" + patient[i].day; %>
                </td>
                <th>
                  <div class="btn btn-primary btn-view-prescription" data-prescriptionid="<%= patient[i].prescriptionid; %>">
                    Modify
                  </div>
                </th>
              </tr>
              <% } %>
          </tbody>
        </table>`;
        
        modal.css("display", "block");
      }
    });

  });

  $('#modal-close').click(function (event) {
    modal.css('display', 'none');
  })
});
