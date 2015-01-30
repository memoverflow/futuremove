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
        "fullPage": "jquery.fullPage.min",
        "transit": "jquery.transit.min"
    },
    shim: {
        "fullPage": {
            deps: ["jquery"]
        },
        "transit": {
            deps: ["jquery"]
        },
    }
});
/**
 *主模块，FutureMove主页面初始化
 *Design by Zhongfei.Wei
 *Scripts by Lucas Ren
 */
require(['jquery', 'fullPage', 'transit'], function($, fullPage, transit) {
    var lily = {
        distance: 48,
        whiteCar: [1, 5, 6],
        blackCar: [2, 3, 4],
        car: $(".icon-48-01"),
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
            });
        },
        //init fullpage transition
        init: function() {
            $('#fullpage').fullpage({
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
        }
    }
    $(document).ready(function() {
        lily.init();
    });
});
