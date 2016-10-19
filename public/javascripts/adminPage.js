$( document ).ready(function() {
 	myControll.loadButtonFirst(); 
	
	$('li.class1').click(function() {
		$('.layout1').show();
		$('.layout2').hide();
		$('.layout3').hide();
		$('.layout4').hide();
		$('.layout5').hide();
		$('.layout6').hide();
		$(this).addClass('on');
		$('li.class2').removeClass('on');
		$('li.class3').removeClass('on');
		$('li.class4').removeClass('on');
		$('li.class5').removeClass('on');
		$('li.class6').removeClass('on');
	});
	$('li.class2').click(function() {
		$('.layout2').show();
		$('.layout1').hide();
		$('.layout3').hide();
		$('.layout4').hide();
		$('.layout5').hide();
		$('.layout6').hide();
		$(this).addClass('on');
		$('li.class1').removeClass('on');
		$('li.class3').removeClass('on');
		$('li.class4').removeClass('on');
		$('li.class5').removeClass('on');
		$('li.class6').removeClass('on');
		myControll.checkStatusRadio();
		myControll.setEventRadio();
	});
	$('li.class3').click(function() {
		$('.layout3').show();
		$('.layout1').hide();
		$('.layout2').hide();
		$('.layout4').hide();
		$('.layout5').hide();
		$('.layout6').hide();
		$(this).addClass('on');
		$('li.class1').removeClass('on');
		$('li.class2').removeClass('on');
		$('li.class4').removeClass('on');
		$('li.class5').removeClass('on');
		$('li.class6').removeClass('on');
	});
	$('li.class4').click(function() {
		$('.layout4').show();
		$('.layout1').hide();
		$('.layout2').hide();
		$('.layout3').hide();
		$('.layout5').hide();
		$('.layout6').hide();
		$(this).addClass('on');
		$('li.class1').removeClass('on');
		$('li.class2').removeClass('on');
		$('li.class3').removeClass('on');
		$('li.class5').removeClass('on');
		$('li.class6').removeClass('on');
	});
	$('li.class5').click(function() {
		$('.layout5').show();
		$('.layout4').hide();
		$('.layout1').hide();
		$('.layout2').hide();
		$('.layout3').hide();
		$('.layout6').hide();
		$(this).addClass('on');
		$('li.class1').removeClass('on');
		$('li.class2').removeClass('on');
		$('li.class3').removeClass('on');
		$('li.class4').removeClass('on');
		$('li.class6').removeClass('on');
		myControll.checkStatusRadioLayout5();
		myControll.setEventRadioLayout5();
	});
	$('li.class6').click(function() {
		$('.layout6').show();
		$('.layout5').hide();
		$('.layout4').hide();
		$('.layout1').hide();
		$('.layout2').hide();
		$('.layout3').hide();
		$(this).addClass('on');
		$('li.class1').removeClass('on');
		$('li.class2').removeClass('on');
		$('li.class3').removeClass('on');
		$('li.class4').removeClass('on');
		$('li.class5').removeClass('on');
		myControll.setEventClickButton();
	});
});
myControll = {
	loadButtonFirst: function() {
		$('#load').on('click', function() {
			var $this = $(this);
			$this.button('loading');
			setTimeout(function() {
				$this.button('reset');
				alert("給与データが更新されました。");
			}, 2000);
		});
	},
	checkStatusRadio: function() {
		if ($('#male').is(':checked') == true) {
			$('.radio1').show();
			$('.radio2').hide();
		}
		if ($('#female').is(':checked') == true) {
			$('.radio2').show();
			$('.radio1').hide();
		}
	},
	//指定方法ラジオボタン押下
	setEventRadio: function() {
		$('input[name="gender"]:radio').change(function() {
		    if ($(this).attr('id') == 'male') {
				$(this).prop('checked', true);
				$('.radio1').show();
				$('.radio2').hide();
			}
			else {
				$(this).prop('checked', true);
				$('.radio2').show();
				$('.radio1').hide();
			}
		});
	},
	
	checkStatusRadioLayout5: function() {
		if ($('#rad1').is(':checked') == true) {
			$('.layout5radio1').show();
			$('.layout5radio2').hide();
			$('.layout5radio3').hide();
		}
		if ($('#rad2').is(':checked') == true) {
			$('.layout5radio1').hide();
			$('.layout5radio3').hide();
			$('.layout5radio2').show();
		}
		if ($('#rad3').is(':checked') == true) {
			$('.layout5radio1').hide();
			$('.layout5radio2').hide();
			$('.layout5radio3').show();
		}
	},
	//指定方法ラジオボタン押下
	setEventRadioLayout5: function() {
		$('input[name="radiolayout5"]:radio').change(function() {
		    if ($(this).attr('id') == 'rad1') {
				$(this).prop('checked', true);
				$('.layout5radio1').show();
				$('.layout5radio2').hide();
				$('.layout5radio3').hide();
			}
			if ($(this).attr('id') == 'rad2'){
				$(this).prop('checked', true);
				$('.layout5radio1').hide();
				$('.layout5radio3').hide();
				$('.layout5radio2').show()
			}
			if ($(this).attr('id') == 'rad3') {
				$(this).prop('checked', true);
				$('.layout5radio1').hide();
				$('.layout5radio2').hide();
				$('.layout5radio3').show()
			}
		});
	},
	
	setEventClickButton: function() {
	
		var dataSet = [
			["0", "ChiNhan", "日"],
			["0", "TranDien", "円"],
			["0", "PhamVan", "回"],
			["0", "HuuVinh", "HH:MM"],
		];
		
		$('#example').DataTable({
			data: dataSet,
			columns: 
			[
				{	
					title: "表示",
					data: null,
					defaultContent: '',
	                className: 'select-checkbox',
	                orderable: false
				}, 
				{
					title: "区分"
				}, 
				{
					title: "単位"
				}
			],
			dom: 'Bfrtip',        // Needs button container
			select: {
	            style:    'os',
	            selector: 'td:first-child'
        	},
			responsive: true,
			altEditor: true,     // Enable altEditor
			buttons: [{
				text: '追加',
				name: 'add'        // do not change name
			},
			{
				extend: 'selected', // Bind to Selected row
				text: '訂正',
				name: 'edit'       // do not change name
			},
			{
				extend: 'selected', // Bind to Selected row
				text: '削除',
				name: 'delete'      // do not change name
			}]
		});
	}
};

function HandleBrowseClick()
{
	var fileinput = document.getElementById("browse");
	fileinput.click();
}
function Handlechange()
{
	var fileinput = document.getElementById("browse");
	var textinput = document.getElementById("filename");
	textinput.value = fileinput.value;
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function openPopUp(event) {
	event.stopPropagation();
	document.getElementById("dn-h-usermenu").classList.toggle("show");
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  document.getElementById("dn-h-usermenu").classList.remove("show");
}