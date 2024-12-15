$(document).ready(function () {
  var dangnhap = sessionStorage.getItem("name");
  if (dangnhap == null) {
    $("#dn").html('<button class="btn login-btn" id="login_btn">Đăng nhập</button>');
  } else {
    $("#dn").html(`
      <div class="dropdown ">
        <button class="btn btn-account" type="button" id="btn-account">
          ${dangnhap}
        </button>
        <div class="logout" id="logout">
          <ul>
            <li>
            <button>Hồ sơ tài khoản</button>
            </li>
            <li>
              <button class="logout-btn" id="logout_btn">Đăng xuất</button>
            </li>
          </ul
        </div>
      </div>
    `);
  }

  // Khi click vào tên tài khoản
  $(document).on('click', '#btn-account', function () {
    $('#logout').toggle();
  });

  // Khi nhấn nút đăng nhập
  $(document).on("click", "#login_btn", function () {
    window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/DangNhap.html";
  });

  // Khi nhấn nút đăng xuất
  $(document).on("click", "#logout_btn", function () {
    sessionStorage.removeItem("name");
    location.reload();
  });

  $('#img-ADVENTURE').hover(
    function () {
      $('#ADVENTURE').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu13.jpg');
    },
    function () {
      $('#ADVENTURE').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu12.jpg');
    });

  $('#img-FREEDOM').hover(
    function () {
      $('#FREEDOM').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu15.jpg');
    },
    function () {
      $('#FREEDOM').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu14.jpg');
    }
  );
  $('#img-PASSION').hover(
    function () {
      $('#PASSION').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu17.jpg');
    },
    function () {
      $('#PASSION').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu16.jpg');
    }
  );
  $('#img-AUTHENTICITY').hover(
    function () {
      $('#AUTHENTICITY').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu19.jpg');
    },
    function () {
      $('#AUTHENTICITY').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu18.jpg');
    }
  );
  $('#next-giohang').click(function () {
    window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/GioHang.html";
  });

  $('#pay').click(function () {
    window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/ThanhToan.html";
  });

  $('.product-card').click(function () {
    window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/SanPham.html";
  });

  $('#btnGuiThongTin').click(function (event) {
    event.preventDefault();

    const name = $('#name').val().trim();
    const phone = $('#phonenumber').val().trim();
    const select = $('#selectProducts').val();
    const content = $('#content').val().trim();

    const phoneRegex = /^0\d{9,10}$/;
    if (name === "" || phone === "" || select === "Bạn chọn dòng xe nào" || content === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ! Vui lòng nhập số có 10 chữ số, bắt đầu bằng số 0.");
      return;
    }
    alert("Gửi thông tin thành công!");
    $('#form')[0].reset();
  });

  // $('.dropdown-item').on('click',function(){
  //   const checkProducts = $(this).text().trim();
  //   localStorage.setItem('check', checkProducts);
  //   window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/SanPham.html";
  // });
});

function Categorys() {
  $.getJSON('/JeepBicycleJSON/categorys.json', function (data) {
    data.forEach(function (item) {
      $('#categorys').append(`<li class="dropdown-item">${item.name}</li>`);
    });
  });
}
Categorys();



