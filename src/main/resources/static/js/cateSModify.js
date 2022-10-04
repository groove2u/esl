var cateLCode;
var cateMCode;
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
		"cateSCode":$("#cateSCode").val()
	}

	$.ajax({
		url			: "/getcateSView",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(arg){
			data = arg.data;
			cateLCode = data.cateLCode;
			cateMCode = data.cateMCode;
			$("#cateSName").val(data.cateSName);
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
		url : "/getCateLList",
		type : "post",
		contentType: 'application/json',
		dataType : 'json',
		data : JSON.stringify(sendData),
		success : function(data){
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
			getCateM();
		},
		error : function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});
};

getCateL();

var getCateM = function() {
	var sendData= {
		"cateLCode":$("#cateL option:selected").val()
	};

	$.ajax({
		url : "/getCateMList",
		type : "post",
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(sendData),
		success	: function(data){
			list = data.list;
			$("#cateM").empty();
			var option = $("<option value='0'>" + defaultSelect + "</option>");
			$("#cateM").append(option);
			for(var i=0;i<list.length;i++){

				if(eval(cateMCode) == list[i].cateMCode){
					var option = $("<option value='"+list[i].cateMCode+"' selected>"+list[i].cateMName+"</option>");
				}else{
					var option = $("<option value='"+list[i].cateMCode+"'>"+list[i].cateMName+"</option>");
				}

				$("#cateM").append(option);
			}
			$("#cateM").on( "change", function() {

			});
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};
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
		location.href='/cateSList';
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

			if(eval($("#cateM").val()) == 0 ){
				alert(selectMiddleCategory);
				return false;
			}
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/modifyCateS",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert(registSuccess);
					location.href='/cateSList'
				},
				error: function () {
					alert(registFail);
				}
			})
		}
	});

});

