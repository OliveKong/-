// JavaScript Document


function index_textslide(parent,child,btn_left,btn_right,w,h){
    //alert($('#'+child).attr('id'));
    /*********DIV + CSS左右交替滚动、缓动、默认静止、跳过等待时间改变方向及样式切换实例(将第WaitTime设置成60000，则第DelayTime会起作用)***************/
    var MarqueeDiv4Control = new Marquee(
    {
        MSClass	  : [parent,child],
        Direction : 2,
        Step	  : 0.1,
        Width	  : w,
        Height	  : h,
        Timer	  : 20,
        DelayTime : 1000000,
        WaitTime  : 1000000,
        ScrollStep: 0,
        SwitchType: 0,
        AutoStart : true
    });
    document.getElementById(btn_right).onclick = function(){
        MarqueeDiv4Control.Run("Left")
    };	//跳过等待时间向左滚动 可以用MarqueeDiv4Control.Run(2)代替
    document.getElementById(btn_left).onclick = function(){
        MarqueeDiv4Control.Run("Right")
    };//跳过等待时间向右滚动
}

function textslide(parent,child,btn_left,btn_right,w,h){
    //alert($('#'+child).attr('id'));
    /*********DIV + CSS左右交替滚动、缓动、默认静止、跳过等待时间改变方向及样式切换实例(将第WaitTime设置成60000，则第DelayTime会起作用)***************/
    var MarqueeDiv4Control = new Marquee(
    {
        MSClass	  : [parent,child],
        Direction : 4,
        Step	  : 0.1,
        Width	  : w,
        Height	  : h,
        Timer	  : 20,
        DelayTime : 1000000,
        WaitTime  : 1000000,
        ScrollStep: 0,
        SwitchType: 0,
        AutoStart : true
    });
    document.getElementById(btn_right).onclick = function(){
        MarqueeDiv4Control.Run("Left")
    };	//跳过等待时间向左滚动 可以用MarqueeDiv4Control.Run(2)代替
    document.getElementById(btn_left).onclick = function(){
        MarqueeDiv4Control.Run("Right")
    };//跳过等待时间向右滚动
    document.getElementById(btn_left).className = "pre over";				//将按钮置为不可点击(样式)
    MarqueeDiv4Control.OnBound = function()
    {
        if(MarqueeDiv4Control.Bound == 2)
        {
            document.getElementById(btn_right).className = "next over";
        }
        else
        {
            document.getElementById(btn_left).className = "pre over";
        }
    };	//滚动至边界做相应处理，切换按钮状态(样式)
    MarqueeDiv4Control.UnBound = function()
    {
        //$("RightButton4").disabled = $("LeftButton4").disabled = false;
        document.getElementById(btn_left).className = "pre";
        document.getElementById(btn_right).className="next";
    };	//非边界状态处理
}


$(function(){
    ////////////////////////////////////////
    $('.shenzhan_right a').click(function(){
        if($("#shous").css('width')=='530px'){
            $("#shous").animate({ 
                width: "125px"
            }, 1000 );
            $(this).text('展开').removeClass('on');
        }else{  
            $("#shous").animate({ 
                width: "530px"
            }, 1000 );
            $(this).text('收缩').addClass('on');
        }
    });

});

function gDialog(op,top,color){
if(top == null){top = 100;}
if(color == null){color = '#000';}
$(op).css({'position':'absolute','left':'50%','top':$(window).scrollTop()+top,'z-index':99999,'margin-left':-($(op).width()/2)}).show();
$('body').append('<div class="gDialogZ" style="position:fixed;_position:absolute; left:0; top:0; width:100%; height:100%; background:'+color+';filter:Alpha(opacity=70);opacity:0.7; z-index:999;"></div>')
$('.gDialogZ').css({'height':$(document).height()});
}
function gDialogClose(op){
$(op).fadeOut();
$('.gDialogZ').remove();
}

//导航栏
function index_menu(){
	$(".nav li").hover(function(){
		var _index=$(this).index();
		var show_box=$(".nav dl");
		if(show_box.is(":visible")){
			$(this).children(".nav dl").hide();
		}
		else{
			$(this).children(".nav dl").show();
		}
		return false;
	})
}