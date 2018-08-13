import { IBrowser, IDevice } from './interface/browser';

/**
 * 浏览器内核版本
 *
 * @returns {IBrowserVersions} IBrowserVersions
 * @memberof BrowserService
 */
const Browser: IBrowser = (function() {
    const u = navigator.userAgent;
    return {// 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        weixin: /MicroMessenger/i.test(u) // 微信
    };
})();

/**
 * 硬件设备
 *
 * @returns {IBrowserDevice} IBrowserDevice
 * @memberof BrowserService
 */
const Device: IDevice = (function() {
    let ret: IDevice = {
        mobile: false, // 移动端
        pc: false, // pc端
        ios: false, // ios
        weixin: false, // 微信
        iPad: false// iPad
    };
    let os = Browser;

    if (os.mobile || os.ios || os.android || os.iPhone || os.iPad) { // 判断移动端
        ret.mobile = true;
    } else {
        ret.pc = true;
    }

    if (os.ios || os.iPhone || os.iPad) {
        ret.ios = true;
    }

    if (os.iPad) {
        ret.iPad = true;
    }

    if (os.weixin) {
        ret.weixin = true;
    }

    return ret;
})();

export {
    Browser,
    Device
};
