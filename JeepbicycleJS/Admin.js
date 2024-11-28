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

  $(document).on("click", "#list-products", function () {
    $("#product-menu").toggle();
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

  $('#add-people').click(function () {
    $('#form-add').toggle();
    $('body').css('overflow', 'hidden');
  });

  $('#add-taikhoan').click(function () {
    $('#form-add').toggle();
    $('body').css('overflow', 'hidden');
  });

  $('#btn-close').click(function () {
    $('#form-add').toggle();
    $('body').css('overflow', 'auto');
  });
});

$(document).ready(function () {
  // Dữ liệu people
  $.getJSON("../JeepBicycleJSON/people.json", function (data) {
    let allPeople = data;
    let tableContent = "";
    
    function datapeople(peopleList) {
      let content = "";
      peopleList.forEach(function (people) {
        content += `
          <tr>
            <td>${people.MaNguoiDung}</td>
            <td>${people.name}</td>
            <td>${people.GioiTinh}</td>
            <td>${people.NgaySinh}</td>
            <td>${people.SoDienThoai}</td>
            <td>${people.email}</td>
            <td>${people.DiaChi}</td>
            <td><img src="${people.HinhAnhNguoiDung}" alt="people Image" class="people-img" /></td>
            <td>
              <button class="detail-people"><i class="fa-regular fa-file-lines"></i></button>
            </td>
            <td>
              <button class="update-people"><i class="fa-regular fa-pen-to-square"></i></button>
            </td>
            <td>
              <button class="delete-people"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>
        `;
      });
      $("#people-table").html(content);
    }

    // Hiển thị dữ liệu ban đầu
    datapeople(allPeople);

    // Hàm tìm kiếm người dùng
    function searchPeople(query) {
      query = query.toLowerCase();
      const filteredPeople = allPeople.filter((people) => {
        return (
          people.name.toLowerCase().includes(query) ||
          people.email.toLowerCase().includes(query) ||
          people.SoDienThoai.toLowerCase().includes(query) ||
          people.DiaChi.toLowerCase().includes(query)
        );
      });
      datapeople(filteredPeople);
    }

    // Xử lý sự kiện tìm kiếm
    $("#search-people").on("keyup", function () {
      const searchValue = $(this).val();
      searchPeople(searchValue);
    });

    $("#btn-searchPeople").on("click", function () {
      const searchValue = $("#search-people").val();
      searchPeople(searchValue);
    });
  });

  // Xóa người dùng
  $(document).on('click', '.delete-people', function () {
    $(this).closest('tr').remove();
  });

  // Thêm người dùng
  $('#addPeople').on('click', function (event) {
    event.preventDefault();

    const MaNguoiDung = $('#MaNguoiDung').val();
    const name = $('#name').val();
    const GioiTinh = $('#GioiTinh').val();
    const NgaySinh = $('#NgaySinh').val();
    const sdt = $('#sdt').val();
    const email = $('#email').val();
    const DiaChi = $('#DiaChi').val();
    const HinhAnhNguoiDung = $('#HinhAnhNguoiDung')[0].files[0];

    if (!MaNguoiDung || !name || !GioiTinh || !NgaySinh || !sdt || !email || !DiaChi || !HinhAnhNguoiDung) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const hinhAnhURL = URL.createObjectURL(HinhAnhNguoiDung);
    const newRow = `
      <tr>
        <td>${MaNguoiDung}</td>
        <td>${name}</td>
        <td>${GioiTinh}</td>
        <td>${NgaySinh}</td>
        <td>${sdt}</td>
        <td>${email}</td>
        <td>${DiaChi}</td>
        <td><img src="${hinhAnhURL}" alt="people Image" class="people-img" /></td>
        <td>
          <button class="detail-people"><i class="fa-regular fa-file-lines"></i></button>
        </td>
        <td>
          <button class="update-people"><i class="fa-regular fa-pen-to-square"></i></button>
        </td>
        <td>
          <button class="delete-people"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `;
    $('#people-table').append(newRow);

    $('form')[0].reset();
  });
});


$(document).ready(function () {
  $.getJSON("../JeepBicycleJSON/taikhoan.json", function (data) {
    let allAccounts = data;
    let tableContent = "";
    function datataikhoan(accounts) {
      let content = "";
      accounts.forEach(function (account) {
        content += `
            <tr>
              <td>${account.id}</td>
              <td>${account.username}</td>
              <td>${account.password}</td>
              <td>${account.email}</td>
              <td>${account.role}</td>
              <td>
                <button class="detail-taikhoan"><i class="fa-regular fa-file-lines"></i></button>
              </td>
              <td>
                <button class="update-taikhoan"><i class="fa-regular fa-pen-to-square"></i></button>
              </td>
              <td>
                <button class="delete-taikhoan"><i class="fa-solid fa-trash-can"></i></button>
              </td>
            </tr>
          `;
      });
      $("#taikhoan-table").html(content);
    }

    // Hiển thị dữ liệu ban đầu
    datataikhoan(allAccounts);

    // Hàm tìm kiếm tài khoản
    function searchTaiKhoan(query) {
      query = query.toLowerCase();
      const filteredAccounts = allAccounts.filter((account) => {
        return (
          account.username.toLowerCase().includes(query) ||
          account.email.toLowerCase().includes(query) ||
          account.role.toLowerCase().includes(query)
        );
      });
      datataikhoan(filteredAccounts);
    }

    // Xử lý sự kiện tìm kiếm
    $("#search-taikhoan").on("keyup", function () {
      const searchValue = $(this).val();
      searchTaiKhoan(searchValue);
    });

    $("#btn-searchtaikhoan").on("click", function () {
      const searchValue = $("#search-taikhoan").val();
      searchTaiKhoan(searchValue);
    });
  });

  //xóa dữ liệu tài khoản
  $(document).on('click', '.delete-taikhoan', function () {
    $(this).closest('tr').remove();
  });

  //thêm tài khoản
  $('#addTaiKhoan').on('click', function (event) {
    event.preventDefault();

    const idTaiKhoan = $('#idTaiKhoan').val();
    const Username = $('#Username').val();
    const Password = $('#Password').val();
    const email = $('#email').val();
    const role = $('#role').val();

    if (!idTaiKhoan || !Username || !Password || !email || !role) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const newRow = `
      <tr>
        <td>${idTaiKhoan}</td>
        <td>${Username}</td>
        <td>${Password}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td>
          <button class="detail-taikhoan"><i class="fa-regular fa-file-lines"></i></button>
        </td>
        <td>
          <button class="update-taikhoan"><i class="fa-regular fa-pen-to-square"></i></button>
        </td>
        <td>
          <button class="delete-taikhoan"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `;
    $('#taikhoan-table').append(newRow);

    $('form')[0].reset();
  });
});


$(document).ready(function () {
  $.getJSON("../JeepBicycleJSON/products.json", function (data) {
    let allProducts = data;
    let tableContent = "";

    // Hàm hiển thị dữ liệu ra bảng
    function dataproducts(products) {
      let content = "";
      products.forEach(function (product) {
        content += `
          <tr>
            <td>${product.id}</td>
            <td>${product.Name}</td>
            <td>${product.category}</td>
            <td>${product.Size}</td>
            <td>${product.newprice}</td>
            <td>1000</td>
            <td>${product.Color}</td>
            <td><img src="${product.img[0]}" alt="Product Image" class="product-img" /></td>
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
      });
      $("#product-table").html(content);
    }

    // Hiển thị dữ liệu ban đầu
    dataproducts(allProducts);

     // Hàm tìm kiếm sản phẩm
     function searchProducts(query) {
      query = query.toLowerCase();
      const filteredProducts = allProducts.filter((product) => {
        return (
          product.Name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      });
      dataproducts(filteredProducts);  
    }

    // Xử lý sự kiện khi người dùng nhập tìm kiếm
    $("#input-searchProducts").on("keyup", function () {
      const searchValue = $(this).val();
      searchProducts(searchValue); 
    });

    // Xử lý sự kiện khi người dùng nhấn nút tìm kiếm
    $("#btn-searchProducts").on("click", function () {
      const searchValue = $("#input-searchProducts").val();
      searchProducts(searchValue);  
    });
  });


  //xóa dữ liệu sản phẩm
  $(document).on('click', '.delete-product', function () {
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

    $('form')[0].reset();
  });
});
