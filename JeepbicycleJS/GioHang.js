$(document).ready(function () {
  // Hiển thị giỏ hàng
  $("#cart-button").click(function () {
    $("#cartContainer").addClass("show");
    $("body").css("overflow", "hidden");
  });

  // Đóng giỏ hàng
  $("#closeCartBtn").click(function () {
    $("#cartContainer").removeClass("show");
    $("body").css("overflow", "auto");
  });

  // Cập nhật hiển thị giỏ hàng
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

  // Cập nhật tổng tiền trong giỏ hàng
  function updateTotalPrice() {
    let totalPrice = 0;
    $('.cart-item').each(function() {
      const quantity = parseInt($(this).find('.cart-item-quantity').val()); 
      const price = parseInt($(this).find('.cart-item-price').text().replace(/[^0-9]/g, "")); 
      totalPrice += quantity * price;
    });
    $('#total-price').text(totalPrice.toLocaleString() + "₫");
  }

  // Xóa một sản phẩm khỏi giỏ hàng
  $(document).on('click', '#clear-item', function () {
    $(this).closest('.cart-item').remove();
    updateCartVisibility();
    updateTotalPrice(); 
  });

  // Xóa toàn bộ sản phẩm khỏi giỏ hàng
  $('#clear-product').click(function () {
    $('tbody tr').remove();
    updateCartVisibility();
    updateTotalPrice(); 
  });

  // Tăng số lượng sản phẩm
  $(document).on('click', '.increase-quantity', function () {
    let $quantity = $(this).closest('.cart-item').find('.cart-item-quantity');
    $quantity.val(parseInt($quantity.val()) + 1);
    updateTotalPrice(); 
  });

  // Giảm số lượng sản phẩm
  $(document).on('click', '.decrease-quantity', function () {
    let $quantity = $(this).closest('.cart-item').find('.cart-item-quantity');
    if (parseInt($quantity.val()) > 1) {
      $quantity.val(parseInt($quantity.val()) - 1);
      updateTotalPrice();
    }
  });

  // Áp dụng mã giảm giá
  $('#btn-apply').on('click', function () {
    const discount = parseFloat($('#discount-code').val());
    const total = parseInt($('#total-price').text().replace(/[^0-9]/g, ""));
    const newTotal = total - (total * discount / 100);
    $('#total-price').text(newTotal.toLocaleString() + "₫");
    $('#discount-code').val("");
  });

  // Chuyển đến trang sản phẩm
  $('#btn-continue').click(function () {
    window.location.href = "SanPham.html";
  });

  // Chuyển đến trang thanh toán
  $('#btn-checkout').click(function () {
    window.location.href = "ThanhToan.html";
  });

  // Cập nhật tổng tiền khi có thay đổi
  updateTotalPrice();
});
