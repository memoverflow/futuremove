/**
 * Future Move ohoo!!! :)
 * @authors Lucas Ren (nichokiki@hotmail.com)
 * @date    2015-01-20
 * @version v1.0
 */
// 配置加载项
require.config({　　　　
	paths: {　　　　　　
		"jquery": "jquery",
		"fullPage": "jquery.fullPage.min",
		"transit": "jquery.transit.min",
		"slide": "responsiveslides.min",
		"map": "http://api.map.baidu.com/api?v=1.5&ak=KfgGSNmbrkALKFcj3kZh3yYD",
	},
	shim: {
		"fullPage": {
			deps: ["jquery"]
		},
		"transit": {
			deps: ["jquery"]
		},
		"slide": {
			deps: ["jquery"]
		},
	}
});
/**
 *主模块，FutureMove主页面初始化
 *Design by Zhongfei.Wei
 *Scripts by Lucas Ren
 */
require(['jquery', 'fullPage', 'transit', "slide", "map"], function() {
	var lily = {
		distance: 48,
		whiteCar: [1, 3, 5, 6],
		blackCar: [2, 4],
		car: $(".icon-48-01"),
		fullPage: $('#fullpage'),
		section: $(".section"),
		header: $("header"),
		eCar: $(".car"),
		view1: $(".view-1"),
		slider: $(".slider"),
		slideIndex: 0,
		//car animation & header animation
		carAnimate: function(index) {

			if (index == 1) {
				lily.header.transition({
					height: 100,
				}, 600, 'easeInOutCubic');
				lily.header.find(".logo").transition({
					height: 38,
					width: 300,
					margin: "31px auto"
				}, 600, 'easeInOutCubic');
			} else {
				lily.header.transition({
					height: 60,
				}, 600, 'easeInOutCubic');
				lily.header.find(".logo").transition({
					height: 26,
					width: 210,
					margin: "17px auto"
				}, 600, 'easeInOutCubic');
			}
			if (index == 2) {
				lily.eCar.fadeIn('slow');
			} else if (index == 3) {
				lily.eCar.fadeIn('500');
			} else {
				lily.eCar.fadeOut('200');
			}
		},
		contains: function(ele) {
			for (var i = 0; i < lily.blackCar.length; i++) {
				if (lily.blackCar[i] === ele) {
					return true;
				}
			}
			return false;
		},
		//navigation movement
		move: function(ele, index) {
			if (lily.contains(index))
				ele.parent().addClass("nav-black");
			else
				ele.parent().removeClass("nav-black");
			ele.transition({
				y: lily.distance * (index - 1)
			}, 600, 'ease');
			lily.carAnimate(index);
		},
		//init fullpage transition
		init: function() {
			lily.eCar.hide();
			lily.fullPage.fullpage({
				css3: true,
				easing: 'easeInQuart',
				easingcss3: 'ease',
				touchSensitivity: 15,
				normalScrollElementTouchThreshold: 5,
				resize: true,
				verticalCentered: true,
				keyboardScrolling: true,
				onLeave: function(index, nextIndex, direction) {
					lily.move(lily.car, nextIndex);
				}
			});
			lily.car.next().find("li").on("click", function() {
				var index = lily.car.next().find("li").index(this);
				$.fn.fullpage.moveTo(index + 1);
			});
		},
		map: function() {
			var map = new BMap.Map("map");
			var point = new BMap.Point(116.517089, 39.900591);
			map.centerAndZoom(point, 16);
			var marker = new BMap.Marker(point); // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中
			marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		},
		bgTransition: function() {
			lily.slider.find("ul").responsiveSlides({
				timeout: 10000, 
				speed: 1000
			});
		}

	}

	$(document).ready(function() {
		lily.init();
		lily.map();
		lily.bgTransition();
	});
});