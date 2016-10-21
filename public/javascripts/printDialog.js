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

$(document).on("click", "#pdfThis", function () {
	var form = $('#creport-view'),
    cache_width = form.width(),
    a4  =[ 595.28,  841.89];  // for a4 size paper width and height
    $('body').scrollTop(0);
 	createPDF(form, a4, cache_width);
});

function createPDF(form, a4, cache_width){
 	getCanvas(form, a4).then(function(canvas){
        var imgData = canvas.toDataURL('image/png');

  		var imgWidth = 295; 

        var pageHeight = 210;  

        var imgHeight = canvas.height * imgWidth / canvas.width;

        var heightLeft = imgHeight;

        var pdf = new jsPDF('l', 'mm');

        var position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;

        while (heightLeft >= 0) {

            position = heightLeft - imgHeight;

            pdf.addPage();

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

            heightLeft -= pageHeight;

        }
        pdf.save("payDetail.pdf");
    	pdf.output("dataurlnewwindow");
    	form.width(cache_width);
	});
}
 
// create canvas object
function getCanvas(form, a4){
	form.width(a4[0]*1.33333).css('width','1000px');
 	return html2canvas(form,{
	    imageTimeout:2000,
    	removeContainer:true
    }); 
}