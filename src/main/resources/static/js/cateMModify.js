jQuery.fn.serializeObject = function() {
	var obj = null;
	var cateLCode;
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
		"cateMCode":$("#cateMCode").val()
	}
	$.ajax({
		url			: "/getCateMView",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(arg){
			data = arg.data;
			cateLCode = data.cateLCode;
			$("#cateMName").val(data.cateMName);
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

var getCateL = function(){
	var sendData= {
	};
	$.ajax({
		url			: "/getCateLList",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(data){
			list = data.list;
			$("#cateL").empty();

			var option = $("<option value='0'>" + defaultSelect + "</option>");
			$("#cateL").append(option);
			for(var i=0;i<list.length;i++){
				if(eval(cateLCode) == list[i].cateLCode){
					var option = $("<option value='"+list[i].cateLCode+"' selected>"+list[i].cateLName+"</option>");
				}else{
					var option = $("<option value='"+list[i].cateLCode+"'>"+list[i].cateLName+"</option>");
				}

				$("#cateL").append(option);
			}
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};
getCateL();
var goModify = function(productCode){
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
		location.href='/cateMList';
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
			if(eval($("#cateL").val()) == 0 ){
				alert(selectLargeCategory);
				return false;
			}
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/modifyCateM",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert(registSuccess);
					location.href='/cateMList'
				},
				error: function () {
					alert(registFail);
				}
			})
		}
	});

});

