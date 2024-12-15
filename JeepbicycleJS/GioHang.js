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
  function hiengiohang() {
    if ($('.cart-item').length === 0) {
      $('.cart-body').show();
      $('.cart-product').hide();
    } else {
      $('.cart-body').hide();
      $('.cart-product').show();
    }
  }
  hiengiohang();

  // $(document).on('click', '#clear-product', function () {
  //   $(this).closest('tbody tr').remove();
  // });
  // Chuyển đến trang sản phẩm
  $('#btn-continue').click(function () {
    window.location.href = "SanPham.html";
  });

  // Chuyển đến trang thanh toán
  $('#btn-checkout').click(function () {
    window.location.href = "ThanhToan.html";
  });

  // Tăng số lượng sản phẩm
  $(document).on('click', '#tang', function () {
    let soluong = $(this).closest('.cart-item').find('#quantity');
    soluong.val(parseInt(soluong.val()) + 1);
  });

  // Giảm số lượng sản phẩm
  $(document).on('click', '#giam', function () {
    let soluong = $(this).closest('.cart-item').find('#quantity');
    if (parseInt(soluong.val()) > 1) {
      soluong.val(parseInt(soluong.val()) - 1);
    }
  });

  //tạm tính tiền sản phẩm
  // Tính giá mới của sản phẩm khi thay đổi số lượng
  function newprice() {
    let gia = parseFloat($(this).closest('.cart-item').find('#old-price').text().replace(/[^0-9]/g, ""));
    let soluong = parseInt($(this).closest('.cart-item').find('#quantity').val());
    let newprice = gia * soluong;
    $(this).closest('.cart-item').find('#new-price').text(newprice.toLocaleString() + "đ");
    return newprice;
  }
  newprice();
  $(document).on('change', '#quantity', newprice);
  $('.cart-item').each(function () {
    newprice.call(this);
  });

  function totalPrice() {
    let tongtien = 0;
    $('.cart-item').each(function () {
      let tamtinh = parseInt($(this).find('#new-price').text().replace(/[^0-9]/g, ""));
      tongtien += tamtinh;
    });
    return tongtien;
  }

  $('#price-detail').text(totalPrice().toLocaleString() + "đ");
  $('#total-price').text(totalPrice().toLocaleString() + "đ");

  // Cập nhật tổng tiền
  $("#update").click(function () {
    let tongtien = 0;
    let products = JSON.parse(localStorage.getItem('cart')) || [];

    $('.cart-item').each(function (index) {
      const quantityCart = parseInt($(this).find('#quantity').val());
      const priceCart = parseInt($(this).find('#old-price').text().replace(/[^0-9]/g, ""));
      const newTotal = priceCart * quantityCart;
      $(this).find('#new-price').text(newTotal.toLocaleString() + "đ");
      if (products[index]) {
        products[index].quantity = quantityCart;
      }
      tongtien += newTotal;
    });
    $('#total-price').text(tongtien.toLocaleString() + "đ");
    $('#price-detail').text(tongtien.toLocaleString() + "đ");
    localStorage.setItem('cart', JSON.stringify(products));
    alert("Giỏ hàng đã được cập nhật!");
  });

  // Áp dụng mã giảm giá
  $('#btn-apply').on('click', function () {
    const discount = parseFloat($('#discount-code').val());
    const total = parseInt($('#total-price').text().replace(/[^0-9]/g, ""));
    const newTotal = total - (total * discount / 100);
    $('#total-price').text(newTotal.toLocaleString() + "₫");
    $('#discount-code').val("");
  });
});

// xóa sản phẩm khỏi giỏ hàng

document.addEventListener("DOMContentLoaded", function () {
  const clearProduct = document.querySelectorAll(".clear-product");
  clearProduct.forEach((button) => {
    button.addEventListener("click", function () {
      const idProduct = parseInt(this.closest(".cart-item").dataset.id);
      const cartJs = JSON.parse(localStorage.getItem("cart")) || [];
      const index = cartJs.findIndex((i) => i.id === idProduct);
      cartJs.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartJs));
      location.reload();
    });
  });
});

// Lấy giỏ hàng từ localStorage
let cartJs = JSON.parse(localStorage.getItem("cart")) || [];
const productItem = document.getElementById("product-item");

cartJs.forEach((i) => {
  productItem.innerHTML += `              
    <tr class="cart-item"  data-id="${i.id}">
      <td>
        <div class="d-flex align-items-center">
          <button class="btn clear-product" id="clear-product">
            <i class="fas fa-times"> </i>
          </button>
          <img alt="Xe đạp địa hình JEEP MTB PS-41 - Phanh đĩa cơ, Bánh 26 inch - 2024 - Vàng chanh"
            height="100"
            src="${i.img}"
            width="100" />
          <span class="ml-3 title-product">
            ${i.Name}
          </span>
        </div>
      </td>
      <td class="price" id="old-price">${i.price}</td>
      <td>
        <div class="input-group">
          <button class="btn" id="giam">-</button>
          <input class="form-control text-center" type="text" id="quantity" value="${i.quantity}" />
          <button class="btn" id="tang">+</button>
        </div>
      </td>
      <td class="price" id="new-price"></td>
    </tr>`;
});
