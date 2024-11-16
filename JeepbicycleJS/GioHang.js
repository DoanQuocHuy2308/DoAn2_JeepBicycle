$(document).ready(function () {
  $("#cart-button").click(function () {
    $("#cartContainer").addClass("show");
    $("body").css("overflow", "hidden");
  });
});

$(document).ready(function () {
  $("#closeCartBtn").click(function () {
    $("#cartContainer").removeClass("show");
    $("body").css("overflow", "auto");
  });
});

$(document).ready(function() {
  function updateCartVisibility() {
    if ($('.cart-item').length === 0) {
      $('.cart-body').show(); 
      $('.cart-product').hide();
    } else {
      $('.cart-body').hide();
      $('.cart-product').show(); 
    }
  }

  updateCartVisibility();

  $(document).on('click', '#clear-item', function() {
    $(this).closest('.cart-item').remove();
    updateCartVisibility();
  });
});



$(document).ready(function () { 
  $('#clear-product').click(function() { 
    $('tbody tr').remove();
  }); 
});

function tang() {
  let $quantity = $('#quantity');
  $quantity.val(parseInt($quantity.val()) + 1);
}

function giam() {
  let $quantity = $('#quantity');
  if (parseInt($quantity.val()) > 1) {
      $quantity.val(parseInt($quantity.val()) - 1);
  }
}

$(document).ready(function () {
  const oldPrice = parseInt($('#old-price').text().replace(/[^0-9]/g, ""));
  $('#new-price').text(oldPrice.toLocaleString() + "₫");
  $('#price-detail').text(oldPrice.toLocaleString() + "₫");
});

$(document).ready(function () {
  $('#btn-continue').click(function () {
    window.location.href = "SanPham.html";
  });
});

$(document).ready(function () {
  $('#update').on('click', function () {
    const oldPriceText = $('#old-price').text();
    const oldPrice = parseInt(oldPriceText.replace(/[^0-9]/g, "")); 
    const soluong = parseInt($('#quantity').val());
    const newPrice = soluong > 0 ? oldPrice * soluong : 0;
    $('#new-price').text(newPrice.toLocaleString() + "₫");
    $('#price-detail').text(newPrice.toLocaleString() + "₫");
    $('#total-price').text(newPrice.toLocaleString() + "₫");
  });
});

$(document).ready(function () {
  $('#btn-apply').on('click', function () {
    const detail = parseFloat($('#discount-code').val());
    const total = $('#total-price').text().replace(/[^0-9]/g, "");
    const newTotal = total - (total * detail / 100);
    $('#total-price').text(newTotal.toLocaleString() + "₫");
    $('#discount-code').val("");
  });
});

$(document).ready(function () {
  $('#btn-checkout').click(function () {
    window.location.href = "ThanhToan.html";
  });
});