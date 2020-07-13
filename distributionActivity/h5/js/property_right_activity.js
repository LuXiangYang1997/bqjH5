var interfaceUrl = 'https://previpback.bqj.cn'; //预发布环境
// var interfaceUrl = 'https://vipback.bqj.cn'; //正式环境
var btnFlag = true;
var appkey = GetQueryString('appkey') && GetQueryString('appkey')!='' ? GetQueryString('appkey') : '49497644';
var inviteCode = GetQueryString('inviteCode') && GetQueryString('inviteCode')!='' ? GetQueryString('inviteCode') : '';
var activityId = '26';





$(function () {

    $('#mainBtn').click(function () {
        var phoneNum = $('#phoneNum').val();

        if(checkPhoneNum(phoneNum)){

            if(btnFlag){
                btnFlag = false;

                submitActivity(phoneNum);
            }
        }
        else{
            toast("请输入正确的手机号")
        }
    })
})

function submitActivity(phoneNum) {
    var requestData = {
        inviteCode:inviteCode,
        phone:phoneNum,
        appKey: appkey,
        activityId:activityId,
        url:window.location.href
    };

    $.ajax({
        url: interfaceUrl + '/bqjvip/propertyRight/share',
        // contentType: "application/json;charset=UTF-8",
        type: "POST",
        dataType: "json",
        data: requestData,
        success:function (res) {
            console.log(res);
            if(res.code == 200){
                toast(res.message);
            }
            else{
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
function checkPhoneNum (phonevalue) {
    if(phonevalue.length != 11){
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
function GetQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}