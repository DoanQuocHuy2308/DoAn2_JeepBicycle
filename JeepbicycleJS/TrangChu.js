$(document).ready(function(){
  var dangnhap = sessionStorage.getItem("username");
  if (dangnhap == null) {
    $("#dn").html('<button class="btn login-btn" id="login_btn">Đăng nhập</button>');
  } else {
    $("#dn").html(`
      <div class="dropdown ">
        <button class="btn btn-account" type="button" id="btn-account">
          ${dangnhap}
        </button>
        <div class="logout" id="logout">
          <button class="logout-btn" id="logout_btn">Đăng xuất</button>
        </div>
      </div>
    `);
  }

  // Khi click vào tên tài khoản
  $(document).on('click', '#btn-account', function() {
    $('#logout').toggle();
});

  // Khi nhấn nút đăng nhập
  $(document).on("click", "#login_btn", function(){
    window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/DangNhap.html";
  });

  // Khi nhấn nút đăng xuất
  $(document).on("click", "#logout_btn", function(){
    sessionStorage.removeItem("username");
    location.reload();
  });
});

// -----------------------hover ảnh ------------------------------------------
$(document).ready(function() {
  $('.image-container').hover(
      function() {
          $('#ADVENTURE').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu13.jpg');
      },
      function() {
          $('#ADVENTURE').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu12.jpg'); 
      }
  );
});
$(document).ready(function() {
  $('.image-container').hover(
      function() {
          $('#FREEDOM').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu15.jpg'); 
      },
      function() {
          $('#FREEDOM').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu14.jpg'); 
      }
  );
});
$(document).ready(function() {
  $('.image-container').hover(
      function() {
          $('#PASSION').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu17.jpg');
      },
      function() {
          $('#PASSION').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu16.jpg');
      }
  );
});
$(document).ready(function() {
  $('.image-container').hover(
      function() {
          $('#AUTHENTICITY').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu19.jpg');
      },
      function() {
          $('#AUTHENTICITY').attr('src', 'ImageJeepBicycle/TrangChu/TrangChu18.jpg'); 
      }
  );
});

$(document).ready(function() {
  $('#next-giohang').click(function() {
    window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/GioHang.html";
  });
});

$(document).ready(function() {
  $('#pay').click(function() {
    window.location.href = "http://127.0.0.1:5500/JeepBicycleHTML/ThanhToan.html";
  });
});

$(document).ready(function() {
    
});