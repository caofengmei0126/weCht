/*onLine部分*/

var $content = $('.content');
var $container = $content.find('.container');
var $auth = $container.find('.auth');
var $btnS = $container.find('.btn');
var $authCode = $auth.find('.auth-code');
var $change = $auth.find('.change');

/*获取随机数*/
function getRound() {
    var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var strAll = "";
    while (strAll.length < 4) {
        var val = Math.round(Math.random() * (str.length - 1));
        var strVal = str.charAt(val);
        if (strAll.indexOf(strVal) === -1) {
            strAll += strVal;
        }
    }
    return strAll;
}
var strList = getRound();
//console.log(strList);
$authCode.html(strList);

$change.on('click', function () {
    strList = getRound();
    $authCode.html(strList);
});

$btnS.on('click', function () {
    var objSub = {};
    var $htmlC = $authCode.text().toLowerCase();
    var val1 = $('#inputText').val();
    var val2 = $('#inputPassword').val();
    var val3 = $('#inputEmail').val();
    var val4 = $('#inputText1').val().toLowerCase();
    //alert(val4);
    /*if (val4 != '' && val4 !== $htmlC) {
        alert('验证码不正确');
    }*/
    if (val1 !== '' && val2 !== '' && val3 !== '' && val4 !== '' ) {
        if(val4 == $htmlC){
            alert('提交成功');
            /*提交成功后，获取数据，数据放本地，跳转到首页*/
            objSub['title'] = val1;
            objSub['content'] = val2;
            objSub['email'] = val3;
            localStorage.setItem('messages' + Math.random(), JSON.stringify(objSub));
            window.location.href = '../index.html';
        }else {
            alert('验证码不正确');
        }
    } else {
        alert('内容不能为空');
    }
});

$(window).on('keydown', function (e) {
    e = e || window.event;
    var objSub = {};
    var $htmlC = $authCode.text().toLowerCase();
    var val1 = $('#inputText').val();
    var val2 = $('#inputPassword').val();
    var val3 = $('#inputEmail').val();
    var val4 = $('#inputText1').val().toLowerCase();

    if (val1 !== '' && val2 !== '' && val3 !== '' && val4 !== '' && val4 == $htmlC) {
        if (e.keyCode == 13) {
            alert('提交成功');
            /*提交成功后，获取数据，数据放本地，跳转到首页*/
            objSub['title'] = val1;
            objSub['content'] = val2;
            objSub['email'] = val3;
            localStorage.setItem('messages' + Math.random(), JSON.stringify(objSub));
            window.location.href = '../index.html';
        }
    }
});
var $inputText = $("#inputText");
var $inputText1 = $("#inputText1");
var $inputPassword = $("#inputPassword");
var $inputEmail = $("#inputEmail");
var $inputBtn = $(".btn");
var inputAry = [];
inputAry.push($inputText)[0];
inputAry.push($inputPassword)[0];
inputAry.push($inputEmail)[0];
inputAry.push($inputText1[0]);
inputAry.push($inputBtn[0]);
$(inputAry).each(function (index, item) {
    //console.log(item);
    $(item).on('focus', function () {
        $(item).next('.alert').css('display', 'none');
    });
    $(item).on('blur', function () {
        if ($(item).val() == '') {
            $(item).next('.alert').css('display', 'block');
        }
        if (index == 2) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (!reg.test($(item).val())) {
                $(item).next('.alert').css('display', 'block');
            }
        }

    });
    $(item).on('keyup',function (e) {
        e = e || window.event;
        if(e.keyCode == 40){
            var indexN = index+1;
            if(indexN==4){
                $(inputAry).eq(indexN).css('backgroundColor','#3c763d');
            }
            $(inputAry).eq(indexN).focus();
        }
    })
});













