
$(document).ready(function () {
	var sendData= {
	}
	var curPage = 1;
	var list;
	var generateForm = function(f){
		$.each(sendData, function(attrName, attrValue) {
			var param = $("<input type='hidden' name='"+attrName+"' id='"+attrName+"' value='"+attrValue+"'>");
			f.append(param);
		});
	}

	var getGatewayList = function(page){
		var sendData= {
			"page":1,
			"pageSize" : 10000
		}

		$.ajax({
			url			: "/getGatewayList",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){
				list = data.list;
				$("#gatewayCode").empty();

				var option = $("<option value='0'>" + defaultSelect + "</option>");
				$("#gatewayCode").append(option);

				let curGatewayCode = $("#curGatewayCode").val();
				for(var i=0;i<list.length;i++){

					if(curGatewayCode == list[i].gatewayCode){
						var option = $("<option value='"+list[i].gatewayCode+"' selected>"+list[i].desc+"("+list[i].gatewayID+")</option>");
					}else{
						var option = $("<option value='"+list[i].gatewayCode+"'>"+list[i].desc+"("+list[i].gatewayID+")</option>");
					}

					$("#gatewayCode").append(option);
				}
				$("#gatewayCode").on( "change", function() {
					$("#curGatewayCode").val($("#gatewayCode option:selected").val());
					$("#frm").submit();
				});
			},
			error	: function(request,status,error){
				console.log(error);
				alert(commonError);
			}
		});

	};
	getGatewayList();
	var changeCallStat = function(tagCode,status){
		var sendData= {
			"tagCode":tagCode,
			"isCall":status
		};

		$.ajax({
			url			: "/updateCallTag",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){
				getList(curPage);
			},
			error	: function(request,status,error){
				console.log(error);
			}
		});
	}

	var getTagCount = function(){
		if($("#gatewayCode option:selected").val() != undefined){
			sendData.gatewayCode = $("#gatewayCode option:selected").val();
		}

		$.ajax({
			url			: "/getTagCount",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){
				var obj = data.data;
				var countAll = eval(obj.countAll);
				var countBattery = eval(obj.countBattery);
				var countSignal = eval(obj.countSignal);
				var countCall = eval(obj.countCall);

				$("#countAll").html(countAll);
				$("#countBattery").html(countBattery);
				$("#countSignal").html(countSignal);
				$("#countCall").html(countCall);
			},
			error	: function(request,status,error){
				console.log(error);
				alert(commonError);
			}
		});
	};

	getTagCount();

	var getList = function(page){
		var pageSize = $("#pageSize option:selected").val();
		curPage = page;
		var sendData= {
			"page":page,
			"pageSize" : pageSize
		}

		if($("#curGatewayCode").val() != undefined){
			sendData.gatewayCode = $("#curGatewayCode").val();
		}

		if($("#batteryStat").val() != null && $("#batteryStat").val() != ""){
			sendData.batteryStat = "20";
		}

		if($("#signalStat").val() != null && $("#signalStat").val() != ""){
			sendData.signalStat = "20";
		}

		if($("#isCall").val() != null && $("#isCall").val() != ""){
			sendData.isCall = "Y";
		}

		$.ajax({
			url			: "/getTagList",
			type		: "post",
			contentType: 'application/json',
			dataType:'json',
			data: JSON.stringify(sendData),
			success		: function(data){
				list = data.list.list;
				$("#data").empty();

				for(var i=0;i<list.length;i++){
					var row="";
					row += "<tr>";
					row += "<td>";
					row += "<p class=\"tbl_chk\">";
					row += "<input id=\"chk"+i+"\" name=\"chk[]\" type=\"checkbox\" value='"+list[i].tagCode+"'>";
					row += "<label for=\"chk"+i+"\">" + select + "</label>";
					row += "</p>";
					row += "</td>";
					row += "<td>"+list[i].productName+"</td>";
					row += "<td>"+list[i].cateSName+"</td>";
					row += "<td>"+list[i].tagID+"</td>";
					row += "<td class=\"blue\">"+list[i].gatewayID+"</td>";

					if(eval(list[i].batteryStat) <= data.stdTagStat[0].battery) {
						row += "      <td><p class=\"regi_stat red\"><strong>"+list[i].batteryStat+"</strong>%</p></td>";
					}else{
						row += "      <td><p class=\"regi_stat green\"><strong>"+list[i].batteryStat+"</strong>%</p></td>";
					}

					if(list[i].connectStat == 'Y'){
						row += "      <td><p class=\"regi_stat green\">" + connect + "</p></td>";
					}else{
						row += "      <td><p class=\"regi_stat red\">" + disconnect + "</p></td>";
					}

					if(eval(list[i].signalStat) <= data.stdTagStat[0].signal) {
						row += "      <td><p class=\"regi_stat red\">"+list[i].signalStat+"%</p></td>";
					}else{
						row += "      <td><p class=\"regi_stat green\">"+list[i].signalStat+"%</p></td>";
					}

					if(list[i].isCall == "Y"){
						row += "      <td><i class=\"use_stat yes \" data-code='"+ list[i].tagCode+"|N'>" + use + "</i></td>";
					}else{
						row += "      <td><i class=\"use_stat no \" data-code='"+ list[i].tagCode+"|Y'>" + use + "</i></td>";
					}


					if(list[i].productPair == 'Y'){
						row += "      <td><i class=\"use_stat yes\">" + unuse + "</i></td>";
					}else{
						row += "      <td><i class=\"use_stat no\">" + unuse + "</i></td>";
					}

					row += "      <td>"+list[i].regdate+"</td>";
					row += "       <td><a class=\"tbl_squr_btn\" data-code='"+list[i].tagCode+"' href=\"javascript:;\">" + modify + "</a></td>		";
					row += "  </tr>";

					$("#data").append(row);
				}

				$("#data").on("click",".tbl_squr_btn", function(e){
					var tagCode = $(this).data("code");
					var form = $('<form></form>');
					form.attr('action', "/tagModify");
					form.attr('method', 'post');
					form.appendTo('body');
					var tagCode = $("<input type='hidden' value="+tagCode+" name='tagCode'>");

					form.append(tagCode);
					generateForm(form);
					form.submit();
				});

				$("#data").on("click",".use_stat", function(e){
					if($(this).data("code") != undefined){
						var tagCode = $(this).data("code").split("|")[0];
						var status = $(this).data("code").split("|")[1];

						if(tagCode != undefined && status != undefined){
							changeCallStat(tagCode,status);
						}
					}
				});

				pagination(data.list.navigateFirstPage, data.list.navigateLastPage, data.list.navigatepageNums,page);
				getTagCount();
			},
			error	: function(request,status,error){
				console.log(error);
				alert(commonError);
			}
		});
	};

	var pagination = function(firstNum,lastNum,paging,page){
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
		$("#frm").submit();
	});

	$('#chkAll').change(function () {
		var $this = $(this);
		var checked = $this.prop('checked'); // checked 문자열 참조(true, false)
		$('input[name="chk[]"]').prop('checked', checked);
	});

	$("#btnReg").on("click", function(e){
		if($("#gatewayCode option:selected").val() != '0'){
			var gatewayCode = $("#gatewayCode option:selected").val();
			var form = $('<form></form>');
			form.attr('action', "/tagReg");
			form.attr('method', 'post');
			form.appendTo('body');
			var gatewayCode = $("<input type='hidden' value="+gatewayCode+" name='gatewayCode'>");
			form.append(gatewayCode);
			form.submit();
		}else{
			alert(selectGateway);
		}
	});

	$("#btnDel").on("click", function(e){
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
					if(list[i].tagCode == chkArray[j]){
						if(list[i].cnt > 0){
							tagMapping = true;
						}
					}
				}
			}

			if(confirm(checkDelete)) {
				var str = chkArray.join(",");
				var sendData= {
					"arrId":str
				};

				$.ajax({
					url			: "/deleteTag",
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
	});

	getList(1);

	$("#allBtn").on("click",function(){
		getAll();
	});

	$("#batteryBtn").on("click",function(){
		getBattery();
	});

	$("#signalBtn").on("click",function(){
		getSignal();
	});

	$("#callBtn").on("click",function(){
		getCall();
	});

	var getAll = function(){
		$("#batteryStat").val(null);
		$("#signalStat").val(null);
		$("#isCall").val(null);
		getList(1);
	}

	var getBattery = function(){
		$("#batteryStat").val("20");
		$("#signalStat").val(null);
		$("#isCall").val(null);
		getList(1);
	}

	var getSignal = function(){
		$("#batteryStat").val(null);
		$("#signalStat").val("20");
		$("#isCall").val(null);
		getList(1);
	}

	var getCall = function(){
		$("#batteryStat").val(null);
		$("#signalStat").val(null);
		$("#isCall").val("Y");
		getList(1);
	}

});

