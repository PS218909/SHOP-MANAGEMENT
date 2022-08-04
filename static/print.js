$(window).bind("beforeprint", function () {
    $(".hide-while-print").hide();
})
$(window).bind("afterprint", function () {
    $(".hide-while-print").show("swing");
})