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
	var list;
	var getList = function(page) {
		var pageSize = $("#pageSize option:selected").val();
		var sendData= {
			"page":page,
			"pageSize" : pageSize
		};

		$.ajax({
			url : "/getCateLList",
			type : "post",
			contentType: 'application/json',
			dataType : 'json',
			data: JSON.stringify(sendData),
			success		: function(data) {
				list = data.list;
				$("#data").empty();
				for(var i=0; i<list.length; i++) {
					var row="";
					row += "<tr><td><p class=\"tbl_chk\"><input id=\"chk" + i + "\" name=\"chk[]\" type=\"checkbox\" value='";
					row += list[i].cateLCode;
					row += "'><label for=\"chk"+i+"\">" + select + "</label></p></td><td>";
					row += (((data.total - ((page-1) * pageSize)) - i));
					row += "</td><td class=\"ttl\"><p class=\"link\">";
					row += "<a href=\"javascript:;\" data-code='";
					row += list[i].cateLCode;
					row += "'>";
					row += list[i].cateLName;
					row += "(";
					row += list[i].cnt;
					row += ")</a></p></td><td>";
					row += list[i].regdate;
					row += "</td><td><a class=\"tbl_squr_btn\" data-code='";
					row += list[i].cateLCode;
					row += "' href=\"javascript:;\">";
					row += modify;
					row += "</a></td></tr>";

					$("#data").append(row);
				}

				$("#data").on("click",".tbl_squr_btn", function(e) {
					var cateLCode = $(this).data("code");
					var form = $('<form></form>');
					form.attr('action', "/cateLModify");
					form.attr('method', 'post');
					form.appendTo('body');
					var cateLCode = $("<input type='hidden' value="+cateLCode+" name='cateLCode'>");
					form.append(cateLCode);
					form.submit();
				});

				$("#data").on("click",".link a", function(e) {
					var cateLCode = $(this).data("code");
					var form = $('<form></form>');
					form.attr('action', "/cateLModify");
					form.attr('method', 'post');
					form.appendTo('body');
					var cateLCode = $("<input type='hidden' value="+cateLCode+" name='cateLCode'>");
					form.append(cateLCode);
					form.submit();
				});
				pagination(data.navigateFirstPage, data.navigateLastPage, data.navigatepageNums, page);
			},
			error	: function(request,status,error) {
				console.log(error);
				alert(commonError);
			}
		});
	};

	var pagination = function(firstNum, lastNum, paging, page) {
		$("#paging").empty();
		for(var i=0; i<paging.length; i++) {
			var pageNum = paging[i];
			if(pageNum == page) {
				var obj = "<li><a class=\"on\" href=\"javascript:;\">"+pageNum+"</a></li>";
			} else {
				var obj = "<li data-page='"+pageNum+"'><a href=\"javascript:;\">"+pageNum+"</a></li>";
			}

			$("#paging").append(obj);
		}
		$("#paging li").unbind("click").bind("click",function() {
			if($(this).data("page") != undefined) {
				getList($(this).data("page"));
			}
		});

		$("#pageFirst").unbind("click").bind("click",function() {
			getList(firstNum);
		});

		$("#pageLast").unbind("click").bind("click",function() {
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

	$("#btnReg").on("click", function(e) {
		location.href='/cateLReg';
	});

	$("#btnDel").on("click", function(e) {
		var chkArray = new Array();

		$("input[name='chk[]']:checked").each(function() {
			var tmpVal = $(this).val();
			chkArray.push(tmpVal);
		});

		if(chkArray.length < 1 ) {
			alert(selectDelete);
			return;
		} else {
			var tagMapping = false;
			for(var i=0; i<list.length; i++) {
				for(var j=0; j<chkArray.length; j++) {
					if(list[i].cateLCode == chkArray[j]) {
						if(list[i].cnt > 0) {
							tagMapping = true;
						}
					}
				}
			}
			if(tagMapping) {
				alert(cantDeleteCategory);
			} else {
				if(confirm(checkDelete)) {
					var str = chkArray.join(",");
					var sendData= {
						"arrId":str
					};

					$.ajax({
						url : "/deleteCateL",
						type : "post",
						contentType : 'application/json',
						dataType : 'json',
						data: JSON.stringify(sendData),
						success : function(data){
							alert(deleteSuccess);
							location.reload();
						},
						error : function(request,status,error){
							console.log(error);
							alert(commonError);
						}
					});
				}
			}
		}
	});

	getList(1);
});

