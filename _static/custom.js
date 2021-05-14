$(document).ready( function () {

    $( "table" ).each(function() {
        $( this ).DataTable({
        	"bPaginate": false,
        	"bInfo" : false
        });
    });

} );