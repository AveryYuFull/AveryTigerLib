
interface IWeixinShareParams {
    title?: string; // 分享显示的标题
    imgUrl?: string; // 分享显示的图标
    desc?: string; // 分享显示的描述
    link?: string; // 链接地址
    trigger?: ICallback;
    complete?: ICallback;
    success?: ICallback; // 分享成功
    cancel?: ICallback; // 取消分享
    fail?: ICallback;
    // callback?: IShareCallback; // 分享完成后的回调
}

interface ICallback {
    // tslint:disable-next-line:callable-types
    (res: any): void;
}

interface IWxConfig {
    debug?: boolean; //  开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    jsApiList?: jsApi[]; // 需要使用的JS接口列表，所有JS接口列表见附录2
}

interface IConfingOption extends IWxConfig{ //初始化配置
    appId: string;//公众号appID公众号的唯一标识
    timestamp: string;//时间戳
    nonceStr: string;//生成签名的随机串
    signature: string;//签名
}

interface IpaySuccess{//支付完成时的回调
    (res:any):void;
}

interface IchooseWXPayConfig{
    timestamp: string;//时间戳
    nonceStr: string;//生成签名的随机串
    package: string;//prepay_id
    signType: 'MD5';//加密类型MD5
    paySign: string;//支付签名
    success:IpaySuccess//支付完成时的回调
}

interface IReady{//初始化成功时的回调
    ():void;
}

interface Ierror{//初始化出错的回调
    (err:any):void
}

interface ICheckJsApiBackParams { // 如： {"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    checkResult: { // 以键值对的形式返回，可用的api值true，不可用为false
        [key: string]: boolean;
    },
    errMsg: string; // 接口状态
}

interface ICheckJsApi {
    jsApiList: string[]; // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: (res: ICheckJsApiBackParams) => void; // 以键值对的形式返回，可用的api值true，不可用为false
}

declare namespace wx{
    function checkJsApi(confing:ICheckJsApi):void; // 判断当前客户端版本是否支持指定JS接口
    function config(confing:IConfingOption):void;
    function ready(callback:IReady):void;
    function error(callback:Ierror):void;
    function chooseWXPay(confing:IchooseWXPayConfig):void;
    function onMenuShareAppMessage(option:IWeixinShareParams):void;// 分享给朋友
    function onMenuShareTimeline(option:IWeixinShareParams):void;// 分享到朋友圈
}
/**
 * the shart api from wx
 */
// declare enum jsApi {

//     addCard = 'addCard',

//     checkJsApi = 'checkJsApi',
//     chooseCard = 'chooseCard',
//     chooseImage = 'chooseImage',
//     chooseWXPay = 'chooseWXPay',
//     closeWindow = 'closeWindow',

//     downloadImage = 'downloadImage',
//     downloadVoice = 'downloadVoice',

//     getLocation = 'getLocation',
//     getNetworkType = 'getNetworkType',

//     hideAllNonBaseMenuItem = 'hideAllNonBaseMenuItem',
//     hideMenuItems = 'hideMenuItems',
//     hideOptionMenu = 'hideOptionMenu',

//     showAllNonBaseMenuItem = 'showAllNonBaseMenuItem',
//     showMenuItems = 'showMenuItems',
//     showOptionMenu = 'showOptionMenu',
//     stopVoice = 'stopVoice',

//     openCard = 'openCard',
//     openLocation = 'openLocation',
//     openProductSpecificView = 'openProductSpecificView',
//     onMenuShareTimeline = 'onMenuShareTimeline',
//     onMenuShareAppMessage = 'onMenuShareAppMessage',
//     onMenuShareQQ = 'onMenuShareQQ',
//     onMenuShareWeibo = 'onMenuShareWeibo',
//     onRecordEnd = 'onRecordEnd',

//     pauseVoice = 'pauseVoice',
//     playVoice = 'playVoice',
//     previewImage = 'previewImage',

//     scanQRCode = 'scanQRCode',
//     startRecord = 'startRecord',
//     stopRecord = 'stopRecord',

//     translateVoice = 'translateVoice',

//     uploadImage = 'uploadImage',
//     uploadVoice = 'uploadVoice',
// }
/**
 * 分享的jsApi
 */
declare type jsApi = 'checkJsApi'|
            'onMenuShareTimeline'|
            'onMenuShareAppMessage'|
            'onMenuShareQQ'|
            'onMenuShareWeibo'|
            'hideMenuItems'|
            'showMenuItems'|
            'hideAllNonBaseMenuItem'|
            'showAllNonBaseMenuItem'|
            'translateVoice'|
            'startRecord'|
            'stopRecord'|
            'onRecordEnd'|
            'playVoice'|
            'pauseVoice'|
            'stopVoice'|
            'uploadVoice'|
            'downloadVoice'|
            'chooseImage'|
            'previewImage'|
            'uploadImage'|
            'downloadImage'|
            'getNetworkType'|
            'openLocation'|
            'getLocation'|
            'hideOptionMenu'|
            'showOptionMenu'|
            'closeWindow'|
            'scanQRCode'|
            'chooseWXPay'|
            'openProductSpecificView'|
            'addCard'|
            'chooseCard'|
            'openCard';