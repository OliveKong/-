$(function () {

	// 官网首页banner轮播焦点按钮居中处理
	var lilen = $(".banner-nav").find("li").size();
	var ulwidth = lilen * 16 + (lilen - 1) * 8;
	var winwidth = $(window).width();
	if (winwidth < 1180) {
		winwidth = 1180;
	}
	var leftpos = parseFloat((winwidth - ulwidth) * 50 / winwidth);
	$(".banner-nav").css("left", leftpos + "%");
	
});

//轮播组件
(function(win){
    win.timerFID='';
    win.slider={
        currentFocusI:0,
        changeingFocus:false,
        navflag:false,
        speed:800,
        init:function(o){
            var that=this;
            that.o=o;
            that.list= o.find('a.banner');
            that.bar = o.find('.banner-bar');
            that.bannerBg = o.find('.banner-bg');
            that.nav= o.find('.banner-nav li');
            that.initlist();
            that.bindNav();
            that.starFocustAm();
            that.bindIEClick();
            /*if($.browser.msie && $.browser.version<=6.0){
                $.each($('.slide-banner img'),function(i,img){
                    if(img.src.toLowerCase().indexOf('.png') > 0){
                        var imgID = (img.id) ? "id='" + img.id + "' " : "";
                        var imgClass = (img.className) ? "class='" + img.className + "' " : "";
                        var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
                        var imgStyle = "display:inline-block;" + img.style.cssText;
                        if (img.align == "left") imgStyle = "float:left;" + imgStyle;
                        if (img.align == "right") imgStyle = "float:right;" + imgStyle;
                        if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
                        var strNewHTML = "<span " + imgID + imgClass + imgTitle
                                     + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                                     + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                                     + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                                     img.outerHTML = strNewHTML;
                    };
                });
            }*/
        },
        bindNav:function(){
            var that=this;
            that.nav.bind('click',function(e){
                var cur = $(e.currentTarget), i=0;
                that.bar.stop();
                that.bar.css({'width': '0'});
                if(that.navflag)return false;
                if(!cur.hasClass('active')){
                    that.navflag=true;
                    //计算当前active 值
                    that.animateOut(that.o.find('.banner-nav li.active').attr('i'));
                    if(cur.attr('i')=='0'){
                        i=that.nav.length-1;
                    }else{
                        i=parseInt(cur.attr('i'))-1;
                    }
                    that.animateIn(i);
                }
            });
        },
        initlist:function(){
            var that=this;
            //计算当前active 值
            for(i=0;i<that.nav.length;i++){
                that.nav.eq(i).attr('i',i);
            }
        },
        barAnimate:function(callback){
            var that=this;
            that.bar.animate({'width': '100%'}, 7500, 'linear',callback);
        },
        animateIn:function(i){
            var that=this, o,bg,ci;
            that.stopFocusAm();
            if(i ==that.list.length-1){
                o = that.list.eq(0);
                ci=0;
            }else{
                o = that.list.eq(i+1);
                ci= i+1;
            }
            bg = o.attr('data-bg');
            that.changeBg(bg, function () {
                that.nav.removeClass('active');
                that.nav.eq(ci).addClass('active');

                o.find('.banner-img').eq(0).animate({'left':'0'},that.speed,'easeOutCubic');
                o.find('.banner-img').eq(1).animate({'left':'0'},that.speed+200,'easeOutCubic');
                o.find('.banner-img').eq(2).animate({'left':'0'},that.speed+400,'easeOutCubic',function(){
                    that.currentFocusI = ci;
                    that.changeingFocus = false;
                    that.navflag=false;
                    that.starFocustAm();
                });
            });
        },
        animateInNext:function(i){
            var that=this, o,bg,ci;
            that.stopFocusAm();
            if(i ==that.list.length-1){
                o = that.list.eq(0);
                ci=0;
            }else{
                o = that.list.eq(that.currentFocusI+1);
                ci=that.currentFocusI+1;
            }
            bg = o.attr('data-bg');
            that.changeBg(bg, function () {
                that.nav.removeClass('active');
                that.nav.eq(ci).addClass('active');

                o.find('.banner-img').eq(0).animate({'left':'0'},that.speed,'easeOutCubic');
                o.find('.banner-img').eq(1).animate({'left':'0'},that.speed+200,'easeOutCubic');
                o.find('.banner-img').eq(2).animate({'left':'0'},that.speed+400,'easeOutCubic',function(){
                    that.currentFocusI = ci;
                    that.changeingFocus = false;
                    that.navflag=false;
                    that.starFocustAm();
                });
            });
        },
        /**
         * 当前slider 退出动画
         * @param i
         */
        animateOut:function(i,callback){

            var that=this,o=that.list.eq(i);
            o.find('.banner-img').eq(0).animate({'left':'150%'},that.speed+200,'easeOutCubic',function(){
                o.find('.banner-img').eq(0).css({'left':'-150%'});
                callback&&callback();
            });
            o.find('.banner-img').eq(1).animate({'left':'150%'},that.speed,'easeOutCubic',function(){
                o.find('.banner-img').eq(1).css({'left':'-150%'});
            });
            o.find('.banner-img').eq(2).animate({'left':'150%'},that.speed+400,'easeOutCubic',function(){
                o.find('.banner-img').eq(2).css({'left':'-150%'});
            });
        },
        nextSlider:function(){
            var that=this,_slider,i;
            if(that.changeingFocus) return;
            that.changeingFocus = true;
            //判断是否是最后一个
            if(that.currentFocusI==that.list.length-1){
                _slider = that.list.eq(0);
                i=0;
            }else{
                _slider = that.list.eq(that.currentFocusI+1);
                i=that.currentFocusI+1;
            }

            //初始化下个slider img的位置

            _slider.find('.banner-img').stop(false,true);
            _slider.find('.banner-img').css({'left': '-150%'});

            //初始化进度条
            that.barAnimate(function(){
                that.bar.stop();
                that.bar.css({'width': '0'});

                var ci=that.currentFocusI;
                that.animateOut(ci,function(){
                    that.animateInNext(ci);
                });
            });

        },
        changeBg:function(color, callback){
            var that=this;
            that.bannerBg.fadeOut(500, function () {
                $(this).css('background-image', 'url('+color+')').delay(50).fadeIn(500, callback);
            });
        },
        starFocustAm:function(){
            var that=this;
            win.timerFID = setInterval(function(){
                that.nextSlider();
            },100);
        },
        stopFocusAm:function(){
            clearInterval(win.timerFID);
        },
        bindIEClick:function(){
            var that=this;
            /*解决IE6，7链接点击失效问题*/
            if($.browser.msie && ( $.browser.version=='6.0' || $.browser.version=='7.0' ) ) {
                that.list.bind("click",function(){                                        
                    window.location.href = $(this).attr("href");
                    return false;
                });    
            }        
        }
    };

	window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if( t >= 350 ) {
        $('.pendant').css("display","inline");
    } else {
        $('.pendant').css('display', 'none');
    }
}
})(window);
//初始化轮播组件
window.slider.init($('.slide-banner'));