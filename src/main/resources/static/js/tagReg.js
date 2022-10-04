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
var cateLCode;
var cateMCode;
var cateSCode;
var productCode;


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
				if(list[i].cateLCode == cateLCode){
					var option = $("<option value='"+list[i].cateLCode+"' selected>"+list[i].cateLName+"</option>");
				}else{
					var option = $("<option value='"+list[i].cateLCode+"'>"+list[i].cateLName+"</option>");
				}

				$("#cateL").append(option);
			}

			if($("#cateL option:selected").val() != 0){
				getCateM();
			}
			$("#cateL").on( "change", function() {
				getCateM();
			});
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};

getCateL();
var getCateM = function(){
	var sendData= {
		"cateLCode":$("#cateL option:selected").val()
	};
	$.ajax({
		url			: "/getCateMList",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(data){
			list = data.list;
			$("#cateM").empty();

			var option = $("<option value='0'>" + defaultSelect + "</option>");
			$("#cateM").append(option);
			for(var i=0;i<list.length;i++){
				if(list[i].cateMCode == cateMCode) {
					var option = $("<option value='"+list[i].cateMCode+"' selected>"+list[i].cateMName+"</option>");
				}else{
					var option = $("<option value='"+list[i].cateMCode+"'>"+list[i].cateMName+"</option>");
				}
				$("#cateM").append(option);
			}

			if($("#cateM option:selected").val() != 0){
				getCateS();
			}
			$("#cateM").on( "change", function() {
				getCateS();
			});
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};
var getCateS = function(){
	var sendData= {
		"cateMCode":$("#cateM option:selected").val()
	};
	$.ajax({
		url			: "/getCateSList",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(data){
			list = data.list;
			$("#cateS").empty();

			var option = $("<option value='0'>" + defaultSelect + "</option>");
			$("#cateS").append(option);
			for(var i=0;i<list.length;i++){
				if(list[i].cateSCode == cateSCode) {
					var option = $("<option value='"+list[i].cateSCode+"' selected>"+list[i].cateSName+"</option>");
				}else{
					var option = $("<option value='"+list[i].cateSCode+"'>"+list[i].cateSName+"</option>");
				}

				$("#cateS").append(option);
			}

			if($("#cateS option:selected").val() != 0){
				getProductList();
			}
			$("#cateS").on( "change", function() {
				getProductList();
			});

		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};
var getProductList = function(page){
	var sendData= {
		"page":1,
		"pageSize" : 10000000
	}

	if($("#cateL option:selected").val() != undefined){
		sendData.cateL = $("#cateL option:selected").val();
	}

	if($("#cateM option:selected").val() != undefined){
		sendData.cateM = $("#cateM option:selected").val();
	}

	if($("#cateS option:selected").val() != undefined){
		sendData.cateS = $("#cateS option:selected").val();
	}

	$.ajax({
		url			: "/getProductList",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(data){
			list = data.list;
			$("#productCode").empty();

			var option = $("<option value='0'>" + defaultSelect + "</option>");
			$("#productCode").append(option);
			for(var i=0;i<list.length;i++){
				if(list[i].productCode == productCode) {
					var option = $("<option value='"+list[i].productCode+"' selected>"+list[i].productName+"</option>");
				}else{
					var option = $("<option value='"+list[i].productCode+"'>"+list[i].productName+"</option>");
				}

				$("#productCode").append(option);
			}
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});
};

var getGatewayInfo = function(){
	var sendData= {
		"gatewayCode":$("#gatewayCode").val()
	};
	$.ajax({
		url			: "/getGatewayView",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(data){
			$("#gatewayID").val(data.data.gatewayID);
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});
};

getGatewayInfo();

$(document).ready(function () {
	$('#btnCancel').click(function(){
		location.href='/tagList';
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
			tagID: {
				required: true,
			}
		},
		messages: {
			tagID: {
				required: enterTagCode
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/insertTag",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert(registSuccess);
					location.href='/tagList'
				},
				error: function () {
					alert(registFail);
				}
			})
		}
	});

});

