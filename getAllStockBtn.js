var data;
$(document).ready(function(){
    
        $.ajax(
            {
                type: "GET",
                crossDomain: true,
                url: "http://localhost:8080/stock",
                xhrFields:{
                    withCredentials:true
                },
                contentType: "application/json",
                success: function(responseData, textStatus, jqXHR)
                {
                    data = JSON.parse(responseData)
                    console.log(data[0]); 
                    buildHtmlTable();
                    buildDropdown(data);
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    console.log(errorThrown);
                }
            });

            function buildHtmlTable() {
                var columns = addAllColumnHeaders(data);
            
                for (var i = 0 ; i < data.length ; i++) {
                    var row$ = $('<tr/>');
                    for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                        var cellValue = data[i][columns[colIndex]];
            
                        if (cellValue == null) { cellValue = ""; }
            
                        row$.append($('<td/>').html(cellValue));
                    }
                    $("#excelDataTable").append(row$);
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

            function buildDropdown(data){
                'use strict'
                var $dropdown = $("#delete-dropdown");                
                $.each(data, function(){
                    $dropdown.append($("<option />").val(this.item_id).text(this.item_name));
                })
            }
            
           
            
    return false;
});
