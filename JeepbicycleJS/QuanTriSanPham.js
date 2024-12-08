
$(document).ready(function () {
    $.getJSON("../JeepBicycleJSON/products.json", function (data) {
      let allProducts = data;
      let tableContent = "";
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
      $('#product-table').append(newRow);
  
      $('form')[0].reset();
    });
  });
  