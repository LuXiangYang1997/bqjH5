//var interfaceUrl = 'https://tsmars.bqj.cn'; //测试环境
var interfaceUrl = 'https://svip.bqj.cn'; //正式环境
var btnFlag = true;

$(function () {
    //登录状态
    try {
        //app打开
        // Tag.postMessage(''); 
        isLogin.postMessage('');         
    }
    catch(err) { 
        //浏览器打开
        $("#appshow").remove()      
        if(Cookies.get("userInfo")){
            let name = JSON.parse(Cookies.get("userInfo")).name;
            $("#userAccount").html(name)
            $(".user-p").attr("style","display:block")
            $(".no-p").attr("style","display:none")
            $(".showgif").attr("style","display:block")
            $(".receiveBtn").attr("style","width:1.48rem")
        }else{
            $(".receiveBtn").attr("style","width:2.5rem")
        }
    }
    //调用app方法
    try{
        $("#giveUrl").click(function(){
            inviteRegister.postMessage("");
        })
    }
    catch(err){
        console.log("app邀请他人注册")
    }

    try{
        $("#giveGift").click(function(){
            receiveActivityGift.postMessage("");
        })
    }
    catch(err){
        console.log("app领取注册礼包")
    }

    //登录校验    
    $('#submitlogin').click(function () {
        let phoneLogin = $('#phoneLogin').val();
        if(!checkPhoneNum(phoneLogin)){
            toast("请输入正确的手机号")
            return false
        }
        let passwordOne = $('#passwordOne').val();
        // if(!checkPasswordNum(passwordOne)){
        //     toast("请输入8-20位字母加数字组合")
        //     return false
        // }
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
    //去浏览器下载
    $("#gobower").click(function(){
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            //android环境　　　　　　
            let ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                $("#happyModal").attr("style","display:none")
                // $("#browserModal").attr("style","display:block")
                window.location.href="https://static.bqj.cn/evidenceActivity/h5/code.html" 
            }else{
                $("#happyModal").attr("style","display:none")
                $("#browserModal").attr("style","display:none")
                window.location.href="http://file.bqj.cn/file/003949ff996170d3906de71d036693e5.apk"                
            }
        }else if(isiOS){
            //ios环境
            window.location.href="https://apps.apple.com/cn/app/%E5%8F%96%E8%AF%81%E5%AE%9D/id1184801162?mt=8" 
        }else{
            console.log("不是手机终端")
        } 

    })
})
var loginStatus
function linkApp(val) {
	$("#otherShow").remove();
	loginStatus = val
	if (loginStatus == true) {
        $(".receiveBtn").attr("style","width:1.48rem")
		$(".showgif").attr("style", "display:block")
	} else {
        $(".receiveBtn").attr("style","width:2.5rem")
		$(".showgif").attr("style", "display:none")
	}
}
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
                $("#bigModal").hide();
                $("#userAccount").html(res.register.name)
                $(".receiveBtn").attr("style","width:1.48rem")
                $(".user-p").attr("style","display:block")
                $(".no-p").attr("style","display:none")
                $(".showgif").attr("style","display:block")
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
                $("#modalLader").attr("style","height:3.33rem")
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
                $("#userAccount").html("")
                $(".user-p").attr("style","display:none")
                $(".no-p").attr("style","display:block")
                $(".receiveBtn").attr("style","width:2.5rem")
                $(".showgif").attr("style","display:none")
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
    $("#modalLader").attr("style","height:3.33rem")
}

//去注册
function goRegister(){
    $("#resigter").attr("style","display:block")
    $("#login").attr("style","display:none")
    $("#modalLader").attr("style","height:3.96rem")
}

//邀请好友注册
function inviteFriend(val){    
    let userInfo = Cookies.get("userInfo")?JSON.parse(Cookies.get("userInfo")):'';
    if(userInfo.length == 0){
        $("#bigModal").attr("style","display:block")
        return false;
    }
    if(val==1){
        burialPoint('website','shareActivityA6','10025');
        window.location.href="share.html"
    }else if(val==2){
        burialPoint('website','shareActivityB6','10027');
        window.location.href="shareTwo.html"
    }
    
}

//获得分享的唯一标识
function receiveGift(val){
    if(val==1){
        burialPoint('website','receiveActivityA6','10026');
    }else if(val==2){
        burialPoint('website','receiveActivityB6','10028');
    }  
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

//邀请他人注册
function golink(val){
    $("#sorryModal").attr("style","display:none")
    if(val==1){
        try{
            inviteRegister.postMessage("");
        }
        catch(err){
            window.location.href="share.html"
        }
       
    }else if(val==2){
        window.location.href="shareTwo.html"
    }
    
}

//关闭弹框
function closeCha(){
    $("#happyModal").attr("style","display:none")
}
/********************检查手机号*****************/
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
/********************检查密码*****************/
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

//app用来调用领取成功
function showSuccessAPP(){
    $("#happyModal").attr("style","display:block")
    $("#gobower").remove()
}
//app用来调用老用户
function showFailAPP(){
    $("#sorryModal").attr("style","display:block")
}