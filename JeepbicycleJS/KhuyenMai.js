$(document).ready(function () {
    var arrayID = [1, 5, 9, 15, 21, 27, 33, 39, 45, 48, 53, 57, 60, 64, 70, 76, 82];

    $.getJSON("../JeepBicycleJSON/products.json", function (data) {
        function displayProducts(products) {
            $('#product-discount').empty();
            var rows = [];
            for (var i = 0; i < products.length; i += 3) {
                rows.push(products.slice(i, i + 3));
            }
            rows.forEach(function (row) {
                var rowDiv = $('<div class="row"></div>');
                row.forEach(function (product) {
                    var productHtml = `
                    <div class="col-md-4 d-flex">
                        <div class="card w-100">
                            <a href="http://127.0.0.1:5500/JeepBicycleHTML/ChiTietSanPham.html?id=${product.id}">
                                <div class="position-relative image-container">
                                    <span class="discount-badge">${product.TriGiaKM}</span>
                                    <img alt="Image of JEEP METEOR bicycle" class="card-img-top" height="270" src="${product.img[0]}" width="300" id="img" />
                                </div>
                                <div class="card-body text-center">
                                    <p class="promotion">${product.KhuyenMai || ""}</p>
                                    <p class="product-title">
                                        ${product.Name || "Sản phẩm chưa có tên"}
                                    </p>
                                    <p>
                                        <span class="old-price">${product.oldprice || ""}</span>
                                        <span class="new-price">${product.newprice || ""}</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
                    rowDiv.append(productHtml);
                });
                $('#product-discount').append(rowDiv);
            });
        }

        //đổi tiền
        function doitien(priceString) {
            var cleanString = priceString.replace(/[^0-9]/g, "");
            var number = parseFloat(cleanString);
            return isNaN(number) ? 0 : number;
        }
        

        var Products = data.filter(function (product) {
            return arrayID.includes(product.id) && product.TriGiaKM != "0";
        });
        displayProducts(Products);

        // Tìm kiếm sản phẩm (ngay lập tức khi gõ)
        $('#searchProducts').on('keyup', function () {
            var searchValue = $(this).val().toLowerCase();
            var filteredProducts = data.filter(function (product) {
                return (
                    arrayID.includes(product.id) &&
                    product.Name &&
                    product.Name.toLowerCase().includes(searchValue)
                );
            });
            displayProducts(filteredProducts);
        });

        // Lọc sản phẩm theo giá
        $('#filterProducts').on('change', function () {
            var sortType = $(this).val();
            let sortProducts = [...Products]; 
            if (sortType === 'Thứ tự theo giá: thấp đến cao') {
                sortProducts.sort(function(a, b) {
                    return doitien(a.newprice) - doitien(b.newprice); 
                });
            }
            else if (sortType === 'Thứ tự theo giá: cao xuống thấp') {
                sortProducts.sort(function(a, b) {
                    return doitien(b.newprice) - doitien(a.newprice);
                });
            }
            displayProducts(sortProducts);
        });
    });
});
