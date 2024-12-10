$(document).ready(function () {
  $.getJSON("/JeepBicycleJSON/people.json", function (data) {
    let allAccounts = data || [];
    function datataikhoan(accounts) {
      let content = "";
      accounts.forEach(function (account, index) {
        content += `
            <tr data-index="${index}">
              <td>${account.MaNguoiDung}</td>
              <td>${account.name}</td>
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

    function checkID(id) {
      return allAccounts.some(tk => tk.id === id);
    }

    function checkUsername(username) {
      return allAccounts.some(tk => tk.username === username);
    }

    function checkemail(email) {
      return allAccounts.some(tk => tk.email === email);
    }

    // Thêm tài khoản mới
    $('#addTaiKhoan').on('click', function (event) {
      event.preventDefault();

      const idTaiKhoan = $('#idTaiKhoan').val().trim();
      const name = $('#name').val().trim();
      const Username = $('#Username').val().trim();
      const Password = $('#Password').val().trim();
      const email = $('#email').val().trim();
      const role = $('#role').val().trim();

      if (!idTaiKhoan || !Username || !Password || !email || !role) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      if (checkID(idTaiKhoan)) {
        alert("Mã tài khoản đã tồn tại!");
        return;
      }
      if (checkUsername(Username)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
      }
      if (checkemail(email)) {
        alert("Email đã tồn tại!");
        return;
      }
      const newAccount = {
        MaNguoiDung: idTaiKhoan,
        name: name,
        username: Username,
        password: Password,
        email: email,
        role: role
      };
      allAccounts.push(newAccount);
      datataikhoan(allAccounts);

      $('#edit-form')[0].reset();
      $("#form-add").toggle();
    });
    // Xóa sản phẩm
    $(document).on('click', '.delete-taikhoan', function () {
      if (confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
        $(this).closest('tr').remove();
      }
    });

    // Sửa thông tin tài khoản
    $(document).on('click', '.update-taikhoan', function () {
      const index = $(this).closest('tr').data('index');
      const user = allAccounts[index];

      $('#idTaiKhoan').val(user.MaNguoiDung).prop('disabled', true);
      $('#name').val(user.name);
      $('#Username').val(user.username);
      $('#Password').val(user.password);
      $('#email').val(user.email);
      $('#role').val(user.role);
      
      $('#form-add').show();
      $('#addTaiKhoan').hide();
      $('#updateTaiKhoan').show().data('index', index);

    });

    $('#updateTaiKhoan').on('click', function (event) {
      event.preventDefault();
      const index = $(this).data('index');

      const id = $('#idTaiKhoan').val().trim();
      const name = $('#name').val().trim();
      const username = $('#Username').val();
      const password = $('#Password').val().trim();
      const email = $('#email').val().trim();
      const role = $('#role').val().trim();
      if (!name || !username || !password || !email || !role) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      const account = allAccounts[index];
      account.id = id;
      account.name = name;
      account.username = username;
      account.password = password;
      account.email = email;
      account.role = role;

      datataikhoan(allAccounts);

      $('#edit-form')[0].reset();
      $('#form-add').hide();
      $('#addTaiKhoan').show();
      $('#updateTaiKhoan').hide();
    });
  });
});
