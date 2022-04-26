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
	console.log("onLoad");
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

				console.log(arg);

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
				alert("조회중 오류가 발생하였습니다.");
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

				console.log(data);

				list = data.list;
				$("#list").empty();
				var row="";
				row +="    <dl class=\"discnt\">									";
				row +="        <dt>태그관리</dt>								      ";
				row +="        <dd>										       ";
				row +="            <div class=\"tag_mng_btns\">					       ";
				row +="                <a class=\"reg\" id=\"tagRegBtn\" href=\"javascript:;\">등록</a>	       ";
				row +="            </div>										       ";
				row +="        </dd>										       ";
				row +="    </dl>											       ";
				$("#data").append(row);
				$('#tagRegBtn').on('click', function(event) {
					$("#tagReg").show();
				});

				for(var i=0;i<list.length;i++){
					var row="";
					row +="    <dl class=\"discnt\">									";
					row +="        <dt></dt>								      ";
					row +="        <dd>										       ";
					row +="            <strong class=\"tag_code\">"+list[i].tagID+"("+list[i].gate1+":"+list[i].signal1+","+list[i].gate2+":"+list[i].signal2+","+list[i].gate3+":"+list[i].signal3+")</strong>	      ";
					row +="            <div class=\"tag_mng_btns\">					       ";
					row +="                <a class=\"del\" id='delMapping"+i+"' data-code='"+list[i].tagCode+"' href=\"javascript:;\">삭제</a>	      ";
					row +="            </div>										       ";
					row +="        </dd>										       ";
					row +="    </dl>											       ";

					$("#data").append(row);
					$("#data").on("click","#delMapping"+i, function(e){

						console.log("tagMapping Delete Call");
						if(confirm("선택한 항목을 삭제하시겠습니까?")) {

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
									console.log(data);

									alert('성공적으로 삭제하였습니다.');
									location.reload();

								},
								error	: function(request,status,error){
									console.log(error);
									alert("조회중 오류가 발생하였습니다.");
								}
							});

						}
					});

				}

			},
			error	: function(request,status,error){
				console.log(error);
				alert("조회중 오류가 발생하였습니다.");
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
				required: '상품명을 입력해주세요.'
			},
			price: {
				required: '가격을 입력해주세요.'
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
					alert("등록완료하였습니다");
					location.href='/productList'
				},
				error: function () {
					alert("등록실패하였습니다.");
				}
			})
		}
	});

});

