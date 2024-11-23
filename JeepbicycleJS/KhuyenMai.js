$(document).ready(function () {
    var arrayID = [1, 5, 9, 15, 21, 27, 33, 39, 45, 48, 53, 57, 60, 64, 70, 76, 82];
    
    $.getJSON("../JeepBicycleJSON/products.json", function (data) {
        var findProducts = data.filter(function (product) {
            return arrayID.includes(product.id) && product.KhuyenMai == "Khuyến Mại";
        });
        var rows = [];
        for (var i = 0; i < findProducts.length; i += 3) {
            rows.push(findProducts.slice(i, i + 3));
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
                                    <p class="promotion">${product.KhuyenMai}</p>
                                    <p class="product-title">
                                      ${product.Name}
                                    </p>
                                    <p>
                                        <span class="old-price">${product.oldprice}</span>
                                        <span class="new-price">${product.newprice}</span>
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
    });
});
