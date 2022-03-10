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
			console.log(data);
			$("#cateL").empty();

			var option = $("<option value='0'>----선택----</option>");
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
			alert("조회중 오류가 발생하였습니다.");
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
			console.log(data);
			$("#cateM").empty();

			var option = $("<option value='0'>----선택----</option>");
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
			alert("조회중 오류가 발생하였습니다.");
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
			console.log(data);
			$("#cateS").empty();

			var option = $("<option value='0'>----선택----</option>");
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
			alert("조회중 오류가 발생하였습니다.");
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
	console.log(sendData);


	$.ajax({
		url			: "/getProductList",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(data){

			console.log(data);



			list = data.list;
			console.log(data);
			$("#productCode").empty();

			var option = $("<option value='0'>----선택----</option>");
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
			alert("조회중 오류가 발생하였습니다.");
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

			console.log(data);
			var val = data.data;
			$("#gatewayID").val(val.gatewayID);
		},
		error	: function(request,status,error){
			console.log(error);
			alert("조회중 오류가 발생하였습니다.");
		}
	});

};
getGatewayInfo();
$(document).ready(function () {
	console.log("onLoad");

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
				required: '태그코드를 입력해주세요.'
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
					alert("등록완료하였습니다");
					location.href='/tagList'
				},
				error: function () {
					alert("등록실패하였습니다.");
				}
			})
		}
	});

});

