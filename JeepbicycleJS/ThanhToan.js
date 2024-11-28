function toggleDiscountCode() {
    const $discountCode = $('#discount-code');
    if($discountCode.length){
        $discountCode.toggle();
    }
}
$('#applyDiscount').on('click', function () {
    const discount = parseFloat($('#input-discount').val());
    const total = parseInt($('#new-price').text().replace(/[^0-9]/g, ""));
    const newTotal = total - (total * discount / 100);
    $('#new-price').text(newTotal.toLocaleString() + "₫");
    $('#input-discount').val("");
  });

  $(document).ready(function() {
    $('#oder').on('click', function(e) {
        var name = $('#name').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var city = $('#city').val();
        var district = $('#district').val();
        var ward = $('#ward').val();
        var address = $('#address').val();
        if (name === "" || phone === "" || email === "" || city === "" || district === "" || ward === "" || address === "" || city === "Chọn Tỉnh/Thành phố" || district === "Chọn Quận/Huyện" || ward === "Chọn Xã/Phường/Thị trấn" || address === "") {
            alert("Vui lòng điền đầy đủ thông tin đơn hàng.");
        }
        else
        alert('đặt hàng thành công');
    });
  });

  const cart = localStorage.getItem("cart");
  const cartJs = JSON.parse(cart);
  const $thanhtoan = $("#thanhtoan");
  
  let total = 0; 
  
  cartJs.forEach((i) => {
      const price = parseFloat(i.price.replace(/[^0-9]/g, "")); 
      const tongtienproduct = price * i.quantity; 
      const totalprodcuts = tongtienproduct.toLocaleString() + 'đ'; 
      total += tongtienproduct; 
      $thanhtoan.append(`
          <tr>
              <td>
                  <img alt="${i.Name}" height="100" src="${i.img}" width="100" />
              </td>
              <td>
                  ${i.Name} × ${i.quantity}
              </td>
              <td class="text-end">${totalprodcuts}</td>
          </tr>`);
  });
  const totalprodcuts = total.toLocaleString() + 'đ';
  $('#old-price').text(totalprodcuts)
  $('#new-price').text(totalprodcuts)
  
  $('#applyDiscount').click(function(){
    const discount = parseInt($('#input-discount').val().replace('%', ''));
    const total = total;
    const newTotal = total - (total * discount / 100);
    $('#new-price').text(newTotal.toLocaleString() + "₫");
    $('#input-discount').text("");
  });

  $(document).ready(function () {
    $.getJSON('../JeepBicycleJSON/tinh&thanhpho.json', function (data) {
        data.forEach(function (city) {
            $('#city').append(
                `<option value="${city.id}">${city.name}</option>`
            );
        });
    });
    $.getJSON('../JeepBicycleJSON/quan&huyen.json', function(data){
        data.forEach(function (district) {
            $("#district").append(
                `<option value="${district.id}">${district.name}</option>`
            )
        })
    });
    $.getJSON('../JeepBicycleJSON/thixa&phuong&thitran.json', function(data) {
        $('#district').change(function() {
            var districtID = $(this).val();
            var wards = data[districtID];
            $('#ward').empty();
            if (wards) {
                $('#ward').append('<option value="">Chọn Xã/Phường/Thị trấn</option>');
                $.each(wards, function(index, ward) {
                    $('#ward').append($('<option>', {
                        value: ward.id,
                        text: ward.name
                    }));
                });
            } else {
                $('#ward').append('<option value="">Không có xã/phường</option>');
            }
        });
    });
});