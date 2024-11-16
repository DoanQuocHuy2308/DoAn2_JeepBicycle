function tang() {
    let $quantity = $('#quantity');
    $quantity.val(parseInt($quantity.val()) + 1);
}

function giam() {
    let $quantity = $('#quantity');
    if (parseInt($quantity.val()) > 1) {
        $quantity.val(parseInt($quantity.val()) - 1);
    }
}

$(document).ready(function() {
    $('.color-option').on('click', function() {
        $('.color-option').removeClass('selected');
        $(this).addClass('selected');
        $('.delete-color').show();
    });

    $('.delete-color').on('click', function() {
        $('.delete-color').hide();
        $('.color-option').removeClass('selected');
    });
});