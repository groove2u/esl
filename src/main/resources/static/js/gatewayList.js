
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

		$.ajax({
			url			: "/getGatewayList",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){

				console.log(data);

				list = data.list;
				$("#data").empty();

				for(var i=0;i<list.length;i++){
							if(list[i].status == "1"){
						list[i].statusTxt = "연결";
					}else{
						list[i].statusTxt = "미연결";

					}

					var row="";
					row +="            <tr>													";
					row +="                <td>												";
					row +="                    <p class=\"tbl_chk\">									";
					row +="                    <input id=\"chk"+i+"\" name=\"chk[]\" type=\"checkbox\" value='"+list[i].gatewayCode+"'>				 ";
					row +="                        <label for=\"chk"+i+"\">선택</label>							";
					row +="                    </p>												 ";
					row +="                </td>												 ";
					row +="                <td>"+(((data.total - ((page-1) * pageSize))- i)) +"</td>											";
					row +="            <td>"+list[i].gatewayID+"("+list[i].cnt+")</td>										      ";
					row +="            <td>"+list[i].desc+"</td>										      ";
					row +="            <td>												      ";
					row +="                <p class=\"regi_stat\">등록("+list[i].statusTxt+")</p>					       ";
					row +="            </td>												       ";
					row +="            <td>"+list[i].location+"</td>										       ";
					row +="            <td>"+list[i].regdate+"</td>										      ";
					row +="            <td><a class=\"tbl_squr_btn\" data-code='"+list[i].gatewayCode+"' href=\"javascript:;\">수정</a></td>		";
					row +="        </tr>";



					$("#data").append(row);
				}
				$("#data").on("click",".tbl_squr_btn", function(e){
					var gatewayCode = $(this).data("code");
					var form = $('<form></form>');
					form.attr('action', "/gatewayModify");
					form.attr('method', 'post');
					form.appendTo('body');
					var gatewayCode = $("<input type='hidden' value="+gatewayCode+" name='gatewayCode'>");
					form.append(gatewayCode);
					form.submit();
					console.log(gatewayCode)
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
		location.href='/gatewayReg';
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
					if(list[i].gatewayCode == chkArray[j]){
						if(list[i].cnt > 0){
							tagMapping = true;
						}
					}
				}
			}
			if(tagMapping){
				alert('태그가 존재하는 게이트웨이는 삭제할수없습니다.')
			}else{

				if(confirm("선택한 항목을 삭제하시겠습니까?")) {


					var str = chkArray.join(",");
					var sendData= {
						"arrId":str
					};

					$.ajax({
						url			: "/deleteGateway",
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

