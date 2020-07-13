var vConsole = new VConsole();

var interfaceUrl = 'https://previpback.bqj.cn'; //预发布环境
// var interfaceUrl = 'https://vipback.bqj.cn'; //正式环境
var btnFlag = true;
var shareUrl = '';

$(function () {

    // getCopyMsg();

    /******************点击邀请***************/
    $('#shareBtn').click(function () {
        bqjAppShare()
        // bqjAppLogin()
        if (shareUrl && shareUrl != '') {
            copyText(shareUrl);
        } else {
            getCopyMsg().then(data => {
                console.log(data);
                copyText(data);
            }).catch(err => {
                toast('请登录后再进行邀请')
            })
        }

    });




});

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

/******************************复制***************************/
function copyText(str) {
    var target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    target.innerText = str;
    var range = document.createRange();
    var target2 = document.body.appendChild(target);
    try {
        var range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        toast('复制成功，请在手机中查看');
    } catch (e) {
        toast('复制失败，请重试~');
        console.log(e);
    }
    target.remove();
    target2.remove();
}

/******************************获取复制信息***************************/
function getCopyMsg() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: interfaceUrl + '/bqjvip/registerInviteCode/getShareUrl',
            // contentType: "application/json;charset=UTF-8",
            type: "GET",
            dataType: "json",
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    shareUrl = res.result;
                    resolve(res.result);
                } else {
                    shareUrl = '';
                    reject(res.message);

                }

            },
            error: function () {
                shareUrl = '';
                toast('活动太火爆，请刷新后重试~');
                reject(false);
            }
        })

    })
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