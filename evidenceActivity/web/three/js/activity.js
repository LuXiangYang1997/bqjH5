//var interfaceUrl = 'https://tsmars.bqj.cn'; //测试环境
var interfaceUrl = 'https://svip.bqj.cn'; //正式环境
var btnFlag = true;

$(function () {
    //登录校验    
    $('#submitlogin').click(function () {
        let phoneLogin = $('#phoneLogin').val();
        if(!checkPhoneNum(phoneLogin)){
            toast("请输入正确的手机号")
            return false
        }
        let passwordOne = $('#passwordOne').val();
        if(passwordOne.length <=0){
            toast("请输入密码")
            return false;
        }
        if(btnFlag){
            btnFlag = false;
            loginActivity(phoneLogin,passwordOne)
        }
    })
    //校验注册
    $('#mainBtn').click(function () {
        let phoneNum = $('#phoneNum').val();
        if(!checkPhoneNum(phoneNum)){
            toast("请输入正确的手机号")
            return false
        }
        let codeNum = $('#codeNum').val();
        if(codeNum.length<=0){
            toast("请输入验证码")
            return false
        }
        let passwordTwo = $('#passwordTwo').val();
        if(!checkPasswordNum(passwordTwo)){
            // toast("请输入8-20位字母加数字组合")
            return false
        }
        if(btnFlag){
            btnFlag = false;
            submitActivity(phoneNum,codeNum,passwordTwo)
        }
    })
    //切换注册密码显示
    $('#showImg').click(function () {
        let pass_type = $('#passwordTwo').attr('type');
        if (pass_type === 'password' ){
            $('#passwordTwo').attr('type', 'text');
            $('#showImg').attr('src','images/open.png')
        } else {
            $('#passwordTwo').attr('type', 'password');
            $('#showImg').attr('src','images/guan.png')
        }
    })
    //切换登录密码显示
    $('#selectImg').click(function () {
        let pass_type = $('#passwordOne').attr('type');
        if (pass_type === 'password' ){
            $('#passwordOne').attr('type', 'text');
            $('#selectImg').attr('src','images/open.png')
        } else {
            $('#passwordOne').attr('type', 'password');
            $('#selectImg').attr('src','images/guan.png')
        }
    })
    //校验手机号是否注册过
    $("#sendCode").click(function(){
        let phoneNum = $('#phoneNum').val();
        if(!checkPhoneNum(phoneNum)){
            toast("请输入正确的手机号")
            return false
        }
        $.ajax({
            url: interfaceUrl + '/front/register/accountCheck',
            type: "GET",
            dataType: "json",
            data: {username: phoneNum},
            success:function (res) {
                if(res.result=='true'){
                    toast('该手机号已注册');
                }
                else{
                    sendPhoneCode()
                }
            },
            error: function () {
                toast('活动太火爆，请刷新后重试~');
            }
        })
    })
})

//登录
function loginActivity(phoneLogin,passwordOne) {
    let dataVal = {
        username: phoneLogin,
        password:passwordOne
    };
    $.ajax({
        url: interfaceUrl + '/front/login',
        type: "GET",
        dataType: "json",
        data: dataVal,
        xhrFields: {
　　　　　　withCredentials: true
　　　　},
        success:function (res) {
            if(res.code == 200){
                $("#bigModal").attr("style","display:none")
                // Cookies.set("userInfo", JSON.stringify(res.register), { expires: 7 });  
                Cookies.set("userInfo", JSON.stringify(res.register));              
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

//发送验证码
function sendPhoneCode() {
    let n = 60;
    let codeVal = {
        mobile:$('#phoneNum').val(),
        type:'mars_sms_verifi_code'
    }
    $.ajax({
        url: interfaceUrl + '/front/sms/verifyCode/registerCode',
        type: "POST",
        dataType: "json",
        data: codeVal,
        xhrFields: {
            withCredentials: true
        },
        success:function (res) {
            if(res.code == 200){
                $('.count_down_btn').hide();
                $('.count_down_show').css({
                    display:'inline-block'
                })
                var timer = setInterval(function() {
                    n--;
                    $('.count_down_show').text(n);
                    if (n == 0) {
                        clearInterval(timer);
                        n = 60;
                        $('.count_down_btn').css({
                            display:'inline-block'
                        });
                        $('.count_down_show').hide();
                        $('.count_down_show').text(n);
                    };
                }, 1000);
            }
            else{
                toast(res.message)
            }
        },
        error: function () {
            toast('活动太火爆，请刷新后重试~');
        }
    })
}

//注册新用户
function submitActivity(phoneNum,codeNum,passwordTwo) {
    var sourceCode = '';
    if(window.location.search){
        let code = window.location.search
        let codeArr = code.split("?")
        let codeChildArr = codeArr[1].split("=")
        if(codeChildArr[0]=='source'){
            sourceCode=codeChildArr[1]
        }else{
            sourceCode = ''
        }
    }
    let requestData = {
        mobilePhone: phoneNum,
        password:passwordTwo,
        verifyCode:codeNum,
        type:'mars_sms_verifi_code',
        sourceRemark:sourceCode
    };
    $.ajax({
        url: interfaceUrl + '/front/register/registerMain',
        type: "POST",
        dataType: "json",
        data: requestData,
        xhrFields: {
            withCredentials: true
        },
        success:function (res) {
            if(res.code == 200){
                toast('注册成功,请登录');
                $("#resigter").attr("style","display:none")
                $("#login").attr("style","display:block")
                $("#modalLader").attr("style","height:333px")
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

//立即登录
function showLoginModal(){
    $("#bigModal").attr("style","display:block")
}

//退出登录
function logout(){
    $.ajax({
        url: interfaceUrl + '/front/logout',
        type: "GET",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success:function (res) {
            if(res.code == 200){
                Cookies.remove('userInfo');
            }
            else{
                toast(res.message)
            }
        },
        error: function () {
            toast('活动太火爆，请刷新后重试~');
        }
    })
}

//关闭登录注册模态框
function closeModal(){
    $("#bigModal").hide()
    goLogin()
}

//去登陆
function goLogin(){
    $("#resigter").attr("style","display:none")
    $("#login").attr("style","display:block")
    $("#modalLader").attr("style","height:333px")
}

//去注册
function goRegister(){
    $("#resigter").attr("style","display:block")
    $("#login").attr("style","display:none")
    $("#modalLader").attr("style","height:396px")
}

//邀请好友注册
function inviteFriend(){    
    burialPoint('website','a3','20005');
    let userInfo = Cookies.get("userInfo")?JSON.parse(Cookies.get("userInfo")):'';
    if(userInfo.length == 0){
        $("#bigModal").attr("style","display:block")
        return false;
    }
    $.ajax({
        url: interfaceUrl + '/front/evidence/activity/getEvidenceActivityUrl',
        type: "GET",
        xhrFields: {
            withCredentials: true
        },                   
        success:function (res) {
            if(res.code=='200'){ 
                $("#content").html(res.evidenceActivityUrl)
                $("#linkModal").attr("style","display:block")                        
            }else{
                toast(res.message)
            }
        },
        error: function () {
            toast('活动太火爆，请刷新后重试~');
        }
    })
    
}

//获得分享的唯一标识
function receiveGift(){
    burialPoint('website','b3','20006'); 
    let userInfo = Cookies.get("userInfo")?JSON.parse(Cookies.get("userInfo")):'';
    if(userInfo.length == 0){
        $("#bigModal").attr("style","display:block")
        return false;
    }
    // console.log(window.location)
    //地址栏后面有参数则拼接参数，没有的话传空
    var rcCode = '';
    if(window.location.search){
        let code = window.location.search
        let codeArr = code.split("?")
        let codeChildArr = codeArr[1].split("=")
        if(codeChildArr[0]=='rc'){
            rcCode=codeChildArr[1]
            possessGift(rcCode)
        }else{
            rcCode = "";
            possessGift(rcCode); 
        }
    }else{
        let idCode = "";
        possessGift(idCode);
    }
   
}

//领取礼包
function possessGift(code){
    $.ajax({
        url: interfaceUrl + '/front/evidence/activity/getEvidenceActivityGift',
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        data:{invitationQr:code},                    
        success:function (res) {
            if(res.code=='202'){
                $("#sorryModal").attr("style","display:block")
            }else if(res.code=='200'){
                $("#happyModal").attr("style","display:block")                
            }else if(res.code=='203'){
                toast("您已经领取过注册礼包，不能重复领取")                
            }else{
                toast(res.message)
            }
        },
        error: function () {
            toast('活动太火爆，请刷新后重试~');
        }
    })
}

//关闭领取成功弹框
function closeCha(){
    $("#happyModal").attr("style","display:none")
}
//关闭邀请链接弹框
function closeLinkModal(){
    $("#linkModal").attr("style","display:none")
}
//老用户邀请他人
function showInvite(){
    $("#sorryModal").attr("style","display:none")
    inviteFriend()
}
//检查手机号
function checkPhoneNum (phonevalue) {
    if(phonevalue.length != 11){
        return false;
    }
    var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (phoneReg.test(phonevalue)) {
        return true
    } else {
        return false
    }
}
//检查密码
function checkPasswordNum (passwordvalue) {
    if(passwordvalue.length <=0){
        toast("请输入密码")
        return false;
    }
    var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
    if (passwordReg.test(passwordvalue)) {
        return true
    } else {
        toast("请输入8-20位字母加数字组合")
        return false
    }
}
//复制邀请链接地址
function copyUrlFun(){
    let c = document.getElementById("content");   
    let s=c.innerHTML;
    let clipboard = new Clipboard('#copyUrl', {
        text: function() {
            return s;
        }
    });

    clipboard.on('success', function(e) {
        toast("复制成功");
    });

    clipboard.on('error', function(e) {
        toast("复制失败,请手动复制");
    });

}
//浮框
window.toast = function  (str,callbacks) {
    var m = document.createElement('div');
    m.innerHTML = str;
    m.style.cssText="padding:10px 20px;font-size:16px; min-width:160px; background:#000; opacity:0.77; line-height:20px; color:#fff;text-align:center; border-radius:10px; position:fixed; top:50%; left:50%; z-index:99999999;transform:translate(-50%,-50%);";
     document.body.appendChild(m);
    setTimeout(function() {
       var d = 0.5;
         m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
         m.style.opacity = '0';
       setTimeout(function() { document.body.removeChild(m); if(callbacks){callbacks()}}, d * 1000);
    }, 2000);
 }