// var interfaceUrl = 'https://previpback.bqj.cn'; //预发布环境
var interfaceUrl = 'https://vipback.bqj.cn'; //正式环境
var btnFlag = true;

$(function () {
    // Toast('hhhhh',2000)
    // toast('试试吗？ 试试就试试')

    $('#mainBtn').click(function () {
        console.log('点击了');
        var phoneNum = $('#phoneNum').val();

        if (checkPhoneNum(phoneNum)) {

            if (btnFlag) {
                btnFlag = false;

                submitActivity(phoneNum);
            }
        } else {
            toast("请输入正确的手机号")
        }
    })
})

function submitActivity(phoneNum) {
    var requestData = {
        phone: phoneNum,
        appKey: '49497644'
    };

    $.ajax({
        url: interfaceUrl + '/bqjvip/propertyRight/receive',
        // contentType: "application/json;charset=UTF-8",
        type: "POST",
        dataType: "json",
        data: requestData,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                toast(res.message);
            } else {
                toast(res.message)
            }

            btnFlag = true;
        },
        error: function () {
            btnFlag = true;
            toast('活动太火爆，请刷新后重试~');
        }
    })
}


/********************检查手机号*****************/
function checkPhoneNum(phonevalue) {
    if (phonevalue.length != 11) {
        return false;
    }
    var phoneReg = /^1\d{10}$/;
    if (phoneReg.test(phonevalue)) {
        return true
    } else {
        return false
    }
}

/********************************获取网址问号后的参数**********************/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}


window.toast = function (str, callbacks) {
    var m = document.createElement('div');
    m.innerHTML = str;
    m.style.cssText = "padding:10px 20px;font-size:16px; min-width:130px; background:#000; opacity:0.77; line-height:20px; color:#fff;text-align:center; border-radius:10px; position:fixed; top:50%; left:50%; z-index:99999999;transform:translate(-50%,-50%);";
    document.body.appendChild(m);
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(m);
            if (callbacks) {
                callbacks()
            }
        }, d * 1000);
    }, 2000);
}

function checkPhoneNum(phonevalue) {
    if (phonevalue.length != 11) {
        return false;
    }
    var phoneReg = /^1\d{10}$/;
    if (phoneReg.test(phonevalue)) {
        return true
    } else {
        return false
    }
}


// function Toast(msg, duration) {
//     duration = isNaN(duration) ? 3000 : duration;
//     var m = document.createElement('div');
//     m.innerHTML = msg;
//     m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
//     document.body.appendChild(m);
//     setTimeout(function() {
//         var d = 0.5;
//         m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
//         m.style.opacity = '0';
//         setTimeout(function() {
//             document.body.removeChild(m)
//         }, d * 1000);
//     }, duration);
// }