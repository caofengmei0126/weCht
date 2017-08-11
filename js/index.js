/*main部分*/
var $nav = $('.nav');
var $main = $('.main');
var $banner = $main.find('.banner');
var $bannerInner = $banner.find('.bannerInner');
var $divImg = null;
var $focusUl = $banner.find('.focusUl');
var $left = $banner.find('.left');
var $right = $banner.find('.right');
var $imgs = null;
var $lis = null;
var winW = $(window).width();
//console.log(winW);
//设置主题高度
function getHeight() {
    var winH = $(window).height();
    var navH = $nav.outerHeight();
    var mainH = winH - navH - 100;
    $main.height(mainH);
}
getHeight();
//获取数据绑定数据
var data = null;
;(function () {
    $.ajax({
        url: 'data.json',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (result) {
            data = result;
            if (result) {
                /*winW = $(window).width();*/
                var str = '';
                var strLi = '';
                for (var i = 0; i < result.length; i++) {
                    str += '<div><img src="' + result[i].src + '"></div>';
                    strLi += i == 0 ? '<li class="cur"></li>' : '<li></li>';
                }
                str += '<div><img src="' + result[0].src + '"></div>';
                $bannerInner.css({
                    width: (result.length + 1) * winW
                });
                $bannerInner.html(str);
                $focusUl.html(strLi);
            }
        }
    })
})();
// 图片有效性验证
$divImg = $bannerInner.find('div');
$divImg.width(winW);
$imgs = $bannerInner.find('img');
$lis = $banner.find('li');

/*
;(function () {
    $imgs.each(function (index, item) {
        if (index === 0) {
            //console.log(item);
           /!* $(item).animate({
                opacity: 1
            },500)*!/
        }
    })
})();
*/
//轮播
var timer = window.setInterval(autoPlay, 2000);
var index = 0;
function autoPlay() {
    index++;
    if (index == data.length + 1) {
        /*utils.setCss(bannerInner,'left',0);*/
        $bannerInner.css({
            left: 0
        });
        index = 1; // 向第二张运动，索引index的值应该是第二张索引
    }
    $bannerInner.animate({
        left: -index * winW
    }, 500);
   /* $imgs.each(function (i, item) {
        if (index == i) {
            /!*$(item).animate({
                opacity: 1
            }, 500);*!/
            /!*$(item).css({
             opacity: 1
             })*!/
        }
    });*/
    focusAlign(); // 更换图片之后焦点重新对齐
}

//鼠标悬停
$banner.mouseover(function () {
    window.clearInterval(timer);
    $left.css('display', 'block');
    $right.css('display', 'block');
});
$banner.mouseout(function () {
    timer = window.setInterval(autoPlay, 2000);
    $left.css('display', 'none');
    $right.css('display', 'none');
});

//点击事件
$left.on('click', function () {
    index--;
    if (index == -1) {
        $bannerInner.css({
            left: -data.length * winW
        });
        $imgs.eq(data.length).css({
            opacity: 1
        });
        index = data.length - 1;
    }
    $bannerInner.animate({
        left: -index * winW
    }, 500);
  /*  $imgs.each(function (i, item) {
        //console.log(i,index);
        if (index == i) {
           /!* $(item).animate({
                opacity: 1
            }, 300);*!/
           /!* $(item).css({
             opacity: 1
             })*!/
        }
    });*/
    focusAlign();
});
$right.on('click', autoPlay);

//点击焦点
;(function () {
    $lis.each(function (index, item) {
        $(item).on('click', function () {
            index = $(this).index();
            $bannerInner.animate({
                left: -index * winW
            }, 500);
           /* $imgs.each(function (i, item) {
                if (index == i) {
                    $(item).css({
                        opacity: 1
                    })
                } else {
                    $(item).css({
                        opacity: 1
                    })
                }
            });*/
            $lis.each(function (ind, item) {
                if (index == ind) {
                    $(item).addClass('cur')
                } else {
                    $(item).removeClass('cur');
                }
            })
        })
    })
})();

function focusAlign() {
    // 当播放到最后一张图片(显示的是第一张)但是lis中没有对应的li。所以让第一张显示
    var tempIndex = index == $lis.length ? 0 : index;
    $lis.each(function (ind, item) {
        if (tempIndex == ind) {
            $(item).addClass('cur')
        } else {
            $(item).removeClass('cur');
        }
    })
}
$(window).resize(function () {
    getHeight();
   var winW2 = $(window).width();
    $bannerInner.css({
        width: (data.length + 1) * winW2
    });
    $divImg.width(winW2);
   // console.log(winW2-winW);
    if(Math.abs(winW2-winW)>200){
        window.location.reload();
    }
});

/*内容部分*/
var $ulList = $('.ulList');
var $ulLis = $ulList.find('li');
var $olList = $('.olList');
var $olLis = $olList.find('li');
var $olListA = $olList.find('a');
var $olListI = $olListA.find('i');
var flag = true;
$olListA.on('click',function () {
    if(flag){
        $(this).find('i').css('display','block');
        flag = false;
    }else {
        $(this).find('i').css('display','none');
        flag = true;
    }
});
$ulLis.on('click',function () {
    $(this).addClass('cur');
    $(this).siblings().removeClass('cur');
    var indexCur = $(this).index();
    $olLis.each(function (index,item) {
        if(indexCur == index+1){
            $(item).css({
                border:"3px solid  #c0a16b"
            });
        }else {
            $(item).css({
                border:"3px solid  transparent"
            });
        }
        if(indexCur === 0){
            $(item).css({
                border:"3px solid  #c0a16b"
            });
        }
    })
});
/*延迟加载*/
var $headerH = $('.header').height();
var $navH = $('.nav').height();
var $mainH = $('.main').height();
var $messageH = $('.message').height();
var $productH = $('.product').height();
var $joinH = $('.join').height();
var $aboutUH = $('.aboutU').height();
var $scrollH = null;
var winH = document.documentElement.clientHeight||document.body.clientHeight;
var totalH = $headerH+$navH+$mainH+$messageH;
$(window).scroll(function () {
    $scrollH = $(window).scrollTop();
    //console.log($scrollH+winH,totalH);
    if($scrollH+winH>totalH){
        $('.message').animate({
            opacity:1
        },500);
    };
    if($scrollH+winH>totalH+200){
       $('.content').find('.product').animate({
            opacity:1
        },500);
    };
    if($scrollH+winH>totalH+$productH+$joinH){
        $('.content').find('.join').animate({
            opacity:1
        },500);
    }
    if($scrollH+winH>totalH+$productH+$joinH+200){
        $('.content').find('.aboutU').animate({
            opacity:1
        },500);
    }
});













