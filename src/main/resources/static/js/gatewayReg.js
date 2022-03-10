jQuery.fn.serializeObject = function() {
	var obj = null;
	try {
		if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
			var arr = this.serializeArray();
			if(arr){ obj = {};
				jQuery.each(arr, function() {
					obj[this.name] = this.value; });
			}
		}
	}catch(e) {
		alert(e.message);
	}finally {}
	return obj;
}

$(document).ready(function () {
	console.log("onLoad");

	$('#btnCancel').click(function(){
		location.href='/gatewayList';

	});


	$('#btnReg').click(function(){
		$("#frm").submit();

	});
	$.validator.setDefaults({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		showErrors: function(errorMap,errorList){
			if(this.numberOfInvalids()){ // 에러가 있으면
				alert(errorList[0].message); // 경고창으로 띄움
			}
		}
	});
	$("#frm").validate({
		rules: {
			gatewayID: {
				required: true,
			}
		},
		messages: {
			gatewayID: {
				required: '게이트웨이 아이디를 입력해주세요.'
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/insertGateway",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert("등록완료하였습니다");
					location.href='/gatewayList'
				},
				error: function () {
					alert("등록실패하였습니다.");
				}
			})
		}
	});

});

