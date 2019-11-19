$(function(){
})

function moveNext(object,index){
	if(object.value.length == 4 && index<4){
		document.forms[0].elements[index+1].focus();
	}
}

function showResult(){
	var f = document.forms[0];
	var result="";
	for(var i = 0; i<4 ;i++){
		result += f.elements[i].value;
	}
	alert(result);
}

function code_query(){
	var co = '';
	var co_length = 0;
	$(".code form input").each(function(){
		co_length = co_length+$(this).val().length;
		co = co+$(this).val();
	});
	if(co_length == '16' || co_length == '20'){
		var paramdata = {
			'co':co
		}
		$.ajax({
			type: 'post',
			dataType: "json",
			url: '/index.php/index/ajax_security_code',
			data: paramdata,
			async: true,
			success: function(data){
				if(data.ajax_state == '1'){
					tips_conf({
					  title:"",
					  class:"tips",
							content :'<i class="icon icon-ok"></i><p>您查询的产品是正品！</p>',
					  btnshow:false,
						});
					
				}else if(data.ajax_state > '1'){
					tips_conf({
					  title:"",
					  class:"tips",
							content :'<i class="icon icon-no"></i><p>您的防伪码第'+data.ajax_state+'次查询，谨防假冒！</p>',
					  btnshow:false,
						});
				}else{
					tips_conf({
					  title:"",
					  class:"tips",
							content :'<i class="icon icon-no"></i><p>您查询的防伪码不存在，谨防假冒！</p>',
					  btnshow:false,
						});
				}
			},
			error: function(errorMsg) {
				alert("请求数据失败啦!");
			}
		});
	}else{
		tips_conf({
		  title:"",
		  class:"tips",
				content :'<i class="icon icon-no"></i><p>请输入16位或20位防伪码查询耳机真伪</p>',
		  btnshow:false,
			});
	}
}