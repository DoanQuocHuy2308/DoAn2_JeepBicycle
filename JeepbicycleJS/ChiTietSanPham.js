function tang() {
    const soluong = $('#quantity'); 
    let soluonghientai = parseInt(soluong.val(), 10);
    soluonghientai = isNaN(soluonghientai) || soluonghientai < 1 ? 1 : soluonghientai;
    soluong.val(soluonghientai + 1); 
}
function giam() {
    const soluong = $('#quantity'); 
    let soluonghientai = parseInt(soluong.val(), 10); 
    soluonghientai = isNaN(soluonghientai) || soluonghientai <= 1 ? 1 : soluonghientai; 
    soluong.val(soluonghientai - 1); 
}

function getID(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function updateCartTotal() {
    let total = 0; 
    $('.cart-item').each(function () { 
        const priceText = $(this).find('.cart-price').text();
        const [quantity, price] = priceText.split('×').map(item => item.trim()); 
        const itemTotal = parseInt(quantity, 10) * parseFloat(price.replace(/[^0-9]/g, "")); 
        total += itemTotal; 
    });
    $('.total').text(total.toLocaleString() + 'đ');
}

function hiengiohang() {
    if ($('.cart-item').length === 0) {
        $('.cart-body').show();
        $('.cart-product').hide();
    } else {
        $('.cart-body').hide();
        $('.cart-product').show();
    }
}

function soluonggiohang() {
    const soluong = $('.cart-item').length;
    $('#soluongthem').text(soluong);
}

function displayProductDetails(product) {
    const contentProducts = `
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li class="breadcrumb-item"><a href="#">${product.category}</a></li>
            </ol>
        </nav>
        <h1 class="product-title">${product.Name}</h1>
        <p class="product-old-price">${product.oldprice}</p>
        <p class="product-price">${product.newprice}</p>
        <p>Đơn giá chưa bao gồm thuế GTGT, Phí vận chuyển</p>
        <ul class="product-details">
            <li><strong>Mẫu xe:</strong> ${product.MauXe}</li>
            <li><strong>Trọng tải:</strong> ${product.TrongTai}</li>
            <li><strong>Chất liệu:</strong> ${product.ChatLieu}</li>
            <li><strong>Tay đề số:</strong> ${product.TayDeSo}</li>
            <li><strong>Kích cỡ lốp:</strong> ${product.KichCoLop}</li>
            <li><strong>Size:</strong> ${product.Size}</li>
            <li><strong>Cân nặng:</strong> ${product.CanNang}</li>
            <li><strong>Phù hợp:</strong> ${product.PhuHop}</li>
        </ul>
        <div class="function-color d-flex justify-content-between">
            <div class="color d-flex">
                <strong class="mr-3">Màu sắc: </strong>
                <div class="color-options mb-3" id="colors"></div>
            </div>
            <button class="delete-color" style="display: none" onclick="imgColor(${product.id})">Xóa</button>
        </div>
        <div class="quantity-control mb-3 d-flex">
            <form class="quantity-form">
                <button type="button" class="btn btn-outline-secondary" onclick="giam()">-</button>
                <input type="text" id="quantity" value="1" />
                <button type="button" class="btn btn-outline-secondary" onclick="tang()">+</button>
            </form>
            <button class="btn add ml-2" id="add_cart">Thêm vào giỏ hàng</button>
        </div>
        <div class="social-icons mt-3">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-tiktok"></i></a>
            <a href="#"><i class="fas fa-envelope"></i></a>
            <a href="#"><i class="fas fa-phone"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
    `;
    $('#details').append(contentProducts);
}

function displayProductColors(product) {
    const colors = $('#colors');
    if (product.Color && product.Color.length > 0) {
        product.Color.forEach((colorItem, index) => {
                colors.append(`
                    <div class="color-option" style="background-color:${colorItem.color}" onclick="imgColor(${colorItem.id})"></div>
                `);
        });
    } else {
        colors.append('<p>Không có màu sắc nào.</p>');
    }
}

function chooseColor() {
    $(document).on('click', '.color-option', function () {
        $('.color-option').removeClass('selected');
        $(this).addClass('selected');
        $('.delete-color').show();
    });
}

function deleteColor() {
    $('.delete-color').on('click', function () {
        $('.color-option').removeClass('selected');
        $(this).hide();
    });
}

function addCart() {
    $('#add_cart').on('click', function () {
        const Name = $('.product-title').text();
        const price = $('.product-price').text();
        const quantity = parseInt($('#quantity').val(), 10);
        const img = $('#main-image').attr('src');

        if (!img) {
            alert('Không có ảnh sản phẩm!');
            return;
        }

        const cartItem = {
            Name: Name,
            price: price,
            quantity: quantity,
            img: img
        };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        const cartItemHTML = `
            <div class="cart-item">
                <img alt="Product image" height="60" src="${img}" width="60" />
                <div class="item-details">
                    <p>${Name}</p>
                    <p class="cart-price">${quantity} × ${price}</p>
                </div>
                <button class="clear-item"><i class="fas fa-times"></i></button>
            </div>
        `;
        $('#item-product').append(cartItemHTML);
        hiengiohang();
        updateCartTotal();
        soluonggiohang();
    });
}

$(document).on('click', '.clear-item', function () {
    const cartItem = $(this).closest('.cart-item');
    cartItem.remove();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.img === cartItem.find('img').attr('src'));
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
        soluonggiohang();
        hiengiohang();
    }
});

$(document).ready(function () {
    const productId = getID('id');
    if (!productId) {
        $('#details').append('<p>ID sản phẩm không có trong URL.</p>');
        return;
    }
    
    $.getJSON('../JeepBicycleJSON/products.json', function (data) {
        const product = data.find(item => item.id == productId);
        if (!product) {
            $('#details').append('<p>Sản phẩm không tồn tại.</p>');
            return;
        }
        
        displayProductDetails(product);
        displayProductColors(product);
        chooseColor();
        deleteColor();
        addCart();
        removeItemCart();
    });
});

$(document).ready(function () {
    const productId = getID('id');
    if (!productId) {
        $('#details').append('<p>ID sản phẩm không có trong URL.</p>');
        return;
    }
    $.getJSON('../JeepBicycleJSON/products.json', function (data) {
        const product = data.find(item => item.id == productId);
        if (!product) {
            $('#details').append('<p>Sản phẩm không tồn tại.</p>');
            return;
        }
        //hiển thị ảnh sản phẩm
        const img = product.img;
        const imgson = $("#thumbnails");
        let indeximg = 0;
        $('#main-image').attr('src', img[indeximg]);
        const displayimgson = () => {
            imgson.empty();
            const start = Math.max(0, indeximg - 2);
            const end = Math.min(img.length, start + 4);

            for (let i = start; i < end; i++) {
                const imgClass = i === indeximg ? "imgpro active" : "imgpro";
                imgson.append(`
                <div class="product-img-item">
                  <img src="${img[i]}" class="${imgClass}" data-index="${i}" alt="imgsanpham">
                </div>
              `);
            }
        };
        displayimgson()

        $(document).on('click', '.imgpro', function () {
            $('.imgpro').removeClass('active');
            $(this).addClass('active');
            indeximg = parseInt($(this).attr('data-index'), 10);
            $('#main-image').attr('src', img[indeximg]);
            displayimgson();
        });

        // Xử lý nút Previous
        $('#prev').click(function () {
            if (indeximg > 0) {
                indeximg--;
                $('#main-image').attr('src', img[indeximg]);
                displayimgson();
            }
        });

        // Xử lý nút Next
        $('#next').click(function () {
            if (indeximg < img.length - 1) {
                indeximg++;
                $('#main-image').attr('src', img[indeximg]);
                displayimgson();
            }
        });
    });
});

function imgColor(id) {
    $.getJSON("/JeepBicycleJSON/products.json", function (data) {
        const product = data.find((item) => item.id == id);
        if (!product) return;
        const name = product.Name;
        const img = product.img;
        const imgson = $("#thumbnails");
        let indeximg = 0;
        $('#main-image').attr('src', img[indeximg]);

        $('.product-title').text(name);
        const displayimgson = () => {
            imgson.empty();
            const start = Math.max(0, indeximg - 2);
            const end = Math.min(img.length, start + 4);

            for (let i = start; i < end; i++) {
                const imgClass = i === indeximg ? "imgpro active" : "imgpro";
                imgson.append(`
                    <div class="product-img-item">
                      <img src="${img[i]}" class="${imgClass}" data-index="${i}" alt="imgsanpham">
                    </div>
                `);
            }
        };
        displayimgson();

        // Xử lý sự kiện khi nhấp vào ảnh thu nhỏ
        $(document).on('click', '.imgpro', function () {
            $('.imgpro').removeClass('active');
            $(this).addClass('active');
            indeximg = parseInt($(this).data('index'), 10);
            $('#main-image').attr('src', img[indeximg]);
            displayimgson();
        });

        // Xử lý nút Previous
        $('#prev').click(function () {
            if (indeximg > 0) {
                indeximg--;
                $('#main-image').attr('src', img[indeximg]);
                displayimgson();
            }
        });

        // Xử lý nút Next
        $('#next').click(function () {
            if (indeximg < img.length - 1) {
                indeximg++;
                $('#main-image').attr('src', img[indeximg]);
                displayimgson();
            }
        });
    });
}

$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item">
                <img alt="Product image" height="60" src="${item.img}" width="60" />
                <div class="item-details">
                    <p>${item.Name}</p>
                    <p class="cart-price">${item.quantity} × ${item.price}</p>
                </div>
                <button class="clear-item"><i class="fas fa-times"></i></button>
            </div>
        `;
        $('#item-product').append(cartItemHTML);
    });
    hiengiohang();
    updateCartTotal();
    soluonggiohang();
});