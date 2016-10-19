$( document ).ready(function() {
	$("#table_history").tablesorter( {
		sortList: [[0, 1]] ,
		// pass the headers argument and assing a object 
        headers: { 
            // assign the secound column (we start counting zero) 
            2: { 
                // disable it by setting the property sorter to false 
                sorter: false 
            }, 
            // assign the third column (we start counting zero) 
            3: { 
                // disable it by setting the property sorter to false 
                sorter: false 
            },
             // assign the third column (we start counting zero) 
            4: { 
                // disable it by setting the property sorter to false 
                sorter: false 
            } 
        } 
    } ); 

	$('.sizeList').text($('#table_history > tbody  > tr').length);
	var cnt = 0;
	var value = "";
	$('#table_history > tbody  > tr').each(function() {
		cnt++;
	 	value += ($(this).find('td:first').text()).substring(0, 4);
		value += ",";
	});
	if (cnt > 0) {
		value = value.substring(0, value.length - 1);
	}
	var array = JSON.parse("[" + value + "]");
	var newArr = $.unique(array.sort()).sort();
    var result = "";
    for (var i = 0; i < newArr.length; i++) {
      result += newArr[i] + ",";
    }
    result = result.slice(0, -1) //remove last comma

   	var div = document.getElementById('jco-list-sort-item');

	var mayValue = JSON.parse("[" + result + "]");

	// create ul
    var ul = document.createElement('ul');
    var a_all = document.createElement('a');
    var li_all = document.createElement('li');
	a_all.setAttribute('class', 'co-list-sort-data');
	a_all.setAttribute('href', 'javascript:void(0);');
	a_all.setAttribute('onclick', 'showDataWhenClickMenu();');
	var content_all = document.createTextNode("すべて");
	a_all.appendChild(content_all);
	li_all.appendChild(a_all);
	ul.appendChild(li_all);
    // create a and li
	for(var i in mayValue) {
		var li = document.createElement('li');
		var content = document.createTextNode(mayValue[i]); 
		var a = document.createElement('a');
		a.setAttribute('class', 'co-list-sort-data asc');
		a.setAttribute('href', 'javascript:void(0);');
		a.setAttribute('onclick', 'showDataWhenClickMenu();');
		a.appendChild(content);
		li.appendChild(a);
		ul.appendChild(li);
	}
	div.appendChild(ul);
	showDataWhenClickMenu();
	clickDateHistory();
	if (typeof($.cookie("hid_value_menu"))  !== "undefined" && typeof($.cookie("hid_value"))  !== "undefined") {
		var cnt = 0;
		if ($.cookie("hid_value_menu") == $.cookie("hid_value")) {
			if ($.cookie("hid_value_menu") == "すべて") {
				$('#table_history > tbody  > tr').each(function() {
					cnt++;
			 		$(this).show();
			 		$('.sizeList').text(cnt);
			 	});
		 	}
		 	else {
		 		var value = "";
		 		$('#table_history > tbody  > tr').each(function() {
			 		value = ($(this).find('td:first').text()).substring(0, 4);
			 		if ($.cookie("hid_value_menu") == value) {
			 			cnt++;
			 			$(this).show();
			 			$('.sizeList').text(cnt);
			 		}
			 		else {
			 			$(this).hide();
			 		}
			 	});
		 	}
		}
		else {
			$('#table_history > tbody  > tr').each(function() {
				cnt++;
			 	$(this).show();
			 	$('.sizeList').text(cnt);
			});
		}
		$.removeCookie("hid_value_menu");
		$.removeCookie("hid_value");
	}
});
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function openPopUp(event) {
	event.stopPropagation();
	document.getElementById("dn-h-usermenu").classList.toggle("show");
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  	document.getElementById("dn-h-usermenu").classList.remove("show");
  	document.getElementById("jco-list-sort-item").classList.remove("show");
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function openMenuHistory(event) {
  	event.stopPropagation();
  	document.getElementById("jco-list-sort-item").classList.toggle("show");
}
function showDataWhenClickMenu() {
	var value = "";
	var cnt = 0;
	$('.co-list-sort-data').click(function() {
		var dataValue = $(this).text();
		$.cookie('hid_value_menu', dataValue);
		$( "li" ).each(function() {
			if (dataValue == $(this).text()) {
		 		$(this).addClass('back_ground_menu_pop_up');
		 	}
		 	else {
		 		$(this).removeClass('back_ground_menu_pop_up');
		 	}
		});
		if (dataValue == "すべて") {
			$('#table_history > tbody  > tr').each(function() {
				cnt++;
		 		$(this).show();
		 		$('.sizeList').text(cnt);
		 	});
	 	}
	 	else {
	 		$('#table_history > tbody  > tr').each(function() {
		 		value = ($(this).find('td:first').text()).substring(0, 4);
		 		if (dataValue == value) {
		 			cnt++;
		 			$(this).show();
		 			$('.sizeList').text(cnt);
		 		}
		 		else {
		 			$(this).hide();
		 		}
		 	});
	 	}
	});
}
function clickDateHistory() {
	$('.doc-th-ymdhi-his').click(function() {
		var valueDate = ($(this).text()).substring(0, 4);
		$.cookie('hid_value', valueDate);
	});
}




