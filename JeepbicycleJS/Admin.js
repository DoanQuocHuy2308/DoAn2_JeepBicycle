$(document).ready(function () {
  var dangnhap = sessionStorage.getItem("username");
  if (dangnhap == null) {
    $("#dn").html(
      '<button class="btn btn-account" type="button" id="btn-account"> Khách </button>'
    );
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
  $(document).on("click", "#btn-account", function () {
    $("#logout").toggle();
  });

  $(document).on("click", "#logout_btn", function () {
    window.location.href =
      "http://127.0.0.1:5500/JeepBicycleHTML/DangNhap.html";
  });

  $(document).on("click", "#list-product", function () {
    $("#product-menu").toggle();
  });

  $(document).on("click", "#list-person", function () {
    $("#person-menu").toggle();
  });
});

// ----------------------------------------------
$(document).ready(function () {
  const ctx = $("#chart")[0].getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
      ],
      datasets: [
        {
          label: "Số lượng bán",
          data: [12, 19, 30, 25, 23, 10, 20],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(199, 199, 199, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(199, 199, 199, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

$(document).ready(function () {
  $('#add-product').click(function () {
    $('#form-add').toggle();
    $('body').css('overflow', 'hidden');
  });
});

$(document).ready(function () {
  $('#btn-close').click(function () {
    $('#form-add').toggle();
    $('body').css('overflow', 'auto');
  });
});

$(document).ready(function () {
  // Xóa sản phẩm khi nhấn nút "Xóa"
  $(document).on('click', '.delete-product', function () {
    // Xóa dòng sản phẩm chứa nút "Xóa" vừa nhấn
    $(this).closest('tr').remove();
  });

  // Thêm sản phẩm mới vào bảng
  $('#add').on('click', function (event) {
    event.preventDefault();

    const maSanPham = $('#MaSanPham').val();
    const tenSanPham = $('#TenSanPham').val();
    const mauSanPham = $('#MauSanPham').val();
    const sizeSanPham = $('#SizeSanPham').val();
    const donGiaSanPham = $('#DonGiaSanPham').val();
    const soLuongSanPham = $('#SoLuongSanPham').val();
    const hinhAnhSanPham = $('#HinhAnhSanPham')[0].files[0];

    if (!maSanPham || !tenSanPham || !mauSanPham || !sizeSanPham || !donGiaSanPham || !soLuongSanPham || !hinhAnhSanPham) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Tạo URL cho hình ảnh
    const hinhAnhURL = URL.createObjectURL(hinhAnhSanPham);

    // Tạo một dòng mới cho sản phẩm
    const newRow = `
      <tr>
        <td>${maSanPham}</td>
        <td>${tenSanPham}</td>
        <td>${mauSanPham}</td>
        <td>${sizeSanPham}</td>
        <td>${donGiaSanPham}</td>
        <td>${soLuongSanPham}</td>
        <td>${mauSanPham}</td>
        <td><img src="${hinhAnhURL}" alt="Product Image" class="product-img" /></td>
        <td>
          <button class="detail-product"><i class="fa-regular fa-file-lines"></i></button>
        </td>
        <td>
          <button class="update-product"><i class="fa-regular fa-pen-to-square"></i></button>
        </td>
        <td>
          <button class="delete-product"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `;

    // Thêm dòng mới vào bảng
    $('#product-table').append(newRow);

    // Reset form sau khi thêm
    $('form')[0].reset();
  });
});
