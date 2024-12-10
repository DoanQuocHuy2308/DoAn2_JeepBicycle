$(document).ready(function () {
  $.getJSON("../JeepBicycleJSON/people.json", function (data) {
    let allPeople = data || [];

    function datapeople(peopleList) {
      let content = "";
      peopleList.forEach(function (people, index) {
        content += `
          <tr data-index="${index}">
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

    function checkID(id) {
      return allPeople.some(person => person.MaNguoiDung === id);
    }
    function checksdt(sdt) {
      return allPeople.some(person => person.SoDienThoai === sdt);
    }
    function checkemail(email) {
      return allPeople.some(person => person.email === email);
    }

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

    // Xử lý sự kiện thêm người dùng mới
    $('#addPeople').on('click', function (event) {
      event.preventDefault();

      const MaNguoiDung = $('#MaNguoiDung').val().trim();
      const name = $('#name').val().trim();
      const GioiTinh = $('#GioiTinh').val().trim();
      const NgaySinh = $('#NgaySinh').val();
      const sdt = $('#sdt').val().trim();
      const email = $('#email').val().trim();
      const DiaChi = $('#DiaChi').val().trim();
      const HinhAnhNguoiDung = $('#image')[0].files[0];

      if (!MaNguoiDung || !name || !GioiTinh || !NgaySinh || !sdt || !email || !DiaChi) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      if (checkID(MaNguoiDung)) {
        alert("Mã người dùng đã tồn tại!");
        return;
      }
      if (checksdt(sdt)) {
        alert("SĐT người dùng đã tồn tại!");
        return;
      }
      if (checkemail(email)) {
        alert("Email người dùng đã tồn tại!");
        return;
      }

      const imgURL = URL.createObjectURL(HinhAnhNguoiDung);
      const newPerson = {
        MaNguoiDung,
        name,
        GioiTinh,
        NgaySinh,
        SoDienThoai: sdt,
        email,
        DiaChi,
        HinhAnhNguoiDung: [imgURL],
      };

      allPeople.push(newPerson);
      datapeople(allPeople);

      $('#edit-form')[0].reset();
      $('#current-image').attr('src', '').hide();
      $("#form-add").toggle();
    });

    //sửa thông tin người dùng
    $(document).on('click', '.update-people', function () {
      const index = $(this).closest('tr').data('index');
      const people = allPeople[index];

      $('#MaNguoiDung').val(people.MaNguoiDung).prop('disabled', true);;
      $('#name').val(people.name);
      $('#GioiTinh').val(people.GioiTinh);
      $('#NgaySinh').val(people.NgaySinh);
      $('#sdt').val(people.SoDienThoai);
      $('#email').val(people.email);
      $('#DiaChi').val(people.DiaChi);
      $('#current-image').attr('src', people.HinhAnhNguoiDung || '').show();

      $('#form-add').show();
      $('#addPeople').hide();
      $('#updatePeople').show().data('index', index);
    });

    $('#updatePeople').on('click', function (event) {
      event.preventDefault();

      const index = $(this).data('index');

      const name = $('#name').val().trim();
      const GioiTinh = $('#GioiTinh').val().trim();
      const NgaySinh = $('#NgaySinh').val();
      const sdt = $('#sdt').val().trim();
      const email = $('#email').val().trim();
      const DiaChi = $('#DiaChi').val().trim();
      const HinhAnhNguoiDung = $('#image')[0].files[0];

      if (!name || !GioiTinh || !NgaySinh || !sdt || !email || !DiaChi) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      
      const user = allPeople[index];
      user.name = name;
      user.GioiTinh = GioiTinh;
      user.NgaySinh = NgaySinh;
      user.SoDienThoai = sdt;
      user.email = email;
      user.DiaChi = DiaChi;

      if (HinhAnhNguoiDung) {
        user.HinhAnhNguoiDung = URL.createObjectURL(HinhAnhNguoiDung);
      }

      datapeople(allPeople);

      $('#edit-form')[0].reset();
      $('#current-image').hide();
      $('#form-add').hide();
      $('#addPeople').show();
      $('#updatePeople').hide();
    });
  });
  // Xóa người dùng
  $(document).on('click', '#delete-people', function () {
    $(this).closest('tr').remove();
  });
  // Hiển thị ảnh khi chọn file
  $('#image').on('change', function () {
    const file = this.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      $('#current-image').attr('src', imageURL).show();
    } else {
      $('#current-image').hide();
    }
  });

  // Reset form
  $('#resetPeople').click(function () {
    $('#edit-form')[0].reset();
    $('#current-image').attr('src', '').hide();
    $('#addPeople').show();
    $('#updatePeople').hide();
    $('#form-add').hide();
  });
});
