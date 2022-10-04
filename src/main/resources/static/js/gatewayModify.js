jQuery.fn.serializeObject = function() {
	var obj = null;
	try {
		if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
			var arr = this.serializeArray();
			if(arr) {
				obj = {};
				jQuery.each(arr, function() {
					obj[this.name] = this.value;
				});
			}
		}
	} catch(e) {
		alert(e.message);
	} finally {
	}
	return obj;
}
var getData = function() {
	var sendData= {
		"gatewayCode":$("#gatewayCode").val()
	}

	$.ajax({
		url : "/getGatewayView",
		type : "post",
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(sendData),
		success : function(arg){
			data = arg.data;
			$("#gatewayID").val(data.gatewayID);
			$("#desc").val(data.desc);
			$("#location").val(data.location);
		},
		error	: function(request,status,error) {
			console.log(error);
			alert(commonError);
		}
	});
};

getData();

$(document).ready(function () {
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
		showErrors: function(errorMap,errorList) {
			if(this.numberOfInvalids()) { // 에러가 있으면
				alert(errorList[0].message); // 경고창으로 띄움
			}
		}
	});
	$("#frm").validate({
		rules: {
			gatewayID: {
				required: true
			}
		},
		messages: {
			gatewayID: {
				required: enterGatewayId
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/modifyGateway",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert(registSuccess);
					location.href='/gatewayList'
				},
				error: function () {
					alert(registFail);
				}
			})
		}
	});

});

