$(document).ready(function() {
  // popup modal
  var modal = $('#modal');

  $('.btn-view-prescription').click(function(event) {
    var data = $(this).data();
    console.log(data);
    $.ajax({
      type: "POST",
      url: "/profile",
      data: data,
      success: function renderDrugs(drugs) {

        console.log(drugs);

        var table = `<table class="myTable">
          <thead>
            <tr>
              <th>Drug ID</th>
              <th>Is Refillable</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>`;

        for (var i = 0; i < drugs.length; i++) {
          table += `<tr><td>`;
          table += drugs[i].drugid;
          table += "</td><td>";
          table += drugs[i].is_refillable ? "Yes" : "No";
          table += "</td><td>";
          table += drugs[i].quantity;
          table += "</td></tr>";

        }


        table += `</tbody></table>`;

        $("#modal-table").empty().append(table);



        $('.myTable').DataTable();
        modal.css("display", "block");
      }

    });

    $('#modal-close').click(function(event) {
      modal.css('display', 'none');
    });
  });
});
