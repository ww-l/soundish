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