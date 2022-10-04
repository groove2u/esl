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
	var list;
	var getList = function(page) {
		var pageSize = $("#pageSize option:selected").val();
		var sendData= {
			"page":page,
			"pageSize" : pageSize
		}

		if($("#cateL option:selected").val() != undefined){
			sendData.cateLCode = $("#cateL option:selected").val();
		}

		if($("#cateM option:selected").val() != undefined){
			sendData.cateMCode = $("#cateM option:selected").val();
		}

		$.ajax({
			url			: "/getCateSList",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){
				list = data.list;
				$("#data").empty();

				for(var i=0;i<list.length;i++){
					var row="";
					row += "<tr>";
					row += "<td>";
					row += "<p class=\"tbl_chk\">";
					row += "<input id=\"chk"+i+"\" name=\"chk[]\" type=\"checkbox\" value='"+list[i].cateSCode+"'>";
					row += "<label for=\"chk"+i+"\">" + select + "</label>";
					row += "</p></td>";
					row += "<td>"+(((data.total - ((page-1) * pageSize))- i)) +"</td>";
					row += "<td class=\"ttl\">";
					row += "<p class=\"link\">";
					row += "<a href=\"javascript:;\">"+list[i].cateSName+"("+list[i].cnt+")</a>";
					row += "</p></td>";
					row += "<td>"+list[i].regdate+"</td>";
					row += "<td><a class=\"tbl_squr_btn\" data-code='"+list[i].cateSCode+"' href=\"javascript:;\">" + modify + "</a></td>";
					row += "</tr>";

					$("#data").append(row);
				}
				$("#data").on("click",".tbl_squr_btn", function(e){
					var cateSCode = $(this).data("code");
					var form = $('<form></form>');
					form.attr('action', "/cateSModify");
					form.attr('method', 'post');
					form.appendTo('body');
					var cateSCode = $("<input type='hidden' value="+cateSCode+" name='cateSCode'>");
					form.append(cateSCode);
					form.submit();
				});

				pagination(data.navigateFirstPage,data.navigateLastPage,data.navigatepageNums,page);
			},
			error	: function(request,status,error){
				console.log(error);
				alert(commonError);
			}
		});
	};

	var pagination = function(firstNum,lastNum,paging,page){
		$("#paging").empty();
		for(var i=0; i<paging.length; i++) {
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
				$("#cateL").empty();
				var option = $("<option value='0'>" + defaultSelect + "</option>");
				$("#cateL").append(option);
				for(var i=0;i<list.length;i++){
					var option = $("<option value='"+list[i].cateLCode+"'>"+list[i].cateLName+"</option>");
					$("#cateL").append(option);
				}
				$("#cateL").on( "change", function() {
					$("#cateM").val('0');
					getCateM();
					getList(1);
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
					var option = $("<option value='"+list[i].cateMCode+"'>"+list[i].cateMName+"</option>");
					$("#cateM").append(option);
				}
				$("#cateM").on( "change", function() {
					getList(1);
				});
			},
			error	: function(request,status,error){
				console.log(error);
				alert(commonError);
			}
		});
	};

	getCateM();

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
		cateMCode = $("#cateM").val();
		var form = $('<form></form>');
		form.attr('action', "/cateSReg");
		form.attr('method', 'post');
		form.appendTo('body');
		var cateLCode = $("<input type='hidden' value="+cateLCode+" name='cateLCode'>");
		var cateMCode = $("<input type='hidden' value="+cateMCode+" name='cateMCode'>");

		form.append(cateLCode);
		form.append(cateMCode);
		form.submit();
	});

	$("#btnDel").on("click", function(e) {
		var chkArray = new Array();
		$("input[name='chk[]']:checked").each(function() {
			var tmpVal = $(this).val();
			chkArray.push(tmpVal);
		});

		if( chkArray.length < 1 ){
			alert(selectDelete);
			return;
		} else {
			var tagMapping = false;
			for(var i=0;i<list.length;i++){
				for(var j=0;j<chkArray.length;j++){
					if(list[i].cateSCode == chkArray[j]){
						if(list[i].cnt > 0){
							tagMapping = true;
						}
					}
				}
			}
			if(tagMapping){
				alert(cantDeleteCategory);
			} else {
				if(confirm(checkDelete)) {
					var str = chkArray.join(",");
					var sendData= {
						"arrId":str
					};

					$.ajax({
						url			: "/deleteCateS",
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
			}
		}

		console.log(chkArray);	// (2) ["A", "B"]
	});

	getList(1);
});

