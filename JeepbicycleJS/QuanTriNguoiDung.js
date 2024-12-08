$(document).ready(function () {
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
                <button class="detail-people" id="detail-people"><i class="fa-regular fa-file-lines"></i></button>
              </td>
              <td>
                <button class="update-people" id="update-people"><i class="fa-regular fa-pen-to-square"></i></button>
              </td>
              <td>
                <button class="delete-people" id="delete-people"><i class="fa-solid fa-trash-can"></i></button>
              </td>
            </tr>
          `;
        });
        $("#people-table").html(content);
      }
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
    $(document).on('click', '#delete-people', function () {
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
            <button class="detail-people" id="detail-people"><i class="fa-regular fa-file-lines"></i></button>
          </td>
          <td>
            <button class="update-people" id="update-people"><i class="fa-regular fa-pen-to-square"></i></button>
          </td>
          <td>
            <button class="delete-people" id="delete-people"><i class="fa-solid fa-trash-can"></i></button>
          </td>
        </tr>
      `;
      $('#people-table').append(newRow);
  
      $('form')[0].reset();
    });
  
    $(document).on('click', '.update-people', function () {
      var row = $(this).closest('tr');
    
      var id=row.find('td:first-child').text().trim();
      var name = row.find('td:nth-child(2)').text().trim();
      var GioiTinh = row.find('td:nth-child(3)').text().trim();
      var NgaySinh = row.find('td:nth-child(4)').text().trim();
      var sdt = row.find('td:nth-child(5)').text().trim();
      var email = row.find('td:nth-child(6)').text().trim();
      var DiaChi = row.find('td:nth-child(7)').text().trim();
      var HinhAnhNguoiDung = row.find('.people-img').attr('src');
    
      $('#MaNguoiDung').val(id);
      $('#name').val(name);
      $('#GioiTinh').val(GioiTinh);
      $('#NgaySinh').val(NgaySinh);
      $('#sdt').val(sdt);
      $('#email').val(email);
      $('#DiaChi').val(DiaChi);
      $('#HinhAnhNguoiDung').attr('src', HinhAnhNguoiDung);
    
      $('#form-add').data('currentRow', row);
      $('#form-add').toggle();
    });
  
    $(document).on('change', '#HinhAnhNguoiDung', function () {
      var file = this.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#people-img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  
    function showToast(message, type = 'error') {
      const container = document.getElementById('toast-container');
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
  
      if (type === 'success') {
          toast.style.backgroundColor = '#4CAF50'; 
      } else if (type === 'warning') {
          toast.style.backgroundColor = '#FFC107'; 
      } 
      container.appendChild(toast);
  
      setTimeout(() => {
          toast.remove();
      }, 4000);
  }
  
    $(document).on('click', '#addPeople', function () {
      var currentRow = $('#form-add').data('currentRow');
    
      if (!currentRow) {
        showToast('Không tìm thấy dòng để cập nhật.');
        return;
    }  
    
      // Lấy giá trị từ input
      var newid = $('#MaNguoiDung').val();
      var newName = $('#name').val();
      var newGioiTinh = $('#GioiTinh').val();
      var newNgaySinh = $('#NgaySinh').val();
      var newPhone = $('#phone').val();
      var newEmail = $('#email').val();
      var newAddress = $('#DiaChi').val();
      var newImageSrc = $('#HinhAnhNguoiDung').attr('src');
    
      // Cập nhật giá trị trong dòng
      currentRow.find('td:first-child').text(newid);
      currentRow.find('td:nth-child(2)').text(newName);
      currentRow.find('td:nth-child(3)').text(newGioiTinh);
      currentRow.find('td:nth-child(4)').text(newNgaySinh);
      currentRow.find('td:nth-child(5)').text(newPhone);
      currentRow.find('td:nth-child(6)').text(newEmail);
      currentRow.find('td:nth-child(7)').text(newAddress);
      currentRow.find('.people-img').attr('src', newImageSrc);
    
      $('#form-add').removeData('currentRow');
    
      showToast('cập nhật thành công');
      $('#form-add').toggle();
    });
    
  });