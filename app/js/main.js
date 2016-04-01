// 设置大背景图的大小自适应屏幕
function setClientHieght(){
	var section1 = document.getElementById("section1");
    //获取窗口宽度
    if (window.innerWidth){
        var winHeight = window.innerHeight;

    }
    else if ((document.body) && (document.body.winHeight)){
        var winHieght = document.body.clientHeight;
    }
    if(winHeight > 920){
        	winHeight = 920;
	    }
	if (section1) {
        section1.style.height = winHeight + "px";
    }
    document.getElementById('innerScroll').style.top = winHeight + "px";
}
setClientHieght();
window.onresize=setClientHieght;


(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 50);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartResize');

 // Smooth Scrolling Function
function smoothScroll(time, distance){

    var scrollTime = time;
    var scrollDistance = distance;

    $window.on("mousewheel.smooth DOMMouseScroll.smooth", function(event){

        event.preventDefault();
        var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta*scrollDistance);

        TweenMax.to($window, scrollTime, {
	        scrollTo : { y: finalScroll, autoKill:true },
	            ease: Power1.easeOut,
	            overwrite: 5
	    });
    });
}

function enableSmoothScroll (page, time, distance) {
    if (page) {
	    $(window).on('mousewheel.smooth DOMMouseScroll.smooth', smoothScroll(time,distance));
	}
}
 enableSmoothScroll(isHome, 1.1, 110);
// ----------------------

// Parallax Scroll For Project Pages
var $window = $(window),
    isFirefox = typeof InstallTrigger !== 'undefined',
    isHome = $('#home'),
    $profitAnimation = $(".profitAnimation"),
    mapLocationLi = $("#mapLocation li"),
    section_1 = $("#section1"),
    innerScroll = $("#innerScroll"),
    parallax1 = $("#parallax1");

function parallaxScroll(){
	var scrolled = $window.scrollTop();
	var height = section_1.outerHeight();
	var calc = 1 - scrolled / height;

    parallax1.css({'transform':'translate(0,'+-(scrolled*.6122)+'px)'});
    innerScroll.css({'transform':'translate(0,'+-(scrolled*1.255)+'px)'});
    check_if_profit_in_view();
    setOpacity(scrolled,section_1);

}

$(window).on('scroll resize',function(e){
    parallaxScroll();
});
$window.trigger('scroll');
setMapAnimation();
smoothScroll(1.1, 110);

if (isFirefox) {
smoothScroll(.8, 220);
}

// 总收益animation
function check_if_profit_in_view(){
	var window_height = $window.height();
	var window_top_position = $window.scrollTop();
	var window_bottom_position = (window_top_position + window_height);

	$.each($profitAnimation,function(){
		var $element = $(this);
		var element_height = $element.outerHeight();
	    var element_top_position = $element.offset().top;
	    var element_bottom_position = (element_top_position + element_height);

	    // check to see if this current container is within viewport
	    if((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)){
	    	$element.addClass('profit-in-view');
	    }else{
	    	$element.removeClass('profit-in-view');
	    }
	});

}

// 设置opacity
function setOpacity(scrolled,obj){
	var height = section_1.outerHeight();
	var calc = 1 - scrolled / height;
	obj.css({opacity:calc});
	if(calc > '1'){
		obj.css({'opacity':1});
	}else if(calc < '0'){
		obj.css({'opacity': 0});
	}
}

// click scroll button then page scroll one screen
$("#headerDownBtn").click(function(){
	var bgHeight = $("#section1").height()/2 - 35;
	$('body').animate({
		scrollTop:bgHeight
	},800,'linear');
});

// controll the map animation one by one
function setMapAnimation(){
	setInterval(function(){
		var lactionFade = $(".lactionFade").removeClass('lactionFade');
		if(lactionFade.next() && lactionFade.next().length){
			lactionFade.next().addClass('lactionFade');
		}else{
			lactionFade.siblings(':first').addClass('lactionFade');
		}
	},2000);
}

