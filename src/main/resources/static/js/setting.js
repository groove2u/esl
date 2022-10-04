var getData = function(){
	var sendData= {};
	$.ajax({
		url	: "/getSetting",
		type : "post",
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(sendData),
		success : function(arg){
			data = arg.data[0];
			if(data != undefined) {
				$("#battery").val(data.battery);
				$("#signal").val(data.signal);
			} else {
				alert(noData);
			}
		},
		error : function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};
getData();

$(document).ready(function () {
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
			battery: {
				required: true,
				range: [0, 100]
			},
			signal: {
				required: true,
				range: [0, 100]
			}
		},
		messages: {
			battery: {
				required: noData,
				range: enterBatteryRange
			},
			signal: {
				required: enterSignal,
				range: enterSignalRange
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/modifySetting",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function (arg) {
					if(arg.status == 9999) {
						alert(processFail);
					} else {
						alert(registSuccess);
					}
					location.href='/setting'
				},
				error: function () {
					alert(processFail);
				}
			})
		}
	});
});

