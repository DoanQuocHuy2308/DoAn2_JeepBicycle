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
                <li class="breadcrumb-item"><a href="http://127.0.0.1:5500/index.html">Trang chủ</a></li>
                <li class="breadcrumb-item"><a href="http://127.0.0.1:5500/JeepBicycleHTML/SanPham.html">${product.category}</a></li>
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
function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
$(document).ready(function () {
    const productId = getIdFromUrl();
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
        $.getJSON('/JeepBicycleJSON/news.json', function (newsData) {
            const news = newsData.find(item => item.name === product.MauXe);
            if (!news) {
                $('#news').append('<p>Không có tin tức liên quan đến sản phẩm này.</p>');
                return;
            }
        
            const newsContent = `
                ${[...Array(7).keys()].map(i => {
                    const title = news[`title${i + 1}`] || ''; 
                    const content = news[`content${i + 1}`] || ''; 
                    const imgSrc = news[`img${i + 1}`]; 
                    return `
                        <div class="row">
                            <h3>${title}</h3>
                            <p>${content}</p>
                            ${imgSrc ? `<img alt="" height="400" src="${imgSrc}" width="800" />` : ''}
                        </div>
                    `;
                }).join('')}
            `;
            $('#news').html(newsContent);
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

$(document).ready(function () {
    var arrayID = [1, 5, 9, 15, 21, 27, 33, 39, 45, 48, 53, 57, 60, 64, 70, 76, 82];

    $.getJSON("/JeepBicycleJSON/products.json", function (data) {
        var filteredProducts = data.filter(function (product) {
            return arrayID.includes(product.id);
        });
        function displayProducts(products) {
            $('#product-list-detail').empty();
            var rows = [];
            for (var i = 0; i < products.length; i += 3) {
                rows.push(products.slice(i, i + 3)); 
            }
            rows.forEach(function (row) {
                row.forEach(function (product) {
                    var productHtml = `
                    <div class="col-md-4 d-flex">
                        <a href="">
                            <div class="product-card w-100">
                                <div class="img-container">
                                    <img alt="Xe đạp đường trường JEEP JISE – Phanh đĩa cơ, Bánh 700C – 2024" height="400"
                                         src="${product.img[0]}" width="600" />
                                    <div class="discount">${product.TriGiaKM}</div>
                                </div>
                                <div class="product-info">
                                    <div class="promotion">${product.KhuyenMai}</div>
                                    <div class="product-name">
                                        ${product.Name}
                                    </div>
                                    <div class="price">
                                        <div class="old-price">${product.oldprice}</div>
                                        <div class="new-price">${product.newprice}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    `;
                    $('#product-list-detail').append(productHtml);
                });
            });
        }
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];  
            }
        }
        shuffleArray(filteredProducts);
        var randomProducts = filteredProducts.slice(0, 3); 
        displayProducts(randomProducts);
    });
});


