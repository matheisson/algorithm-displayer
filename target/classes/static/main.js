/**
 * Created by levente on 2017.05.02..
 */

$(function () {

    $("#body").css("position", "absolute");

    $.ajax({
        headers: { 'X-Auth-Token': 'b0af205c2cee45118a8a1d99cad04bf3' },
        url: 'http://api.football-data.org/v1/fixtures?timeFrame=n1',
        dataType: 'json',
        type: 'GET',
    }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
        var res = regex.exec(response.fixtures[0]._links.awayTeam.href);
        var teamId = res[1];
        console.log(teamId);
    });

    // $("#input-box").insertBefore("<h2>Enter your list below</h2>")
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
