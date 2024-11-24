$(document).ready(function(){
    $('#submit').click(function(){
        var name = $('#name').val();
        var phone = $('#phone-number').val();
        var email = $('#email').val();
        var content = $('#content').val();
        var check = $('#check').prop('checked');
        
        if (name === "" || phone === "" || email === "" || content === "" || !check){
            window.alert("Vui lòng nhập đầy đủ dữ liệu.");
        }
    });
});
