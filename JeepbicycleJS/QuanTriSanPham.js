$(document).ready(function () {
  $.getJSON("../JeepBicycleJSON/products.json", function (data) {
    let allProducts = data || [];
    function dataproducts(products) {
      let content = "";
      products.forEach(function (product, index) {
        content += `
          <tr data-index="${index}">
            <td>${product.id}</td>
            <td>${product.Name}</td>
            <td>${product.category}</td>
            <td>${product.Size}</td>
            <td>${product.newprice}</td>
            <td>${product.quantity}</td>
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

    function checkID(id) {
      return allProducts.some(product => product.id === id);
    }

    function checkName(name) {
      return allProducts.some(product => product.Name.toLowerCase() === name.toLowerCase());
    }

    // Thêm sản phẩm mới
    $('#add').on('click', function (event) {
      event.preventDefault();

      const id = $('#MaSanPham').val().trim();
      const name = $('#TenSanPham').val().trim();
      const category = $('#MauSanPham').val().trim();
      const color = $('#Color').val().trim();
      const size = $('#SizeSanPham').val().trim();
      const price = $('#DonGiaSanPham').val().trim();
      const quantity = $('#SoLuongSanPham').val().trim();
      const imgproduct = $('#image')[0].files[0];

      if (!id || !name || !category || !color || !size || !price || !quantity || !imgproduct) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      if (checkID(id)) {
        alert("Mã sản phẩm đã tồn tại!");
        return;
      }

      if (checkName(name)) {
        alert("Tên sản phẩm đã tồn tại!");
        return;
      }

      const imgURL = URL.createObjectURL(imgproduct);

      const newProduct = {
        id,
        Name: name,
        category,
        Color: color,
        Size: size,
        newprice: price,
        quantity,
        img: [imgURL],
      };

      allProducts.push(newProduct);
      dataproducts(allProducts);

      $('#edit-form')[0].reset();
      $('#current-image').attr('src', '');
      $("#form-add").toggle();
    });

    // Sửa sản phẩm
    $(document).on('click', '.update-product', function () {
      const index = $(this).closest('tr').data('index');
      const product = allProducts[index];

      $('#MaSanPham').val(product.id).prop('disabled', true);
      $('#TenSanPham').val(product.Name);
      $('#MauSanPham').val(product.category);
      $('#Color').val(product.Color);
      $('#SizeSanPham').val(product.Size);
      $('#DonGiaSanPham').val(product.newprice);
      $('#SoLuongSanPham').val(product.quantity);
      $('#current-image').attr('src', product.img[0] || '').show();

      $('#form-add').show();
      $('#add').hide();
      $('#update').show().data('index', index);
    });

    $('#update').on('click', function (event) {
      event.preventDefault();

      const index = $(this).data('index');

      const name = $('#TenSanPham').val().trim();
      const category = $('#MauSanPham').val().trim();
      const color = $('#Color').val().trim();
      const size = $('#SizeSanPham').val().trim();
      const price = $('#DonGiaSanPham').val().trim();
      const quantity = $('#SoLuongSanPham').val().trim();
      const imgproduct = $('#image')[0].files[0];

      if (!name || !category || !color || !size || !price || !quantity) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      const updatedProduct = allProducts[index];
      updatedProduct.Name = name;
      updatedProduct.category = category;
      updatedProduct.Color = color;
      updatedProduct.Size = size;
      updatedProduct.newprice = price;
      updatedProduct.quantity = quantity;

      if (imgproduct) {
        updatedProduct.img[0] = URL.createObjectURL(imgproduct);
      }

      dataproducts(allProducts);

      $('#edit-form')[0].reset();
      $('#current-image').hide();
      $('#form-add').hide();
      $('#add').show();
      $('#update').hide();
    });

    // Xóa sản phẩm
    $(document).on('click', '.delete-product', function () {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        $(this).closest('tr').remove();
      }
    });
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
  $('#resetproducts').click(function () {
    $('#edit-form')[0].reset();
    $('#current-image').attr('src', '').hide();
    $('#add').show();
    $('#update').hide();
    $('#form-add').hide();
  });
});
