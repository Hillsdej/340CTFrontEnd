$(document).ready(function()
{
    $("#addOrderItemBtn").click( function(event)
    {
        console.log("this is running:")
        //event.preventDefault();
        var data = {};
        var auth = {};
        var option = document.getElementById('orderItem-dropdown').value;
        $("#addOrderForm").serializeArray().map(function(x){data[x.name] = x.value;});
        $('#loginForm').serializeArray().map(function(x){auth[x.name]=x.value;});
        $("#result").empty();
        
        order = {"amount":data.amount, "item_id":option}
        $.ajax(
            {
                type:"POST",
                crossDomain: true,
                url: "http://localhost:8080/order",
                xhrFields:{withCredentialls:true},
                headers: {
                    'Authorization': 'Basic ' + btoa(auth.username + ":" + auth.password)
                },
                data: JSON.stringify(order),
                contentType: "application/json",
                success: function(responseData, textStatus, jqXHR)
                {
                    $("#result").html("<p style='color:green;'>Your data was submitted successfully</p>");
                    alert("Order Successful");
                    location.reload(true);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("error: invalid login credentials")
                    // $("#result").html("<p style='color:red;'>An error has occurred " + errorThrown + ".</p>");
                }
            });
            return false;
    });
});
