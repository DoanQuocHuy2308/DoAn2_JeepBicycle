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
        if (name === "" || phone === "" || email === "" || city === "" || district === "" || ward === "" || address === "") {
            alert("Vui lòng điền đầy đủ thông tin đơn hàng.");
        }
    });
  });