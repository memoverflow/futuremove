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
        "fullPage": "jquery.fullPage.min",
        "transit": "jquery.transit.min",
        "slide": "responsiveslides.min",
        "detectmobilebrowser": "detectmobilebrowser",
        "map": "http://api.map.baidu.com/api?v=1.5&ak=KfgGSNmbrkALKFcj3kZh3yYD"
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
        "detectmobilebrowser": {
            deps: ["jquery"]
        }
    }
});
/**
 *主模块，FutureMove主页面初始化
 *Design by Zhongfei.Wei
 *Scripts by Lucas Ren
 */
require(['jquery', 'fullPage', 'transit', "slide", "map", "detectmobilebrowser"], function($, f, t, s, m, d) {
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
                    height: 100,
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
            //lily.pop.find("li").css({width:"0px",height:"0px"});
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
                },
                afterLoad: function(anchorLink, index) {
                    if (index == 5) {
                        lily.popHead();
                    }
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
            var arrows = lily.partnerList.find("a");
            var prev = arrows.first();
            var next = arrows.last();
            var width = 240;
            var count = lily.partnerList.find("ul").find("li").length;
            prev.on("click", function() {
                ++lily.partnerIndex;
                if (lily.partnerIndex == 4) {
                    lily.partnerIndex = 3;
                    return;
                }

                lily.partnerList.find("ul").find("li").transition({
                    x: "-" + width * lily.partnerIndex
                }, 600, 'easeInOutCubic');


            });
            next.on("click", function() {
                --lily.partnerIndex;
                if (lily.partnerIndex == -1) {
                    lily.partnerIndex = 0;
                    return;
                }
                lily.partnerList.find("ul").find("li").transition({
                    x: "-" + width * lily.partnerIndex
                }, 600, 'easeInOutCubic');

            });
            //lily.partnerList
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
        loggle: function() {
            log('[c="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #444; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000"]FUTUREMOVE-飞驰镁物[c]');
            log('如果你对下面这些有所了解：');
            log('`Git Html5 Angular Zepto SeaJS Node Restful`');
            log('`Struts Spring Hibernate iBatis`');
            log('`Azure AWS`');
            log('`ios android`');
            log('请将简历发送至:[c="color: green"]contact@futuremove.cn[c]');
            log('欢迎你来加入我们，徜徉在更广阔的天空，_http://www.lagou.com/gongsi/47865.html?speedShow=true_');
            log('你必须热爱编程，并以此为乐趣，因为我们是GEEK: _http://futuremove.com_');
        },
        sniffer: function() {
            return $.browser.mobile;
        }
    }


    if (lily.sniffer()) {
        $("body").html("<div  class='mobile-title'>The page is under construction...<br>移动网站建设中</div>").find(".mobile-title").addClass("shake").addClass("animated").addClass("hinge");
    } else {
        $(document).ready(function() {
            lily.init();
            lily.show();
            lily.map();
            lily.bgTransition();
            lily.partner();
            lily.loopGods();
            lily.loggle();
        });
    }



});
