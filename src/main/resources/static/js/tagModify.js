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

var getData = function() {
	var sendData= {
		"tagCode":$("#tagCode").val()
	}
	$.ajax({
		url			: "/getTagView",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(arg){
			data = arg.data;
			cateLCode = data.cateLCode;
			cateMCode = data.cateMCode;
			cateSCode = data.cateSCode;
			productCode = data.productCode;

			$("#tagID").val(data.tagID);
			$("#gatewayID").val(data.gatewayID);
			$("#desc").val(data.desc);
			$(":radio[name='templateCode']").each(function() {
				var $this = $(this);
				if($this.val() == data.templateCode)
					$this.attr('checked', true);
			});

			getCateL();
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};

getData();

var getCateL = function() {
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

var getCateM = function() {
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
			console.log(data);
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

$(document).ready(function () {
	$('#btnCancel').click(function() {
		location.href='/tagList?';
		var url = "/tagList?";
		url = url + "gatewayCode=" + $("#gatewayCode").val()+"&";
		url = url + "signalStat=" + $("#signalStat").val()+"&";
		url = url + "batteryStat=" + $("#batteryStat").val()+"&";
		url = url + "curGatewayCode=" + $("#curGatewayCode").val()+"&";
		url = url + "pageSize=" + $("#pageSize").val()+"&";

		location.href=url;
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
				required: enterGatewayId
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/modifyTag",
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

