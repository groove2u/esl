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

var goModify = function(productCode){
	alert(productCode);
	var form = $('<form></form>');
	form.attr('action', "/productView");
	form.attr('method', 'post');
	form.appendTo('body');
	var productCode = $("<input type='hidden' value="+productCode+" name='productCode'>");
	form.append(productCode);
	form.submit();
};
$(document).ready(function () {
	var getData = function(){
		var sendData= {
			"productCode":$("#productCode").val()
		}
		$.ajax({
			url			: "/getProductView",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(arg){
				data = arg.data;
				cateLCode = data.cateLCode;
				cateMCode = data.cateMCode;
				cateSCode = data.cateSCode;

				$("#productName").val(data.productName);
				$("#price").val(data.price);
				$("#discount").val(data.discount);
				$("#saleStart").val(data.saleStart);
				$("#saleEnd").val(data.saleEnd);
				$("#position").val(data.position);
				$("textarea#desc").val(data.desc);
				var saleType = data.saleType;
				if(saleType == 0){
					$("input:radio[id='bundle1']").prop("checked", true);
				}else if(saleType == 1){
					$("input:radio[id='bundle2']").prop("checked", true);
				}else if(saleType == 2){
					$("input:radio[id='bundle3']").prop("checked", true);
				}
				getCateL();

			},
			error	: function(request,status,error){
				console.log(error);
				alert(commonError);
			}
		});

	};
	var getList = function(){
		var sendData= {
			"productCode":$("#productCode").val()
		}
		$.ajax({
			url			: "/getProductTagList",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){
				list = data.list;
				$("#list").empty();
				var row = "";
				row += "<dl class=\"discnt\">";
				row += "<dt>" + manageTag + "</dt>";
				row += "<dd>";
				row += "<div class=\"tag_mng_btns\">";
				row += "<a class=\"reg\" id=\"tagRegBtn\" href=\"javascript:;\">" + regist + "</a>";
				row += "</div>";
				row += "</dd>";
				row += "</dl>";
				$("#data").append(row);

				$('#tagRegBtn').on('click', function(event) {
					$("#tagReg").show();
				});

				for(var i=0;i<list.length;i++){
					var row = "";
					let count = 0;
					row += "<dl class=\"discnt\">";
					row += "<dt></dt>";
					row += "<dd>";
					row += "<strong class=\"tag_code\">";
					row += list[i].tagID;
					row += " (";
					if(list[i].gate1 !== undefined) {
						row += list[i].gate1 + ":" + list[i].signal1 + ", ";
						count += 1;
					}
					if(list[i].gate2 !== undefined) {
						row += list[i].gate2 + ":" + list[i].signal2 + ", " ;
						count += 1;
					}
					if(list[i].gate3 !== undefined) {
						row += list[i].gate3 + ":" + list[i].signal3;
						count += 1;
					}
					if(count == 0) {
						row += noSignal;
					}
					row += ")";
					row += "</strong><div class=\"tag_mng_btns\">";
					row += "<a class=\"del\" id='delMapping" + i + "' data-code='" + list[i].tagCode + "' href=\"javascript:;\">" + erase + "</a>";
					row += "</div>";
					row += "</dd>";
					row += "</dl>";

					$("#data").append(row);
					$("#data").on("click","#delMapping"+i, function(e){
						if(confirm(checkDelete)) {
							var tagCode = $(this).data("code");
							var sendData= {
								"arrId":tagCode
							};

							$.ajax({
								url			: "/deleteTagMapping",
								type		: "post",
								contentType: 'application/json',
								dataType:'json',
								data: JSON.stringify(sendData),
								success		: function(data){
									alert(deleteSuccess);
									location.reload();
								},
								error	: function(request,status,error){
									console.log(error);
									alert(commonError);
								}
							});
						}
					});
				}
			},
			error	: function(request,status,error){
				console.log(error);
				alert(commonError);
			}
		});

	};
	getList();
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

	$('#cancel').click(function(){
		location.href='/productList';
	});

	$('#submit').click(function(){
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
			productName: {
				required: true,
			},
			price: {
				required: true
			}
		},
		messages: {
			productName: {
				required: enterProductName
			},
			price: {
				required: enterPrice
			}
		},
		submitHandler: function () {
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/productModify",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert(registSuccess);
					location.href='/productList'
				},
				error: function () {
					alert(registFail);
				}
			})
		}
	});
});


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

