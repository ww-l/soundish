var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?10ef0563989903b48e0faec35cf8b6f6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-08-12 21:59:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-08-12 23:53:06
 */
function tips_conf(mes){
	var timestamp = new Date().getTime();
	var setting = {
		id:timestamp,
		class:"",				   		 	  	 //自定义Class
		join:"fadeInUp",				  	 	 //进入动画
		quit:"fadeOutDown",				 	  	 //退出动画
		content :"提示信息",					  //提示内容文字
		title:"提示",    					 	   //标题文字
		ok_value:"确定", 					 	   //确定按钮文字
		no_value:"取消", 					 	   //取消按钮文字
		ok_Callback:function(obj){remove();},	//回调响应事件
		no_Callback:function(obj){remove();},	//回调响应事件
		btnshow:true,							//是否显示按钮区域 默认显示
		noshow:true,							//是否显示取消按钮 默认显示
		bgshow:true,							//是否显示遮罩
		closeWin: false 				  		//是否关闭弹出层 默认关闭
	};
	setting = $.extend(setting,mes);
	if(setting.closeWin){
		$(".lightbox-fixed").remove();
		$(".lightbox-overlay").remove();
	}
	function tips(setting){
		var bg ='<div class="lightbox-overlay"></div>';
		var lightbox = '<div class="lightbox-fixed '+setting.class+' '+setting.join+' animated" id="'+setting.id+'"><div class="lightbox-box"><h2 class="title">'+setting.title+'</h2><a class="lightbox-btn-close f-close icon icon-close" href="javascript:void(0)" title="关闭">关闭</a><div class="lightbox-box-main">'+setting.content+'</div></div></div>';	
		var btn='<div class="btn"><input type="submit" class="u-btn btn-submit f-ok" value='+setting.ok_value+'></div>';
		var btn_no='<input type="submit" class="u-btn btn-default f-no" value='+setting.no_value+'>';
		$('body').append(lightbox);
		if(setting.bgshow){
			$('body').append(bg);
		}
		if(setting.btnshow){
			$('.lightbox-box-main').append(btn);
			if(setting.noshow){
				$('.lightbox-box-main .btn').append(btn_no);
			}
		}
	}
    tips(setting); 
    //弹出层关闭
    function remove(){
      $(".lightbox-fixed").removeClass(setting.join).addClass(setting.quit).fadeOut(800,function(){
        $(this).remove();
      });
      $(".lightbox-overlay").fadeOut(800,function(){
        $(this).remove();
      });
    }
    $(".lightbox-fixed .f-close").click(function(){
      remove();
    });
    //ok按钮
    $(".lightbox-fixed .f-ok").click(function(){
        remove();
        setting.ok_Callback(this);
   });
    //no按钮
    $(".lightbox-fixed .f-no").click(function () {
        remove();
        setting.no_Callback(this);
    });
}

$(function(){
    function fh(){
      var wh = $(window).height();
      var th = $('.m-head').height();
      var fh = wh-th
      $('.p-index .focus').height(fh);
      $('.p-faith .banner').height(fh);
    }
    fh();
    $(window).resize(function(){
      fh();
    });
    function htab(){
      $(".f-tab-c .tab-hd .hd").click(function() {
          var num = $(this).index();
          $(this).addClass("on").siblings().removeClass("on").parents(".f-tab-c").find(".tab-bd").find(".bd").eq(num).removeClass("f-dn").siblings(".bd").addClass("f-dn");
      });
    }
    htab();
    function videonav() {
        stop = $(document).scrollTop(); //滚动条高度
        if($("body").attr("class") === "p-video" || $("body").attr("class") === "p-conspire" || $("body").attr("class") === "p-product"){
         foott = $(".tab-nav").offset(); //底部位置
          if (stop >= foott.top) {
                $(".tab-nav .fixed").addClass("f-pf");
            } else {
                $(".tab-nav .fixed").removeClass("f-pf");
            }
        }
    }
    videonav();
    function gotop(){
      if(stop>200){
        $(".gotop").css("bottom","50px");
      }else{
        $(".gotop").css("bottom","-50px");
      }
    }
    gotop();
    $(window).scroll(function() {
        videonav();
        gotop();
    });
    $(".p-video .tab-nav a").click(function(){
        $('html,body').animate({ scrollTop:foott.top }, 500);
    });
    $(".gotop").click(function() {
        $('html,body').animate({ scrollTop: '0' }, 500);
    });
    $(document).on("click",".p-conspire .brand .sq",function(){
      $(this).removeClass("sq").addClass("on");
    });
    $(document).on("click",".p-conspire .brand .icon-full",function(){
      $(this).parents(".item").removeClass("on").addClass("sq");
    });
    $(".p-conspire .join .list .shd").click(function(){
      $(this).toggleClass("on").siblings(".mn").stop().toggle();
    });
    $(".p-fw .code .input").focusout(function(){
      if($(this).val() != "" ){
        $(this).addClass("border");
      }else{
        $(this).removeClass("border");
      }
      console.log($(this).val())
    });
})

//投诉建议--开始
function ajax_complaints(){
	tips_conf({
		title:'<i class="icon icon-jy-h"></i>投诉建议',
		class:"form",
		content :'<ul><li class="item"><span class="tit">联系方式</span><input name="contact_way" id="contact_way" class="text" type="text" placeholder="例如手机号码，邮箱，QQ"></li><li class="item"><span class="tit">内容</span><textarea name="content" id="content" class="textarea" placeholder="例如某网友在网上买了一条DR-05，查询结果为假货，网店地址为******（请尽量500字以内）阐述举报内容。"></textarea></li><li class="item"><span class="tit">附件上传</span><p class="up"><span class="file"><input type="file" multiple="multiple" name="file_complaints" id="file_complaints" onchange="uploadComplaintsFile(this)" />添加图片</span>（图片不大与2M，张数不多于5张）</p><p class="list f-cb" id="complaints_img"></p></li></ul><div class="btn"><a class="post" onclick="confirmComplaints()">确定</a></div>',
		btnshow:false,
	});
}

function uploadComplaintsFile(obj){  
	$.ajaxFileUpload({
		url: 'fileComplaintsUpload', //用于文件上传的服务器端请求地址
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: 'file_complaints', //文件上传域的ID
		dataType: 'text', //返回值类型 一般设置为json
		success: function (data, status)  //服务器成功响应处理函数
		{
			var complaints_img = '<span><img src="'+data+'" alt=""><i class="del" onclick="deleteComplaintsImg(this)">×</i></span>';
			$("#complaints_img").append(complaints_img);
			if (typeof (data.error) != 'undefined') {
				if (data.error != '') {
					alert(data.error);
				} else {
					alert(data.msg);
				}
			}
		},
		error: function (data, status, e)//服务器响应失败处理函数
		{
			alert(e);
		}
	})
	return false;
}

function deleteComplaintsImg(obj){
	$(obj).parent('span').remove();
}

function confirmComplaints(){
	var str;
	var vaction = true;
	var objid;
	var errinfo = "";
	
	var contact_way = $('#contact_way').val();
	var content = $('#content').val();
	var complaints_img = '';
	$("#complaints_img span img").each(function(){
		if(complaints_img == ''){
			complaints_img += $(this).attr('src');
		}else{
			complaints_img += '|'+$(this).attr('src');
		}
	});
	
	if(vaction && contact_way.length == 0){
		vaction = false;
		objid = "contact_way";
		errinfo = "请输入联系方式";
	}
	
	if(vaction && content.length == 0){
		vaction = false;
		objid = "content";
		errinfo = "请输入内容";
	}

	if(vaction == false){
		$('#'+objid).focus();
		return false;
	}else{
		var paramdata = {
			'contact_way':contact_way,
			'content':content,
			'complaints_img':complaints_img
		}
	
		$.ajax({
			type: 'post',
			dataType: "json",
			url: '/index.php/index/ajax_confirm_complaints',
			data: paramdata,
			async: false,
			success: function(data){
				/*$(".lightbox-fixed").remove();
				$(".lightbox-overlay").remove();*/
				tips_conf({
					closeWin:true,
					title:"",
					class:"tips",
					content :'<i class="icon icon-ok"></i><p>感谢您对本公司提出宝贵建议</p>',
					btnshow:false,
				});
			}
		});
	}
}
//投诉建议--结束

//假货举报--开始
function ajax_fake_reports(){
	tips_conf({
		title:'<i class="icon icon-jb-h"></i>假货举报',
		class:"form",
		content :'<ul><li class="item"><span class="tit">联系方式</span><input name="contact_way" id="contact_way" class="text" type="text" placeholder="例如手机号码，邮箱，QQ"></li><li class="item"><span class="tit">内容</span><textarea name="content" id="content" class="textarea" placeholder="例如某网友在网上买了一条DR-05，查询结果为假货，网店地址为******（请尽量500字以内）阐述举报内容。"></textarea></li><li class="item"><span class="tit">附件上传</span><p class="up"><span class="file"><input type="file" multiple="multiple" name="file_fake_reports" id="file_fake_reports" onchange="uploadFakeReportsFile(this)" />添加图片</span>（图片不大与2M，张数不多于5张）</p><p class="list f-cb" id="fake_reports_img" ></p></li></ul><div class="btn"><a class="post" onclick="confirmFakeReports()">确定</a></div>',
		btnshow:false,
	});
}

function uploadFakeReportsFile(obj){  
	$.ajaxFileUpload({
		url: 'fileFakeReportsUpload', //用于文件上传的服务器端请求地址
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: 'file_fake_reports', //文件上传域的ID
		dataType: 'text', //返回值类型 一般设置为json
		success: function (data, status)  //服务器成功响应处理函数
		{
			var fake_reports_img = '<span><img src="'+data+'" alt=""><i class="del" onclick="deleteFakeReportsImg(this)">×</i></span>';
			$("#fake_reports_img").append(fake_reports_img);
			if (typeof (data.error) != 'undefined') {
				if (data.error != '') {
					alert(data.error);
				} else {
					alert(data.msg);
				}
			}
		},
		error: function (data, status, e)//服务器响应失败处理函数
		{
			alert(e);
		}
	})
	return false;
}

function deleteFakeReportsImg(obj){
	$(obj).parent('span').remove();
}

function confirmFakeReports(){
	var str;
	var vaction = true;
	var objid;
	var errinfo = "";
	
	var contact_way = $('#contact_way').val();
	var content = $('#content').val();
	var fake_reports_img = '';
	$("#fake_reports_img span img").each(function(){
		if(fake_reports_img == ''){
			fake_reports_img += $(this).attr('src');
		}else{
			fake_reports_img += '|'+$(this).attr('src');
		}
	});
	
	if(vaction && contact_way.length == 0){
		vaction = false;
		objid = "contact_way";
		errinfo = "请输入联系方式";
	}
	
	if(vaction && content.length == 0){
		vaction = false;
		objid = "content";
		errinfo = "请输入内容";
	}

	if(vaction == false){
		$('#'+objid).focus();
		return false;
	}else{
		var paramdata = {
			'contact_way':contact_way,
			'content':content,
			'fake_reports_img':fake_reports_img
		}
		$.ajax({
			type: 'post',
			dataType: "json",
			url: '/index.php/index/ajax_confirm_complaints',
			data: paramdata,
			async: false,
			success: function(data){
				tips_conf({
					closeWin:true,
					title:"",
					class:"tips",
					content :'<i class="icon icon-ok"></i><p>感谢您对本公司提出举报信息</p>',
					btnshow:false,
				});
			}
		});
	}
}
//假货举报--结束

//推荐音乐--开始
function recommend_music(){
	var paramdata = {
		'categoryid':4
	}

	$.ajax({
		type: 'post',
		dataType: "json",
		url: '/index.php/index/recommend_music',
		data: paramdata,
		async: false,
		success: function(data){
			if(data.length > 0){
				var music_data = '<ul>';
				for (var i=0;i<data.length;i++){
					music_data += '<li><a class="icon icon-down" target="_blank" href="'+data[i].music_url+'" title="'+data[i].music_title+'"></a><span>'+data[i].music_title+'</span></li>';
				}
				music_data += '</ul>';
				tips_conf({
					title:'<i class="icon icon-tj"></i>推荐音乐下载',
					class:"down",
					content :music_data,
					btnshow:false,
				});
			}
		}
	});
}
//推荐音乐--结束

//测试音乐--开始
function test_music(){
	var paramdata = {
		'categoryid':3
	}

	$.ajax({
		type: 'post',
		dataType: "json",
		url: '/index.php/index/recommend_music',
		data: paramdata,
		async: false,
		success: function(data){
			if(data.length > 0){
				var music_data = '<ul>';
				for (var i=0;i<data.length;i++){
					music_data += '<li><a class="icon icon-down" target="_blank" href="'+data[i].music_url+'" title="'+data[i].music_title+'"></a><span>'+data[i].music_title+'</span></li>';
				}
				music_data += '</ul>';
				tips_conf({
					title:'<i class="icon icon-tj"></i>测试音乐下载',
					class:"down",
					content :music_data,
					btnshow:false,
				});
			}
		}
	});
}
//测试音乐--结束

//产品资料--开始
function goods_manual(){
	var paramdata = {}

	$.ajax({
		type: 'post',
		dataType: "json",
		url: '/index.php/index/goods_manual',
		data: paramdata,
		async: false,
		success: function(data){
			if(data.length > 0){
				var goods_manual_data = '<ul>';
				for (var i=0;i<data.length;i++){
					goods_manual_data += '<li><a class="icon icon-down" target="_blank" href="'+data[i].goods_data_url+'" title="'+data[i].goods_data_name+'"></a><span>'+data[i].goods_data_name+'</span></li>';
				}
				goods_manual_data += '</ul>';
				tips_conf({
					title:'<i class="icon icon-zl"></i>产品资料下载',
					class:"down",
					content :goods_manual_data,
					btnshow:false,
				});
			}
		}
	});
}
//产品资料--结束

//授权代理查询--开始
function devolution(){
	tips_conf({
		closeWin:true,
		title:'<i class="icon icon-cx-h"></i>代理查询',
		class:"dali",
		content :'<div class="input"><input class="text" name="agent_info" id="agent_info" type="text" placeholder="请输入商家公司名称/授权编码/店铺名称"><a onclick="ajax_devolution();" class="btn">确定</a></div>',
		btnshow:false,
	});
}

function ajax_devolution(){
	var paramdata = {
		'agent_info':$('#agent_info').val()
	}

	$.ajax({
		type: 'post',
		dataType: "json",
		url: '/index.php/index/ajax_devolution',
		data: paramdata,
		async: false,
		success: function(data){
			if(data.length > 0){
				tips_conf({
					closeWin:true,
					title:"",
					class:"tips",
					content :'<i class="icon icon-ok"></i><p>此商家为渡哲特官方授权代理商，请放心购买。</p><p class="time">授权日期：'+data[0].agent_start_time+'至'+data[0].agent_end_time+'</p>',
					btnshow:false,
				});
			}else{
				tips_conf({
					closeWin:true,
					title:"",
					class:"tips",
					content :'<i class="icon icon-no"></i><p>此商家未通过渡哲特授权，所售产品非渡哲特官方渠道授权，谨防假冒！<br><a onclick="devolution();">返回继续查询</a></p>',
					btnshow:false,
				});
			}
		}
	});
}
//授权代理查询--结束

//微信--开始
function public_wechat(obj){
	if(obj != ''){
		tips_conf({
			title:"DZAT官方微信",
			class:"wx",
			content : "<p>关注DZAT渡哲特品牌官方微信，获取最新技术资讯，新品免费体验等你来拿，给你最贴心的极致服务！</p><img src='"+obj+"'>",
			btnshow:false,
		});
	}
}
//微信--结束

//切换语言--开始
function switch_language(){
	tips_conf({
		title:"Please select your country or region",
		class:"lang",
		//content : "<a href='/' class='lang' title='中文'><i class='icon icon-cn'></i>中文</a><a href='/en/' class='lang' title='English'><i class='icon icon-usa'></i>English</a><a href='/jp/' class='lang' title='日本语'><i class='icon icon-jp'></i>日本语</a>",
		//content : "<a href='/' class='lang' title='中文'><i class='icon icon-cn'></i>中文</a><a href='/' class='lang' title='English'><i class='icon icon-usa'></i>English</a><a href='/' class='lang' title='日本语'><i class='icon icon-jp'></i>日本语</a>",
		content : "<a href='/?switch=yes' class='lang' title='中文'><i class='icon icon-cn'></i>中文</a><a href='/en/?switch=yes' class='lang' title='English'><i class='icon icon-usa'></i>English</a><a href='/jp/?switch=yes' class='lang' title='日本语'><i class='icon icon-jp'></i>日本语</a>",
		btnshow:false,
	});
}
//切换语言--结束