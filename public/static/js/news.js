$(function(){
	$(window).scroll(function() {
		$('.load').html('<i class="icon icon-loding animated"></i>');
		//$(document).scrollTop()滚动条位置距页面顶部的距离；
		//$(document).height()整个页面的总高度；
		//$(window).height()当前窗口的高度；
		if ($(document).scrollTop() >= $(document).height() - $(window).height()) {//判断是否已经滚动到页面底部；
			var paramdata = {
				's_page':$('#s_page').val(),
				's_cid':$('#s_cid').val()
			}
			$.ajax({
				type: 'post',
				dataType: "json",
				url: '/index.php/index/ajax_news',
				data: paramdata,
				async: true,
				success: function(data){
					if(data.ajax_state){
						$('.load').html('');
						$('#s_page').val(data.page);
						$('#list_news').append(data.news_html);
					}
				},
				error: function(errorMsg) {
					alert("请求数据失败啦!");
				}
			});
		}
	});
})