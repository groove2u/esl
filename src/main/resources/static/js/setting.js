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
				alert("입력된 데이터가 없습니다.");
			}
		},
		error : function(request,status,error){
			console.log(error);
			alert("조회 중 오류가 발생하였습니다.");
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
				required: '배터리 값을 입력하세요.',
				range: '배터리는 0이상 100이하의 숫자를 입력하세요.'
			},
			signal: {
				required: '신호세기 값을 입력하세요.',
				range: '신호세기는 0이상 100이하의 숫자를 입력하세요.'
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
						alert("처리 실패 하였습니다.");
					} else {
						alert("등록 완료 하였습니다");
					}
					location.href='/setting'
				},
				error: function () {
					alert("처리 실패 하였습니다.");
				}
			})
		}
	});
});

