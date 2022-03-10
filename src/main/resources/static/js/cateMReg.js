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

				//console.log(eval($("#cateLCode").val()) +","+ list[i].cateLCode);
				if(eval($("#cateLCode").val()) == list[i].cateLCode){
					var option = $("<option value='"+list[i].cateLCode+"' selected>"+list[i].cateLName+"</option>");
				}else{
					var option = $("<option value='"+list[i].cateLCode+"'>"+list[i].cateLName+"</option>");
				}

				$("#cateL").append(option);
			}
		},
		error	: function(request,status,error){
			console.log(error);
			alert("조회중 오류가 발생하였습니다.");
		}
	});

};
getCateL();
var goModify = function(productCode){
//	alert(productCode);
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

	$('#btnCancel').click(function(){
		location.href='/cateMList';

	});


	$('#btnReg').click(function(){
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
			cateMName: {
				required: true,
			}
		},

		messages: {
			cateMName: {
				required: '명칭을 입력해주세요.'
			}
		},
		submitHandler: function () {

			if(eval($("#cateL").val()) == 0 ){
				alert('대분류를 선택해주세요.');
				return false;
			}
			model_data = $("#frm").serializeObject();
			$.ajax({
				url: "/insertCateM",
				type: "POST",
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(model_data),
				success: function () {
					alert("등록완료하였습니다");
					location.href='/cateMList'
				},
				error: function () {
					alert("등록실패하였습니다.");
				}
			})
		}
	});

});

