$(document).ready(function () {
    $.getJSON('product.json', function (danhSachSanPham) {
        danhSachSanPham.forEach(function (sanPham) {
            let productHtml = `<div class="product">
                <h2>${sanPham.tenSanPham}</h2>
                <div class="color-options">`;

            let colorRed = false;

            sanPham.mauSac.forEach(function (mau) {
                productHtml += `<div class="color-option ${mau.tenMau === 'Đỏ' ? 'default' : ''}">
                    <h3>${mau.tenMau}</h3>
                    <div class="image-options">`;

                mau.hinhAnh.forEach(function (hinh) {
                    productHtml += `<img src="${hinh}" alt="${mau.tenMau}">`;
                });

                productHtml += `</div></div>`;

                if (mau.tenMau === 'Đỏ') {
                    colorRed = true;
                }
            });

            productHtml += `</div></div>`;

            $('#product-list').append(productHtml);

            // Nếu màu đỏ không có, hãy thêm vào đây
            if (!colorRed) {
                $('#product-list .color-option').first().addClass('default');
            }
        });

        // Thiết lập màu mặc định cho hình ảnh màu đỏ
        $('.color-option.default').first().find('img').first().show();
        $('.color-option.default').first().siblings().find('img').hide();
    });
});
