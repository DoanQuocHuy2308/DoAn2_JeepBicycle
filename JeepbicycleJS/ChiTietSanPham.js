// Tăng số lượng
function tang() {
  let $quantity = $('#quantity');
  let currentQuantity = parseInt($quantity.val(), 10);
  if (!isNaN(currentQuantity)) {
      $quantity.val(currentQuantity + 1);
  }
}

// Giảm số lượng
function giam() {
  let $quantity = $('#quantity');
  let currentQuantity = parseInt($quantity.val(), 10);
  if (!isNaN(currentQuantity) && currentQuantity > 1) {
      $quantity.val(currentQuantity - 1);
  }
}

$(document).ready(function() {
  // Chọn màu sắc
  $('.color-option').on('click', function() {
      $('.color-option').removeClass('selected');
      $(this).addClass('selected');
      $('.delete-color').show();
  });

  // Xóa màu sắc đã chọn
  $('.delete-color').on('click', function() {
      $('.delete-color').hide();
      $('.color-option').removeClass('selected');
  });

  // Chọn ảnh sản phẩm
  $('.imgpro').on('click', function() {
      $('.imgpro').removeClass("active");
      $(this).addClass("active");
  });

  // Cập nhật giỏ hàng hiển thị
  function updateCartVisibility() {
      if ($('.cart-item').length === 0) {
          $('.cart-body').show(); 
          $('.cart-product').hide();
      } else {
          $('.cart-body').hide();
          $('.cart-product').show(); 
          $("#cartContainer").addClass("show");
          $("body").css("overflow", "hidden");
      }
  }

  // Thêm sản phẩm vào giỏ hàng
  $("#add_cart").on('click', function() {
      const Name = $('.product-title').text(); 
      const price = $('.product-price').text(); 
      const soluong = parseInt($('#quantity').val(), 10); 
      const img = $('#main-image').attr('src'); 
      
      const productHTML = `
          <div class="cart-item" id="cart-item">
              <img alt="Product image" height="60" src="${img}" width="60" />
              <div class="item-details">
                  <p>${Name}</p>
                  <p class="cart-price">${soluong} × ${price}</p>
              </div>
              <button class="clear-item" id="clear-item">
                  <i class="fas fa-times"></i>
              </button>
          </div>
      `;
      $("#item-product").append(productHTML);
      
      // Cập nhật tổng tiền
      let totalCart = 0;
      $('.cart-item').each(function() {
          const itemPriceText = $(this).find('.cart-price').text();
          const itemPrice = parseFloat(itemPriceText.split('×')[1].trim().replace('đ', '').replace(/,/g, ''));
          const itemQuantity = parseInt(itemPriceText.split('×')[0].trim(), 10);
          totalCart += itemPrice * itemQuantity;
      });

      $('.total').html(totalCart.toLocaleString() + 'đ');
      
      // Cập nhật giỏ hàng hiển thị
      updateCartVisibility();
  });

  // Xóa sản phẩm khỏi giỏ hàng
  $(document).on('click', '.clear-item', function() {
      $(this).closest('.cart-item').remove();
      
      let totalCart = 0;
      $('.cart-item').each(function() {
          const itemPriceText = $(this).find('.cart-price').text();
          const itemPrice = parseFloat(itemPriceText.split('×')[1].trim().replace('đ', '').replace(/,/g, ''));
          const itemQuantity = parseInt(itemPriceText.split('×')[0].trim(), 10);
          totalCart += itemPrice * itemQuantity;
      });

      $('.total').html(totalCart.toLocaleString() + 'đ');
      
      // Cập nhật giỏ hàng hiển thị
      updateCartVisibility();
  });
});
