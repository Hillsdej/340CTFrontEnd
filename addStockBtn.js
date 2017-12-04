$(document).ready(function()
{
    $("#addStockBtn").click( function(event)
    {
        console.log("this is running:")
        //event.preventDefault();
        var data = {};
        $("#addStockForm").serializeArray().map(function(x){data[x.name] = x.value;});
        $("#result").empty();
        console.log("data: ");
        console.log(data);
        $.ajax(
            {
                type:"POST",
                crossDomain: true,
                url: "http://localhost:8080/stock",
                xhrFields:{withCredentialls:true},
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(responseData, textStatus, jqXHR)
                {
                    $("#result").html("<p style='color:green;'>Your data was submitted successfully</p>");
                },
                error: function(jqXHR, textStatus, errorThrown){
                    $("#result").html("<p style='color:red;'>An error has occurred " + errorThrown + ".</p>");
                }
            });
            return false;
    });
});