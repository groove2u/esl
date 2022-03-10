$(document).ready(function() {

	$('.layer_pop.alert a').on('click', function(){
		$(this).parent().fadeOut();
	});

	$('a.btn_del').on('click', function(){
		$('.layer_pop.del_chk').fadeIn();
	});

	$('a.layer_close, a.cancel, a.ok, a.open_del_compl').on('click', function(){
		$(this).parent().parent().fadeOut();
	});
	$('a.open_del_compl').on('click', function(){
		$('.layer_pop.del_compl').fadeIn();
	});

	$('a.btn_reg').on('click', function(){
		$('.layer_pop.tag_reg').fadeIn();
	});

	$('.tag_list_slide_wrap .swiper-slide a').on('click', function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$('.tag_list_slide_wrap .swiper-slide a').removeClass('on');
			$(this).addClass('on');
		}
	});

	$('#btnLogout').on('click', function(){
		$('#logoutForm').submit();
	});

});
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
