$(function(){
	$('ul.navbar-nav li').click(function(){
		$('ul.navbar-nav li.active').toggleClass('active');
		$($('ul.navbar-nav li.active').attr('id')+"_content").hide();
		$(this).toggleClass('active');
		$($(this).attr('id')+"_content").show();
	})

	$('.navbar-header .navbar-brand').click(function(){$('ul.navbar-nav li.active').toggleClass('active');})
})