/**
 * 创建lnh页面的生命周期
 * @authors Lucas Ren (nichokiki@hotmail.com)
 * @date    2015-01-20
 * @version v1.0
 */
// 配置加载项
require.config({　　　　
	paths: {　　　　　　
		"jquery": "jquery",
		"fullPage": "jquery.fullPage.min"
	},
	shim: {
		"fullPage": {
			deps: ["jquery"]
		}
	}
});
/**
 *主模块，FutureMove主页面初始化
 *Design by Zhongfei.Wei
 *Scripts by Lucas Ren
 */
require(['jquery', 'fullPage'], function($, fullPage) {
	var lily = {
		//init fullpage transition
		init:function(){
			$('#fullpage').fullpage({
				css3: true,
       			easing: 'easeInQuart',
       			easingcss3: 'ease',
       			touchSensitivity: 15,
       			normalScrollElementTouchThreshold: 5,
       			resize : true,
       			verticalCentered: true,
       		});
		}
	}
	$(document).ready(function() {
		lily.init();
	});
});