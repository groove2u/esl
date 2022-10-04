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

var goModify = function(productCode){
	var form = $('<form></form>');
	form.attr('action', "/productView");
	form.attr('method', 'post');
	form.appendTo('body');
	var productCode = $("<input type='hidden' value=" + productCode + " name='productCode'>");
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
		onkeyup : false,
		onclick : false,
		onfocusout : false,
		showErrors : function(errorMap,errorList){
			if(this.numberOfInvalids()){ // 에러가 있으면
				alert(errorList[0].message); // 경고창으로 띄움
			}
		}
	});

	$("#frm").validate({
		rules: {
			cateLName : {
				required: true,
			}
		},
		messages : {
			cateLName : {
				required: enterName
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url : "/insertCateL",
				type : "POST",
				contentType : 'application/json',
				dataType : 'json',
				data : JSON.stringify(model_data),
				success : function () {
					alert(registSuccess);
					location.href='/cateLList'
				},
				error : function () {
					alert(registFail);
				}
			})
		}
	});
});

