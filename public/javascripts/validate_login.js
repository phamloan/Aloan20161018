$( document ).ready(function() {
	
 	$('#inputfrm').validate({
        errorElement: 'div',
        rules: {
            empcode: {
            	required: true,
                maxlength: 100
            },
            password: {
            	required: true,
                maxlength: 100
            }
        },
        messages: {
            empcode: {
                required: "Please specify your name",
                maxlength: "Please enter no more than 100 characters."
            },
            password: {
                required: "Please enter your password",
                maxlength: "Please enter no more than 100 characters."
            }
        },
        highlight: function (element) {
            $('.removeError').hide();
            $('.noMessagePadding').hide();
            $('.loginInput').removeClass('noMessagePadding').addClass('loginInputAfter');
            $(element).closest('.control-group').removeClass('begin_validate').addClass('after_validate');
        },
        success: function (element) {
            $(element).closest('.control-group').removeClass('after_validate').addClass('begin_validate');
        }
    });
});
