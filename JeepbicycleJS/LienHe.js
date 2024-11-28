$(document).ready(function() {
    $('#submit').click(function() {
        var name = $('#name').val();
        var phone = $('#phone-number').val();
        var email = $('#email').val();
        var content = $('#content').val();
        var check = $('#check').prop('checked');

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        var phonePattern = /^[0-9]{10}$/;
        if (name === "" || phone === "" || email === "" || content === "" || !check) {
            window.alert("Vui lòng nhập đầy đủ dữ liệu.");
            return;
        }
        if (!phonePattern.test(phone)) {
            window.alert("Vui lòng nhập đúng định dạng số điện thoại");
            return; 
        }
        if (!emailPattern.test(email)) {
            window.alert("Vui lòng nhập đúng định dạng email");
            return; 
        }
        window.alert("Gửi thành công");
    });
});
