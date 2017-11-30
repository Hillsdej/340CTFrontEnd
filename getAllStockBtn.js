var data;
$(document).ready(function(){
    $('#getStockBtn').click(function(){
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
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    console.log(errorThrown);
                }
            });

            
            // function moveToTable(data){
            //     var $table = $('<table/>');
            //     for(var i=0; i<data.length; i++){
            //         $table.append( '<tr><td>' + "hello" + '</td></tr>' );
            //         $table.append( '<tr><td>' + data[i].item_name + '</td></tr>' );
            //         $table.append( '<tr><td>' + data[i].item_price + '</td></tr>' );
            //         $table.append( '<tr><td>' + data[i].quantity + '</td></tr>' );
            //         $table.append( '<tr><td>' + data[i].maximum_stock + '</td></tr>' );
            //         $table.append( '<tr><td>' + data[i].minimum_stock + '</td></tr>' );
            //         $table.append( '<tr><td>' + data[i].date + '</td></tr>' );
            //         // }
            //     }
            //     $('#here_table').append($table);
            // }

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
                            headerTr$.append($('<th/>').html(key));
                        }
                    }
                }
                $("#excelDataTable").append(headerTr$);
                console.log(columnSet);
                return columnSet;
            }
























            return false;
    });
});
