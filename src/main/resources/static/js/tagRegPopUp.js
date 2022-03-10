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

			console.log(data);

			list = data.list;
			$("#tagList").empty();
			if(list.length == 0){
				alert('검색된 태그가 없습니다.');
			}else if (list.length > 10){
				alert('검색된 태그가 너무많습니다.\n 10개 이하의 태그만 가능합니다.');
			}else{
				for(var i=0;i<list.length;i++){
					if(list[i].productName != undefined && list[i].productName != ""){
						list[i].productName = " - " + list[i].productName;
					}
					var row="";
					row +="         <li>";
					row +="             <input id=\"chkTag"+i+"\" name=\"chkTag[]\" type=\"checkbox\" value='"+list[i].tagCode+"'>				 ";
					row +="             <label for='chkTag"+i+"'>"+list[i].desc+" ("+list[i].tagID+")"+list[i].productName+"</label>";
					row +="         </li>";



					$("#tagList").append(row);
				}

			}
		},
		error	: function(request,status,error){
			console.log(error);
			alert("조회중 오류가 발생하였습니다.");
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
			alert("검색할 태그코드를 입력해주세요");
		}else{
			getList(1);
		}
	});
	$('#btnRegTag').click(function(){

		var chkArray = new Array();

		$("input[name='chkTag[]']:checked").each(function() {
			var tmpVal = $(this).val();
			chkArray.push(tmpVal);
		});

		if( chkArray.length < 1 ){
			alert("등록할 항목을 선택해주세요.");
			return;
		}else{
			if(confirm("선택한 태그를 해당상품에 등록 하시겠습니까?")) {


				var str = chkArray.join(",");
				var sendData= {
					"productCode" : $("#productCode").val(),
					"arrId":str
				};
				console.log("sendData="+sendData);

				$.ajax({
					url			: "/updateTagMapping",
					type		: "post",
					contentType: 'application/json',
					dataType:'json',
					data: JSON.stringify(sendData),
					success		: function(data){
						console.log(data);

						alert('성공적으로 등록하였습니다.');
						location.reload();

					},
					error	: function(request,status,error){
						console.log(error);
						alert("조회중 오류가 발생하였습니다.");
					}
				});

			}
		}

		console.log(chkArray);	// (2) ["A", "B"]
	});


});

