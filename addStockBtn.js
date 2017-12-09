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
                    alert("Your data was submitted successfully");
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var displayError = JSON.parse(JSON.stringify(jqXHR)).responseText;
                    alert(displayError);
                    location.reload(true);
                }
            });
            return false;
    });
});