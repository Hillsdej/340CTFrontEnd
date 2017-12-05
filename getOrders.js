var data;
$(document).ready(function(){
    
        $.ajax(
            {
                type: "GET",
                crossDomain: true,
                url: "http://localhost:8080/order",
                xhrFields:{
                    withCredentials:true
                },
                contentType: "application/json",
                success: function(responseData, textStatus, jqXHR)
                {
                    data = JSON.parse(responseData)
                    console.log(data[0]); 
                    buildDropdown(data);
                    buildHtmlTable();
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    console.log(errorThrown);
                }
            });

            function buildDropdown(data){
                'use strict'
                var $dropdown = $("#updateOrder-dropdown");                
                $.each(data, function(){
                    $dropdown.append($("<option />").val(this.order_id).text(this.order_id));
                })
            }

            function buildHtmlTable() {
                var columns = addAllColumnHeaders(data);
                
            
                for (var i = 0 ; i < data.length ; i++) {
                    
                    if (data[i].Arrived === 0){
                        data[i].Arrived = "Pending"
                    }
                    else if (data[i].Arrived === 1) {
                        data[i].Arrived = "Arrived"
                    }
                        

                    var row$ = $('<tr/>');
                    for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                        var cellValue = data[i][columns[colIndex]];
            
                        if (cellValue == null) { cellValue = ""; }
            
                        row$.append($('<td/>').html(cellValue));
                    }
                    $("#orderTable").append(row$);
                }
            }

            function addAllColumnHeaders(myList)
            {
                var columnSet = [];
                var headerTr$ = $('<tr/>');
            
                for (var i = 0 ; i < myList.length ; i++) {
                    var rowHash = myList[i];
                    for (var key in rowHash) {
                        if ($.inArray(key, columnSet) == -1){
                            columnSet.push(key);
                        }
                    }
                }
                console.log(columnSet);
                return columnSet;
            }
    return false;
});
