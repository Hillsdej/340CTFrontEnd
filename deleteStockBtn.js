var data;
$(document).ready(function(){
    
    $('#deleteBtn').click(function(){ 
        var option = document.getElementById('delete-dropdown').value;        
        $.ajax(
            {
                type: "DELETE",
                crossDomain: true,
                url: "http://localhost:8080/stock/"+option,
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
