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
var getList = function(page){


	var sendData= {
		"page":1,
		"pageSize" : 10000,
		"tagID" : $("#tagID").val()
	}

	$.ajax({
		url			: "/getTagList",
		type		: "post",
		contentType: 'application/json',
		dataType:'json',
		data: JSON.stringify(sendData),
		success		: function(data){
			list = data.list;
			$("#tagList").empty();
			if(list.length == 0) {
				alert(noTag);
			} else if (list.length > 10) {
				alert(tooManyTags);
			} else {
				for(var i=0;i<list.length;i++){
					if(list[i].productName != undefined && list[i].productName != ""){
						list[i].productName = " - " + list[i].productName;
					}
					var row = "";
					row += "<li>";
					row += "<input id=\"chkTag"+i+"\" name=\"chkTag[]\" type=\"checkbox\" value='"+list[i].tagCode+"'>				 ";
					row += "<label for='chkTag"+i+"'>"+list[i].desc+" ("+list[i].tagID+")"+list[i].productName+"</label>";
					row += "</li>";

					$("#tagList").append(row);
				}
			}
		},
		error	: function(request,status,error){
			console.log(error);
			alert(commonError);
		}
	});

};
//getList();
$(document).ready(function () {
	$('#btnClose').click(function(){
		$("#tagReg").hide();
	});

	$('#btnTagList').click(function(){
		var url = "/tagList";
		window.open(url, "_blank");
	});

	$('#searchTag').click(function(){
		var tagID = $("#tagID").val();
		if(tagID ==""){
			alert(enterTagCode);
		} else {
			getList(1);
		}
	});

	$('#btnRegTag').click(function() {
		var chkArray = new Array();

		$("input[name='chkTag[]']:checked").each(function() {
			var tmpVal = $(this).val();
			chkArray.push(tmpVal);
		});

		if( chkArray.length < 1 ){
			alert(selectItem);
			return;
		}else{
			if(confirm(checkRegistTag)) {
				var str = chkArray.join(",");
				var sendData= {
					"productCode" : $("#productCode").val(),
					"arrId":str
				};

				$.ajax({
					url			: "/updateTagMapping",
					type		: "post",
					contentType: 'application/json',
					dataType:'json',
					data: JSON.stringify(sendData),
					success		: function(data){
						alert(registSuccess);
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
});

