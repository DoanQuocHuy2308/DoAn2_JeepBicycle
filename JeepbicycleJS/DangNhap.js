$(document).ready(function () {
  $.getJSON("../JeepBicycleJSON/people.json", function (accounts) {
    $("#DangNhap").on("submit", function (event) {
      event.preventDefault();
      const username = $("#username").val();
      const password = $("#password").val();
      const account = accounts.find(
        (x) => x.username === username && x.password === password
      );

      if (account) {
        sessionStorage.setItem("name", account.name);
        localStorage.setItem("id", account.MaNguoiDung);
        if (account.role === "admin") {
          window.location.href =
            "http://127.0.0.1:5500/JeepBicycleHTML/Dashboard.html";
        } else if (account.role === "user") {
          window.location.href = "http://127.0.0.1:5500/index.html";
        }
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    });
  });
});

$(document).ready(function () {
  const $password = $("#password");
  const $showPassword = $("#showpassword");

  $showPassword.on("click", function () {
    if ($password.attr("type") === "password") {
      $password.attr("type", "text");
      $showPassword.html('<i class="fa-regular fa-eye-slash"></i>');
      $password.css("border-radius", "10px 0 0 10px");
    } else {
      $password.attr("type", "password");
      $showPassword.html('<i class="fa-regular fa-eye"></i>');
    }
  });
});
