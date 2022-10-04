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
	}finally {
	}
	return obj;
}

var getCateL = function(){
	var sendData= {};

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
				if(eval($("#cateLCode").val()) == list[i].cateLCode){
					var option = $("<option value='"+list[i].cateLCode+"' selected>"+list[i].cateLName+"</option>");
				}else{
					var option = $("<option value='"+list[i].cateLCode+"'>"+list[i].cateLName+"</option>");
				}

				$("#cateL").append(option);
			}
			getCateM();
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};

var getCateM = function(){
	var sendData= {
		"cateLCode": $("#cateL option:selected").val()
	};
	$.ajax({
		url : "/getCateMList",
		type : "post",
		contentType : 'application/json',
		dataType :'json',
		data : JSON.stringify(sendData),
		success : function(data){
			list = data.list;
			$("#cateM").empty();
			var option = $("<option value='0'>" + defaultSelect + "</option>");
			$("#cateM").append(option);

			for(var i=0; i<list.length; i++) {
				if(eval($("#cateMCode").val()) == list[i].cateMCode) {
					var option = $("<option value='"+list[i].cateMCode+"' selected>"+list[i].cateMName+"</option>");
				} else {
					var option = $("<option value='"+list[i].cateMCode+"'>"+list[i].cateMName+"</option>");
				}

				$("#cateM").append(option);
			}
			$("#cateM").on( "change", function() {
			});
		},
		error	: function(request,status,error) {
			console.log(error);
			alert(commonError);
		}
	});
};

var goModify = function(productCode) {
	var form = $('<form></form>');
	form.attr('action', "/productView");
	form.attr('method', 'post');
	form.appendTo('body');
	var productCode = $("<input type='hidden' value="+productCode+" name='productCode'>");
	form.append(productCode);
	form.submit();
};

$(document).ready(function () {
	getCateL();
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
			cateMName: {
				required: true,
			}
		},
		messages: {
			cateMName: {
				required: enterName
			}
		},
		submitHandler: function () {
			if(eval($("#cateL").val()) == 0 ) {
				alert(selectLargeCategory);
				return false;
			}

			if(eval($("#cateM").val()) == 0 ) {
				alert(selectMiddleCategory);
				return false;
			}

			model_data = $("#frm").serializeObject();

			$.ajax({
				url: "/insertCateS",
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

