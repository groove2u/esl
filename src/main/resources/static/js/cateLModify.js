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
var getData = function(){
	var sendData= {
		"cateLCode":$("#cateLCode").val()
	}
	$.ajax({
		url			: "/getCateLView",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(arg){
			data = arg.data;

			$("#cateLName").val(data.cateLName);
			$("#desc").val(data.desc);
			$("#discount").val(data.discount);

			var useYN = data.useYN;
			if(useYN == "Y"){
				$("input:radio[id='useYN1']").prop("checked", true);
			}else {
				$("input:radio[id='useYN2']").prop("checked", true);
			}
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};
getData();

var goModify = function(productCode){
//	alert(productCode);
	var form = $('<form></form>');
	form.attr('action', "/productView");
	form.attr('method', 'post');
	form.appendTo('body');
	var productCode = $("<input type='hidden' value="+productCode+" name='productCode'>");
	form.append(productCode);
	form.submit();
};
$(document).ready(function () {
	$('#btnCancel').click(function(){
		location.href='/cateLList';

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
			cateLName: {
				required: true,
			}
		},
		messages: {
			cateLName: {
				required: enterName
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/modifyCateL",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert(registSuccess);
					location.href='/cateLList'
				},
				error: function () {
					alert(registFail);
				}
			})
		}
	});

});

