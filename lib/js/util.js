var isApp = false;
/******************判断APP环境内***************/
document.addEventListener('UniAppJSBridgeReady', function() {
    uni.getEnv(function(res) {
        console.log('当前环境：' + JSON.stringify(res));
        isApp = true;

    });
});


/*********************跳转登录********************/
function bqjAppLogin() {
    if(isApp){
        document.addEventListener('UniAppJSBridgeReady', function() {
            uni.postMessage({
                data: {
                    action: 'postMessage'
                }
            })
        });

    }
}

/**************************微信中与App中的分享***********************/
function weChatAndBqjappShare(shareData) {
    var shareTitle = shareData.shareTitle;
    var shareContent = shareData.shareContent;
    var shareThumb = shareData.shareThumb;
    var shareUrl = shareData.shareUrl;
    var shareMini_path = shareData.shareMini_path;
    var shareMini_icon = shareData.shareMini_icon;
    var shareDownload_pic = shareData.shareDownload_pic;



    // //机锋App设置分享信息.
    // performProcessWithFunc({
    //     "method": "makeShareInfo:",
    //     "data": {
    //         "title": shareTitle,
    //         "content": shareContent,
    //         "thumb": shareThumb,
    //         "url": shareUrl,
    //         "mini_path": shareMini_path,
    //         "mini_icon": shareMini_icon,
    //         "share_download_pic": shareDownload_pic
    //     }
    // });
    //
    //
    // //在微信小程序中
    // if (GetQueryString("webChatApp") == 1) {
    //     wx.miniProgram.postMessage({
    //         "title": shareTitle,
    //         "content": shareContent,
    //         "thumb": shareThumb,
    //         "url": shareUrl
    //     });
    // }
    //
    // //微信设置分享信息
    // wx.ready(function () {
    //     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //     wx.onMenuShareAppMessage({
    //         title: shareTitle, // 分享标题
    //         desc: shareContent, // 分享描述
    //         link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: shareThumb, // 分享图标
    //         type: 'link', // 分享类型,music、video或link，不填默认为link
    //         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户取消分享后执行的回调函数
    //         }
    //     });
    //
    //     wx.onMenuShareTimeline({
    //         title: shareTitle, // 分享标题
    //         link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: shareThumb, // 分享图标
    //         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户取消分享后执行的回调函数
    //         }
    //     });
    //
    // });
    //
    // wx.error(function (res) {
    //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //     //alert(res);
    // });

}

/***********************版权家App调出分享框,网页端引导分享*******************/
function bqjAppShare() {
    //app
    if(isApp){
        uni.postMessage({
            data: {
                action: 'shareUrl'
            }
        });
    }
    else{
        console.log('没有在app内点击分享')
    }
}





