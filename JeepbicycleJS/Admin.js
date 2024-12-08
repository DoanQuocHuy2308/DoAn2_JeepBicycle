$(document).ready(function () {
  var dangnhap = sessionStorage.getItem("name");
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

  $.getJSON("/JeepBicycleJSON/people.json", function (peoples) {
    var id = localStorage.getItem('id');
    var person = peoples.find(function (people) {
      return people.MaNguoiDung === id;
  });
  var idImage = person ? person.HinhAnhNguoiDung : null;

  if (idImage) {
      $('#img').attr('src', idImage);
  
  } else {
      console.log("Không tìm thấy đối tượng với ID:", id);
  }
  });
});
// ---------------------------------------------------
//people
var gioitinh = ["Nam", "Nữ", "Khác"];
var tile = [40, 55, 5,];
var barColors = ["red", "pink", "blue"];

new Chart("people", {
  type: "bar",
  data: {
    labels: gioitinh,
    datasets: [{
      label: "Nhân Viên",
      backgroundColor: barColors,
      data: tile
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "gray",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "gray",
        },
      },
    },
  },
});

//products

const soluong = [50, 60, 70];
const tileproduct = [7, 8, 10, 12];

new Chart("products", {
  type: "line",
  data: {
    labels: soluong,
    datasets: [{
      label: "Sản Phẩm",
      fill: false,
      lineTension: 0,
      backgroundColor: "green",
      borderColor: "white",
      data: tileproduct
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "gray",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "gray",
        },
      },
    },
  },
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
            "aqua",
            "yellow",
            "aqua",
            "yellow",
            "aqua",
            "yellow",
            "aqua",
          ],
          borderColor: [
            "aqua",
            "yellow",
            "aqua",
            "yellow",
            "aqua",
            "yellow",
            "aqua",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "gray",
          },
        },
        y: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "gray",
          },
        },
      },
    },
  });

  const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
  const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

  new Chart("sododuong", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: "thời lượng truy cập web",
        fill: false,
        lineTension: 0,
        backgroundColor: "red",
        borderColor: "white",
        data: yValues
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "gray",
          },
        },
        y: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "gray",
          },
        },
      },
    }
  });
});

