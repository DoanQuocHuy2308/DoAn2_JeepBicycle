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

$(document).ready(function() {
    $('.color-option').on('click', function() {
        $('.color-option').removeClass('selected');
        $(this).addClass('selected');
        $('.delete-color').show();
    });

    $('.delete-color').on('click', function() {
        $('.delete-color').hide();
        $('.color-option').removeClass('selected');
    });
});

$(document).ready(function(){
    $('.imgpro').on('click', function() {
        $('.imgpro').removeClass("active");
        $(this).addClass("active");
    });
});


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

$(document).ready(function(){
  $("#add_cart").on('click', function(){
    const Name = $('.product-title').text(); 
    const price = $('.product-price').text(); 
    const soluong = parseInt($('#quantity').val(), 10); 
    const img = $('#main-image').attr('src'); 
    const doitienprice = parseFloat(price.replace('đ', '').replace(/,/g, '').trim());
    const totalPrice = doitienprice * soluong;
    const productHTML = `
      <div class="cart-item" id="cart-item">
        <img
          alt="Image of a mountain bike"
          height="60"
          src="${img}"
          width="60"
        />
        <div class="item-details">
          <p>${Name}</p>
          <p class="cart-price">${soluong} × ${price}</p>
        </div>
        <button class="clear-item"  id="clear-item">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    $("#item-product").append(productHTML);
    $('.total').html(totalPrice.toLocaleString() + 'đ');
    updateCartVisibility();
  });
});

  