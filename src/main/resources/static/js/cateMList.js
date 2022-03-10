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

	var list;
	var getList = function(page){

		var pageSize = $("#pageSize option:selected").val();

		console.log("pageSize="+pageSize);


		var sendData= {
			"page":page,
			"pageSize" : pageSize
		}

		if($("#cateL option:selected").val() != undefined){
			sendData.cateLCode = $("#cateL option:selected").val();
		}
		$.ajax({
			url			: "/getCateMList",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){

				console.log(data);

				list = data.list;
				$("#data").empty();

				for(var i=0;i<list.length;i++){

					var row="";
					row +="            <tr>													";
					row +="                <td>												";
					row +="                    <p class=\"tbl_chk\">									";
					row +="                    <input id=\"chk"+i+"\" name=\"chk[]\" type=\"checkbox\" value='"+list[i].cateMCode+"'>				 ";
					row +="                        <label for=\"chk"+i+"\">선택</label>							";
					row +="                    </p>												 ";
					row +="                </td>												 ";
					row +="                <td>"+(((data.total - ((page-1) * pageSize))- i)) +"</td>											";
					row +="                <td class=\"ttl\">											 ";
					row +="                    <p class=\"link\">										";
					row +="                        <a href=\"javascript:;\" data-code='"+list[i].cateMCode+"'>"+list[i].cateMName+"("+list[i].cnt+")</a>							 ";
					row +="                    </p>												 ";
					row +="                </td>												 ";
					row +="                <td>"+list[i].regdate+"</td>										";
					row +="                <td><a class=\"tbl_squr_btn\" data-code='"+list[i].cateMCode+"' href=\"javascript:;\">수정</a></td>		";
					row +="            </tr>													 ";


					$("#data").append(row);
				}
				$("#data").on("click",".tbl_squr_btn", function(e){

					var cateMCode = $(this).data("code");



					var form = $('<form></form>');
					form.attr('action', "/cateMModify");
					form.attr('method', 'post');
					form.appendTo('body');
					var cateMCode = $("<input type='hidden' value="+cateMCode+" name='cateMCode'>");
					form.append(cateMCode);
					form.submit();
					console.log(cateMCode)
				});
				$("#data").on("click",".link a", function(e){
					var cateMCode = $(this).data("code");



					var form = $('<form></form>');
					form.attr('action', "/cateMModify");
					form.attr('method', 'post');
					form.appendTo('body');
					var cateMCode = $("<input type='hidden' value="+cateMCode+" name='cateMCode'>");
					form.append(cateMCode);
					form.submit();
					console.log(cateMCode)
				});



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
					getList(1);
				});
			},
			error	: function(request,status,error){
				console.log(error);
				alert("조회중 오류가 발생하였습니다.");
			}
		});

	};
	getCateL();
	$("#pageSize").on( "change", function() {
		getList(1);
	});
	$('#chkAll').change(function () {
		var $this = $(this);
		var checked = $this.prop('checked'); // checked 문자열 참조(true, false)
		console.log(checked);
		$('input[name="chk[]"]').prop('checked', checked);

	});
	$("#btnReg").on("click", function(e){

		cateLCode = $("#cateL").val();
		var form = $('<form></form>');
		form.attr('action', "/cateMReg");
		form.attr('method', 'post');
		form.appendTo('body');
		var productCode = $("<input type='hidden' value="+cateLCode+" name='cateLCode'>");
		form.append(productCode);
		form.submit();



	});
	$("#btnDel").on("click", function(e){

		var chkArray = new Array();

		$("input[name='chk[]']:checked").each(function() {
			var tmpVal = $(this).val();
			chkArray.push(tmpVal);
		});

		if( chkArray.length < 1 ){
			alert("삭제할 항목을 선택해주세요.");
			return;
		}else{
			var tagMapping = false;
			for(var i=0;i<list.length;i++){
				for(var j=0;j<chkArray.length;j++){
					if(list[i].cateMCode == chkArray[j]){
						if(list[i].cnt > 0){
							tagMapping = true;
						}
					}
				}
			}
			if(tagMapping){
				alert('상품이 존재하는 카테고리는 삭제할수없습니다.')
			}else{

				if(confirm("선택한 항목을 삭제하시겠습니까?")) {


					var str = chkArray.join(",");
					var sendData= {
						"arrId":str
					};

					$.ajax({
						url			: "/deleteCateM",
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
});

