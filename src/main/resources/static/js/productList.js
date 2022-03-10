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
	console.log("onLoad");

	var productName;
	var list;


	var packingParam = function(obj){

		console.log($(obj).serialize());
	}
	var getList = function(page){

		var pageSize = $("#pageSize option:selected").val();

		console.log("pageSize="+pageSize);


		var sendData= {
			"page":page,
			"pageSize" : pageSize
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
		if(productName != undefined && productName != "" ){
			sendData.productName = productName;
		}
		packingParam(sendData);
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
				$("#data").empty();

				for(var i=0;i<list.length;i++){

					var saleTxt="";
					switch ( eval(list[i].saleType) ) {
						case 0:
							saleTxt = "할인없음";
							break;
						case 1:
							saleTxt = "1+1";
							break;
						case 2:
							saleTxt = "2+1";
							break;
						default:
							saleTxt = "할인없음";
					}

					var row="";
					row +="        <tr>												";
					row +="            <td>												";
					row +="                <p class=\"tbl_chk\">									";
					row +="                    <input id=\"chk"+i+"\" name=\"chk[]\" type=\"checkbox\" value='"+list[i].productCode+"'>				 ";
					row +="                    <label for=\"chk"+i+"\">선택</label>						";
					row +="                </p>											 ";
					row +="            </td>												 ";
					row +="                <td>"+(((data.total - ((page-1) * pageSize))- i)) +"</td>											";
					row +="            <td>"+list[i].productName+"("+list[i].cnt+")</td>										";
					row +="            <td>"+list[i].desc+"</td>									";
					row +="            <td><strong>"+list[i].discount+"</strong>%</td>							 ";
					row +="            <td>"+list[i].saleStart+"~"+list[i].saleEnd+"</td>									";
					row +="            <td>"+saleTxt+"</td>										 ";
					row +="            <td>"+numberWithCommas(list[i].price)+"</td>										";
					row +="            <td>"+list[i].regdate+"</td>									";
					row +="            <td><a class=\"tbl_squr_btn\" id='modifyBtn' style='cursor:hand;' onclick='javascript:goModify("+list[i].productCode+")'\">수정</a></td>		";
					row +="        </tr>												 ";

					$("#data").append(row);
				}

				pagination(data.navigateFirstPage,data.navigateLastPage,data.navigatepageNums,page);

			},
			error	: function(request,status,error){
				console.log(error);
				alert("조회중 오류가 발생하였습니다.");
			}
		});

	};
	var pagination = function(firstNum,lastNum,paging,page){
		//console.log(paging);
		$("#paging").empty();
		for(var i=0;i<paging.length;i++){

			var pageNum = paging[i];
			if(pageNum == page){
				var obj = "<li><a class=\"on\" href=\"javascript:;\">"+pageNum+"</a></li>";
			}else{
				var obj = "<li data-page='"+pageNum+"'><a href=\"javascript:;\">"+pageNum+"</a></li>";
			}
			$("#paging").append(obj);
		}
		$("#paging li").unbind("click").bind("click",function(){
			if($(this).data("page") != undefined){
				getList($(this).data("page"));
			}
		});
		$("#pageFirst").unbind("click").bind("click",function(){
			getList(firstNum);
		});
		$("#pageLast").unbind("click").bind("click",function(){
			getList(lastNum);
		});

	}

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
					var option = $("<option value='"+list[i].cateLCode+"'>"+list[i].cateLName+"</option>");

					$("#cateL").append(option);
				}
				$("#cateL").on( "change", function() {
					getCateM();
					getList(1);
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
					var option = $("<option value='"+list[i].cateMCode+"'>"+list[i].cateMName+"</option>");
					$("#cateM").append(option);
				}
				$("#cateM").on( "change", function() {
					getCateS();
					getList(1);
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
					var option = $("<option value='"+list[i].cateSCode+"'>"+list[i].cateSName+"</option>");

					$("#cateS").append(option);
				}
				$("#cateS").on( "change", function() {
					getList(1);
				});

			},
			error	: function(request,status,error){
				console.log(error);
				alert("조회중 오류가 발생하였습니다.");
			}
		});

	};
	$("#pageSize").on( "change", function() {
		getList(1);
	});
	$("#btnSearch").on("click", function(e){
		e.preventDefault();
		productName =  $("#productName").val();
		if(productName == "" ||productName == undefined){
			alert('상품명을 입력해주세요');
		}else{
			getList(1);
		}
	});
	$('#chkAll').change(function () {
		var $this = $(this);
		var checked = $this.prop('checked'); // checked 문자열 참조(true, false)
		console.log(checked);
		$('input[name="chk[]"]').prop('checked', checked);

	});
	$("#btnClear").on("click", function(e){
		$("#cateL").empty();
		var option = $("<option value='0'>----선택----</option>");
		$("#cateL").append(option);

		$("#cateM").empty();
		var option = $("<option value='0'>----선택----</option>");
		$("#cateM").append(option);

		$("#cateS").empty();
		var option = $("<option value='0'>----선택----</option>");
		$("#cateS").append(option);

		getList(1);
	});

	$("#btnDel").on("click", function(e){

		var chkArray = new Array();

		$("input[name='chk[]']:checked").each(function() {
			var tmpVal = $(this).val();
			chkArray.push(tmpVal);
		});

		if( chkArray.length < 1 ){
			alert("삭제할 상품을 선택해주시기 바랍니다.");
			return;
		}else{
			var tagMapping = false;
			for(var i=0;i<list.length;i++){
				for(var j=0;j<chkArray.length;j++){
					if(list[i].productCode == chkArray[j]){
						if(list[i].cnt > 0){
							tagMapping = true;
						}
					}
				}
			}
			if(tagMapping){
				alert('태그가맵핑되어있는 상품은 삭제할수없습니다.')
			}else{

				if(confirm("선택한 상품을 삭제하시겠습니까?")) {


					var str = chkArray.join(",");
					var sendData= {
						"arrId":str
					};

					$.ajax({
						url			: "/deleteProduct",
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
			}
		}
		console.log(chkArray);	// (2) ["A", "B"]
	});

	getList(1);
	getCateL();
});

