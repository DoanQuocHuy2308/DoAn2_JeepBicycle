$(document).ready(function () {
  $("#icon-search").click(function () {
    $("body").css("overflow", "hidden");
    $("#search").css("display", "block");
  });

  $("#close").click(function () {
    $("body").css("overflow", "auto");
    $("#search").css("display", "none");
  });

  $.getJSON("../JeepBicycleJSON/products.json", function (data) {
    $('#valueProduct').on("input", function () {
      var search = $(this).val().toLowerCase();
      var dataProducts = data.filter(function (item) {
        return item.Name.toLowerCase().includes(search);
      });
  
      $('#dataProducts').empty();
  
      if (dataProducts.length === 0) {
        $('#dataProducts').append('<div class="no-results" style="color: white">Không tìm thấy kết quả</div>');
      } else {
        dataProducts.forEach(function (item) {
          $('#dataProducts').append(`
            <div class="result-item d-flex align-items-center py-2">
              <img alt="${item.Name}" height="50" src="${item.img[0]}" width="50" class="rounded" />
              <div class="item-info flex-grow-1 ms-2">${item.Name}</div>
              <div class="item-oldprice fw-bold">${item.oldprice}</div>
              <div class="item-newprice fw-bold">${item.newprice}</div>
            </div>
          `);
        });
      }
    });
  });  
});

