$(document).on("click", "#printThis", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#creport-view-comment").printThis({
        debug: false,               // show the iframe for debugging
        importCSS: true,            // import page CSS
        importStyle: true,          // import style tags
        printContainer: true,       // grab outer container as well as the contents of the selector
        loadCSS:"[/stylesheets/jquery-ui-1.8.21.custom.css,/stylesheets/common.css,/stylesheets/color_blue.css,/stylesheets/creport.css,/stylesheets/footerDetail.css]", // path to additional css file - us an array [] for multiple
        pageTitle: "",              // add title to print page
        removeInline: false,        // remove all inline styles from print elements
        printDelay: 333,            // variable print delay; depending on complexity a higher value may be necessary
        header: null,               // prefix to html
        formValues: true            // preserve input/form values
    });

});

var form = $('#creport-view-comment'),
 	cache_width = form.width(),
 	a4  =[ 595.28,  841.89];  // for a4 size paper width and height

$(document).on("click", "#pdfThis", function (e) {
	alert('1');
    $('body').scrollTop(0);
 	createPDF();
});

/*$('#pdfThis').on('click',function(){
	alert('AAAAA');
 	$('body').scrollTop(0);
 	createPDF();
});*/

//create pdf
function createPDF(){
	alert(form);
 	getCanvas().then(function(canvas){
  		var img = canvas.toDataURL("image/png"),
  		doc = new jsPDF({
        	unit:'px', 
          	format:'a4'
    	});     
    	doc.addImage(img, 'JPEG', 20, 20);
    	doc.output("dataurlnewwindow");
    	form.width(cache_width);
	});
}
 
// create canvas object
function getCanvas(){
	alert('3');
	form.width((a4[0]*1.33333) -80).css('max-width','none');
 	return html2canvas(form,{
	    imageTimeout:2000,
    	removeContainer:true
    }); 
}