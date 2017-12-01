var data;
$(document).ready(function(){
    $("#deleteStockItem").click( function(event)
    {
        var data = {};
        $("#deleteItemForm").serializeArray().map(function(x){data[x.name] = x.value;});
        $.ajax(
            {
                type: "DELETE",
                crossDomain: true,
                url: "http://localhost:8080/stock/"+data.item_id,
                xhrFields:{
                    withCredentials:true
                },
                contentType: "application/json",
                success: function(responseData, textStatus, jqXHR)
                {
                    data = JSON.parse(responseData)
                    console.log("success");
                    alert("Item deleted from stock");
                    location.reload(true);
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    console.log(errorThrown);
                }
            });
    return false;
    });
});
