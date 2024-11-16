$(document).ready(function () {
  $("#icon-search").click(function () {
    $("body").css("overflow", "hidden");
    $("#search").css("display", "block");
  });
});

$(document).ready(function () {
  $("#close").click(function () {
    $("body").css("overflow", "auto");
    $("#search").css("display", "none");
  });
});
