$(document).ready(function()
{
    $("#updateOrderBtn").click(function(event){
        
        console.log("update order running")
        var auth = {};
        var option = document.getElementById('updateOrder-dropdown').value;
        console.log("option")
        order_id = {"order_id":option}
        $('#updateLoginForm').serializeArray().map(function(x){auth[x.name]=x.value;});
        $("#result").empty();
        
        $.ajax(
            {
                type:"PUT",
                crossDomain: true,
                url: "http://localhost:8080/order/"+option,
                xhrFields:{withCredentialls:true},
                headers: {
                    'Authorization': 'Basic ' + btoa(auth.username + ":" + auth.password)
                },
                contentType: "application/json",
                data: JSON.stringify(order_id),
                success: function(responseData, textStatus, jqXHR)
                {
                    $("#result").html("<p style='color:green;'>Your data was submitted successfully</p>");
                    alert("Order Updated");
                    location.reload(true);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    $("#result").html("<p style='color:red;'>An error has occurred " + errorThrown + ".</p>");
                }
            });
            return false;
    });
});
