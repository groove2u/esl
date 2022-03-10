$(document).ready(function () {
	$('#submit').click(function(){
		$("#frm").submit();

	});
	$('#btnConfirm').click(function(){
		$(".layer_pop").hide();

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
			id: {
				required: true,
			},
			password: {
				required: true
			}
		},
		messages: {
			id: {
				required: '아이디를 입력해주세요.'
			},
			password: {
				required: '패스워드를 입력해주세요.'
			}
		},
		submitHandler: function (form) {
			form.submit();
		}
	});
});

