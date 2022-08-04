var real = [];
var tot = 0;
$("p").eq(0).keypress(
    function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $("p").eq(1).focus();
        }
    }
)
$("p").eq(1).keypress(
    function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $("input").eq(0).focus();
        }
    }
    )
$("p").focusin(
    function () {
        if ($(this).text() == "NAME" || $(this).text() == "ADDRESS" ) {
            $(this).text("");
        }
    }
    );
$("p").focusout(
    function () {
        if ($.trim($(this).text()) == "") {
            if ($(this).index() == 2) {
                $(this).text("NAME");
            } else if ($(this).index() == 3) {
                $(this).text("ADDRESS");
            }

        }
    }
)
// $("input").eq(0).focus();
$("p").eq(0).focus();
$("input").eq(0).focusout(
    function () {
        if (1) {
            if ($(this).val() != "") {
                let inp = $(this).val();
                $("option").filter(
                    function () {
                        if ($(this).val() == inp) {
                            inp = $(this).text();
                            if (inp.search(":") != -1) {
                                $("input").eq(2).val(inp.split(":")[1]);
                                $("input").eq(1).attr({"max": inp.split(":")[2]})
                                return;
                            }
                        } else {
                            $("input").eq(2).val("");
                        }
                    }
                )
            }
        }
    }
);
$("input").eq(0).keypress(
    function (event) {
        if (event.which == 13) {
            if ($(this).val() != "") {
                $("input").eq(1).focus();
            }
        }
    }
);
$("input").eq(1).keypress(
    function (event) {
        if (event.which == 13) {
            if ($(this).val() != "") {
                $("input").eq(2).focus();
            }
        }
    }
);
$("input").eq(2).keypress(
    function (event) {
        if (event.which == 13) {
            if ($(this).val() != "") {
                $("button").eq(0).trigger("click");
            }
        }
    }
);
$("button").eq(0).click(
    function () {
        if ($("input").eq(0).val() == "") {
            return;
        }
        if ($("input").eq(1).val() == "") {
            return;
        }
        if ($("input").eq(2).val() == "") {
            return;
        }
        real.push([real.length+1, $("input").eq(0).val(), $("input").eq(1).val(), $("input").eq(2).val(), $("input").eq(1).val()*$("input").eq(2).val()])
        $("input").eq(0).val('');
        $("input").eq(1).val('');
        $("input").eq(2).val('');
        $("input").eq(0).focus();
        $("tbody").eq(0).text("");
        tot = 0;
        for (var i = 0;i<real.length;i++) {
            $("tbody").eq(0).append("<tr>"+"<td><button class='btn btn-danger' value='"+(i)+"'>"+(i+1)+"</button></td>"+"<td>"+real[i][1]+"</td>"+"<td>"+real[i][2]+"</td>"+"<td>"+real[i][3]+"</td>"+"<td>"+real[i][4]+"</td>"+"</tr>");
            tot+=real[i][4];
        }
        $("tbody").eq(1).html("<tr><td></td><td></td><td></td><td>TOTAL</td><td>"+tot+"</td></tr>");
    }
)
$("tbody").eq(0).on('click', 'button', function (evt) {
    real.splice($(this).val(), 1);
    $("tbody").text("");
    tot = 0;
    for (var i = 0;i<real.length;i++) {
        $("tbody").eq(0).append("<tr>"+"<td><button class='btn btn-danger' value='"+(i)+"'>"+(i+1)+"</button></td>"+"<td>"+real[i][1]+"</td>"+"<td>"+real[i][2]+"</td>"+"<td>"+real[i][3]+"</td>"+"<td>"+real[i][4]+"</td>"+"</tr>");
        tot+=real[i][4];
    }
    $("tbody").eq(1).html("<tr><td></td><td></td><td></td><td>TOTAL</td><td>"+tot+"</td></tr>");
    $("input").eq(0).focus();
})
$("button:last").click(
    function () {
        var data = $("p").eq(0).text()+"==_=="+$("p").eq(1).text()+"==_=="+$("#billNo").text()+"\n\n";
        for (var i = 0;i<real.length;i++) {
            data+=real[i][0]+"==_=="+real[i][1]+"==_=="+real[i][2]+"==_=="+real[i][3]+"==_=="+real[i][4]+"\n"
        }
        $("<form action='/print' method='POST'><input name='data' value='"+data+"' type='hidden'></input></form>").appendTo('body').submit()
        $("form").remove()
    }
)
