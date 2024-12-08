
$(document).ready(function () {
    $.getJSON("../JeepBicycleJSON/people.json", function (data) {
      let allAccounts = data;
      let tableContent = "";
      function datataikhoan(accounts) {
        let content = "";
        accounts.forEach(function (account) {
          content += `
              <tr>
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
    });
  
    //xóa dữ liệu tài khoản
    $(document).on('click', '.delete-taikhoan', function () {
      $(this).closest('tr').remove();
    });
  
    //thêm tài khoản
    $('#addTaiKhoan').on('click', function (event) {
      event.preventDefault();
  
      const idTaiKhoan = $('#idTaiKhoan').val();
      const name = $('#name').val();
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
          <td>${name}</td>
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