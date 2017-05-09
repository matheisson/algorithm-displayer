



/**
 * Created by levente on 2017.05.02..
 */

$(function () {

    $("#body").css("position", "absolute");

    $("#sub-button").click(function () {
        var num = $("#list").val();
        var numList = num.split(',').map(Number).filter(Boolean);
        $("#test").empty();
        $("#result").empty();

        $("#test").append("<p>" + numList + "</p>");

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/data",
            async: true,
            data: JSON.stringify(numList),
            dataType: "json",
            success: successBody,
            error: function (error) {
                console.log(error);
            }
        });
    });
});


var successBody = function(result) {
    var list = $("#test");
    var counter = 1;
    var li = $("<li>");

    var array = $.map(result, function (value, index) {
        return [value];
    });
    counter = 0;
    for (var i = 0; i < array.length; i++) {
        var items = array[i];
        for (var c in items) {
            console.log("item "+items[c]);
            var div = $("<div class='elem'>"+items[c]+"</div>");
            list.append(div);
        }
        counter++;
        console.log(" b");
        list.append("<br/>")
    }

    $("#result").append("<h5> There was "+counter+" exchange(s) until the list got sorted</h5>");
}
