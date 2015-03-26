/**
 * Future Move ohoo!!! :)
 * @authors Lucas Ren (nichokiki@hotmail.com)
 * @date    2015-01-20
 * @version v1.0
 */
// 配置加载项
require.config({　
    waitSeconds: 60,
    paths: {　　　　　　
        "jquery": "jquery",
        "transit": "jquery.transit.min",
        "slide": "responsiveslides.min",
        "slick": "slick.min",
        "map": "http://api.map.baidu.com/api?v=1.5&ak=KfgGSNmbrkALKFcj3kZh3yYD"
    },
    shim: {
        
        "transit": {
            deps: ["jquery"]
        },
        "slide": {
            deps: ["jquery"]
        },
        "slick": {
            deps: ["jquery"]
        }
    }
});
/**
 *主模块，FutureMove主页面初始化
 *Design by Zhongfei.Wei
 *Scripts by Lucas Ren
 */
require(['jquery', 'transit',"slide","slick"], function() {
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
        pop: $(".team-photo"),
        language: $(".language"),
        partnerList: $(".partner-list"),
        partnerIndex: 0,
        teamLoop: $(".team-photo"),
        shadow: $("#gods"),
        //car animation & header animation
        carAnimate: function(index) {

            if (index == 1) {
                lily.header.transition({
                    height: 100
                }, 600, 'easeInOutCubic');
                lily.header.find(".logo").transition({
                    height: 38,
                    width: 300,
                    margin: "31px auto"
                }, 600, 'easeInOutCubic');
                lily.language.transition({
                    y: 0
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
                lily.language.transition({
                    y: -20
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
                timeout: 6000,
                speed: 1000
            });
        },
        popHead: function() {
            lily.pop.find("li").addClass("tada animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass("tada");
                $(this).removeClass("animated");
            });
        },
        show: function() {
            $(".view-2").show();
            $(".view-3").show();
            $(".view-4").show();
            $(".view-5").show();
            $(".view-6").show();
        },
        partner: function() {
            var width = $("body").width() - 40;
            var number = parseInt(width/70);
            lily.partnerList.find("ul").width(number*70);
        },
        loopGods: function() {

            var heads = lily.teamLoop.find("li");
            heads.on("click", function() {
                var shade = lily.shadow.find(".shade");
                var index = heads.index(this);
                lily.shadow.html($("#god" + (index + 1)).html());
                lily.shadow.show();
                lily.shadow.find(".close").on("click", function() {
                    lily.shadow.hide();
                });
            });

        },
        multi:function(){
        	var countries = lily.language.find("li");
        	countries.on("click",function(){
        		var url = $(this).attr("tag");
        		window.location = url;
        	});
        }
    }


    $(document).ready(function() {
            lily.init();
            lily.show();
            lily.map();
            lily.bgTransition();
            lily.partner();
            lily.loopGods();
            lily.multi();
        });


});
